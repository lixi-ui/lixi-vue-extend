import GPreviewImages from './preview-images.vue';

/* istanbul ignore next */
GPreviewImages.install = function(Vue: any) {
  Vue.component(GPreviewImages.name, GPreviewImages);
};

export default GPreviewImages;