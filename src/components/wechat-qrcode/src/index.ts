import GWechatQrcode from './wechat-qrcode.vue';

/* istanbul ignore next */
GWechatQrcode.install = function(Vue: any) {
  Vue.component(GWechatQrcode.name, GWechatQrcode);
};

export default GWechatQrcode;