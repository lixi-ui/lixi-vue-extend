import GSearch from './search.vue';

/* istanbul ignore next */
GSearch.install = function(Vue) {
  Vue.component(GSearch.name, GSearch);
};

export default GSearch;