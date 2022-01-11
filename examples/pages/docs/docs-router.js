import Introduce from './introduce/index';
import Plan from './plan/index';

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
  }
]
export default router;