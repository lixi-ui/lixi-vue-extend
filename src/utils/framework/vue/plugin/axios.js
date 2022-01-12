import Vue from 'vue';
import Axios from 'axios';
import { Toast } from 'vant';
import { getCookie, clearUserInfoCookie } from '../../utils/utils';
import createI18n from 'asset/lang';

let $lang = {};
let languageCode = 'N000920200';
if (EASY_ENV_IS_BROWSER) {
  languageCode = getCookie('language');
  const i18n = createI18n(languageCode);
  $lang = i18n.messages[languageCode];
}
Axios.defaults.timeout = 15000;
Axios.interceptors.response.use(res => {
  const isPass = [
    '/api/order/print',
    '/v1/upload',
  ].some(url => res.config.url.includes(url));
  if (isPass) {
    return Promise.resolve(res.data);
  }
  const countryCode = getCookie('countryCode');
  if (res.data.code == 2000 || res.data.code == 200) {
    return Promise.resolve(res.data);
  } else {
    switch (res.data.code) {
      // 登陆接口处理
      case 40000003:
        const url = res.config.url;
        const notToLoginApi = [
          '/api/cart/size',
          '/api/wish/spuList',
          '/api/message/count',
        ];
        if (!notToLoginApi.includes(url)) {
          Toast(res.data.message);
          setTimeout(() => {
            location.href = `/${countryCode}/login`;
          }, 500);
        }
        clearUserInfoCookie();
        return Promise.reject(res.data);
      // 结算接口处理
      case 40050014:
        return Promise.reject(res.data);
      // 支付限购处理
      case 50100007:
        Toast(res.data.message);
        setTimeout(() => {
          location.href = `/${countryCode}/order/list`;
        }, 1000);
        return Promise.reject(res.data);
      // 限购接口处理
      case 40050026:
        Toast($lang.maxPurchase.replace('%@', res.data.message.split(' ')
          .pop()
          .replace('.', '')));
        return Promise.resolve(res.data);
      // 身份证信息提示
      case 50030010:
        if (languageCode === 'N000920100') {
          Toast('您填写的身份信息有误，为了保证您的商品可以完成清关，请您重新填写，谢谢。');
        } else {
          Toast('The identity information you filled in is wrong. In order to ensure that your products can complete customs clearance, please fill in again, thank you.');
        }
        return Promise.resolve(res.data);
      default:
        if (!res.config.notToast) {
          Toast(res.data.message || res.data.msg || '');
        }
        return Promise.reject(res.data);
    }
  }
}, error => {
  // error 的回调信息
  Toast('Request interface network error : ' + error.request.status);
  return Promise.reject(error);
});
Vue.prototype.$http = Axios;
