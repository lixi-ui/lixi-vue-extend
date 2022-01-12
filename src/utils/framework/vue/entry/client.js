import Vue from 'vue';
import createI18n from 'asset/lang';
import createStore from '../store';
import '../main';

export default function(options) {
  if (options.store) {
    options.store.replaceState(Object.assign({}, window.__INITIAL_STATE__, options.store.state));
  } else if (window.__INITIAL_STATE__) {
    options.data = Object.assign(window.__INITIAL_STATE__, options.data && options.data());
  }
  const i18n = createI18n(options.data.language);
  Vue.prototype.$lang = Object.assign(i18n.messages[options.data.language], options.data.languagePack || {});
  options.i18n = i18n;
  options.store = createStore({
    userInfo: options.data.userInfo,
    fromDeviceType: options.data.fromDeviceType,
  });
  const app = new Vue(options);
  app.$mount('#app');
}