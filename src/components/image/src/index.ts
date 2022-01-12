import GImage from './image.vue';

/* istanbul ignore next */
GImage.install = function(Vue: any) {
  Vue.component(GImage.name, GImage);
};

export default GImage;