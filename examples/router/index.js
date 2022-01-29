import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home';
import Docs from '../pages/docs';
import Share from '../pages/share';
import docsRouter from 'examples/pages/docs/docs-router.js';
import shareRouter from 'examples/pages/share/share-router.js';
import hljs from 'highlight.js';
Vue.use(Router)


var routes = [
  {
    name: 'home',
    path: '/home',
    urlPath: '/home',
    component: Home,
  },
  {
    name: 'docs',
    path: '/docs',
    urlPath: '/docs',
    redirect: '/docs/introduce',
    component: Docs,
    children: docsRouter
  },
  {
    name: 'share',
    path: '/share',
    urlPath: '/share',
    redirect: '/share/introduce',
    component: Share,
    children: shareRouter
  }
]

routes = routes.concat([{
  path: '/',
  redirect: '/home'
}, {
  path: '*',
  redirect: '/home'
}])



var router = new Router({
  mode: 'hash',
  routes: routes
})

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
})


export default router;