import Introduce from './introduce/index';
import Plan from './plan/index';
import Loading from 'g-ui/src/components/loading/doc/index.vue';
import Checkbox from 'g-ui/src/components/checkbox/doc/index.vue';

const router = [
  {
    path: '/docs/introduce',
    name: 'introduce',
    urlPath: '/docs/introduce',
    title: '介绍',
    component: Introduce
  },
  {
    path: '/docs/plan',
    name: 'plan',
    urlPath: '/docs/plan',
    title: '计划',
    component: Plan
  },
  {
    path: '/docs/loading',
    name: 'loading',
    urlPath: '/docs/loading',
    title: '加载',
    component: Loading
  },
  {
    path: '/docs/checkbox',
    name: 'checkbox',
    urlPath: '/docs/checkbox',
    title: '复选框',
    component: Checkbox
  }
]
export default router;