import GGpPagination from './gp-pagination.vue';

/* istanbul ignore next */
GGpPagination.install = function(Vue: any) {
  Vue.component(GGpPagination.name, GGpPagination);
};

export default GGpPagination;