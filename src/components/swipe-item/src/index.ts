import GSwipeItem from "../../swipe/src/swipe-item.vue";

GSwipeItem.install = function(Vue) {
  Vue.component(GSwipeItem.name, GSwipeItem);
};

export default GSwipeItem;