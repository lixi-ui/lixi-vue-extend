import Vue from "vue";
import App from "./app.vue";

import router from './router/index.js';

import dome from "./components/demo.vue";

import demoBlock from './components/demo-block';
import MainHeader from './components/main-header';
import MainContent from './components/main-content';
import MainFooter from './components/main-footer';
import locale from 'g-ui/src/locale/lang/es.js';

import webLocale from 'examples/locale/index.js'

import '../src/style/src/index.scss';
import './style/index.scss';
import './style/common.scss';
import 'vant/lib/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'highlight.js/styles/github.css';
import './flexible.js';

import Lxv from "../src/index.js";

Vue.use(Lxv, { locale });

webLocale.use()

Vue.component(dome.name, dome);
Vue.component('demo-block', demoBlock);
Vue.component('main-header', MainHeader);
Vue.component('main-content', MainContent);
Vue.component('main-footer', MainFooter);

Vue.prototype.$t = webLocale.t;
Vue.prototype.$locale = { $lang: 'zh-CN' };

new Vue({
  el: "#app",
  render: function(h) { return h(App); },
  router
});