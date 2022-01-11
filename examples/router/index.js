import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home';
import Docs from '../pages/docs';
import docsRouter from 'examples/pages/docs/docs-router.js';
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
    component: Docs,
    children: docsRouter
  }
]

routes = routes.concat([{
  path: '/',
  redirect: '/home'
}, {
  path: '*',
  redirect: '/home'
}])

export default new Router({
  mode: 'hash',
  routes: routes
})
