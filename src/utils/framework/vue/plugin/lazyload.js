import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import defaultImg from 'asset/images/default.png';

Vue.use(VueLazyload, {
  preLoad: 1.2, // 预加载高度比例
  error: defaultImg, // 图片路径错误时加载图片
  loading: defaultImg, // 预加载图片
  attempt: 3, // 尝试加载图片数量
  throttleWait: 100,
  // set observer to true
  observer: true,
  // optional
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1,
  },
});