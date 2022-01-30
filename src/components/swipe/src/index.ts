import GSwipe from './swipe.vue';


/* istanbul ignore next */
GSwipe.install = function(Vue) {
  Vue.component(GSwipe.name, GSwipe);
};

export default GSwipe;