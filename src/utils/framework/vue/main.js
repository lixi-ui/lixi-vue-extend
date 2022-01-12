import Vue from 'vue';
import 'babel-polyfill';
import { setCookie, getCookie } from 'framework/utils/utils';

// Vant
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Vant);
// Element
import Element from 'element-ui';
import 'asset/element-#FF5224/index.css';
Vue.use(Element);

import './plugin/axios';
import './plugin/lazyload';
import './filter';
import './mixins';
import './component';
// import './store';

// 全局埋点对象
if (EASY_ENV_IS_BROWSER) {
  const userEmail = getCookie('userEmail');
  if (userEmail) {
    setCookie('messagesUtk', userEmail);
  }
  window.onload = () => {
    const _hsq = window._hsq = window._hsq || [];
    const email = getCookie('userEmail');
    const userPhone = getCookie('userPhone');
    _hsq.push(['identify', {
      email: email || userPhone
    }]);
    _hsq.push(['trackPageView']);

    // google tag config
    window.dataLayer = window.dataLayer || [];
    gtag('js', new Date());
    gtag('config', 'UA-139843598-1');
    gtag('config', 'UA-140205315-1');
    gtag('config', 'UA-141404791-1');
    gtag('config', 'UA-143076924-1');
    gtag('config', 'GTM-WMQX7W4');
    gtag('config', 'GTM-T57BPWG');
    function gtag() {
      dataLayer.push(arguments);
    }
  };
}