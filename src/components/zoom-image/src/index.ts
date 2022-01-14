import GZoomImage from './index.vue';

/* istanbul ignore next */
GZoomImage.install = function(Vue: any) {
  Vue.component(GZoomImage.name, GZoomImage);
};

export default GZoomImage;