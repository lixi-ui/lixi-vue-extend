import GLoading from './index.vue';

/* istanbul ignore next */
GLoading.install = function(Vue:any) {
  Vue.component(GLoading.name, GLoading);
};

export default GLoading;