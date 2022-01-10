/* Automatically generated by './build/bin/build-entry.js' */

import Button from './components/button/package/index.ts';
import Loading from './components/Loading/src/index.ts';

const components = [
  Button,
  Loading
];

const install = function(Vue, opts = {}) {

  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };


};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.0.1',
  install,
  Button
};