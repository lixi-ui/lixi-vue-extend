import GPopover from './popover.vue';

/* istanbul ignore next */
GPopover.install = function(Vue: any) {
  Vue.component(GPopover.name, GPopover);
};

export default GPopover;