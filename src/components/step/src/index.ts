import GStep from './step.vue';

/* istanbul ignore next */
GStep.install = function(Vue: any) {
  Vue.component(GStep.name, GStep);
};

export default GStep;