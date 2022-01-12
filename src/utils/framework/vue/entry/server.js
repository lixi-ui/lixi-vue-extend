import Vue from 'vue';
import createI18n from 'asset/lang';
import createStore from '../store';
import '../main';

export default function render(options) {
  if (options.store && options.router) {
    return context => {
      options.router.push(context.state.url);
      const matchedComponents = options.router.getMatchedComponents();
      if (!matchedComponents) {
        return Promise.reject({ code: '404' });
      }
      return Promise.all(
        matchedComponents.map(component => {
          if (component.preFetch) {
            return component.preFetch(options.store);
          }
          return null;
        })
      ).then(() => {
        context.state = Object.assign(options.store.state, context.state);
        return new Vue(options);
      });
    };
  }
  return context => {
    const i18n = createI18n(context.state.language);
    Vue.prototype.$lang = Object.assign(i18n.messages[context.state.language], context.state.languagePack || {});
    const VueApp = Vue.extend(options);
    const store = createStore({
      userInfo: context.state.userInfo,
      fromDeviceType: context.state.fromDeviceType,
    });
    const app = new VueApp({
      data: context.state,
      store,
      i18n,
    });
    /* const app = new Vue({
      data: context.state,
      i18n: createI18n(context.state.language),
      render: h => h(options)
    });*/
    return new Promise(resolve => {
      resolve(app);
    });
  };
}