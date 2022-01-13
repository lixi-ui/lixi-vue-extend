import GButton from './g-button.vue';

/* istanbul ignore next */
GButton.install = function(Vue) {
  Vue.component(GButton.name, GButton);
};

export default GButton;