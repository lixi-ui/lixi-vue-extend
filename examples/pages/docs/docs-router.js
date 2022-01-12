import Introduce from './introduce/index';
import Plan from './plan/index';
import Loading from 'g-ui/src/components/loading/doc/index.vue';
import Checkbox from 'g-ui/src/components/checkbox/doc/index.vue';
import EuropeWarranty from 'g-ui/src/components/europe-warranty/doc/index.vue';
import FloatContactShopper from 'g-ui/src/components/float-contact-shopper/doc/index.vue';
import Image from 'g-ui/src/components/image/doc/index.vue';

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
  },
  {
    path: '/docs/europe-warranty',
    name: 'europeWarranty',
    urlPath: '/docs/europe-warranty',
    title: '保修',
    component: EuropeWarranty
  },
  {
    path: '/docs/float-contact-shopper',
    name: 'floatContactShopper',
    urlPath: '/docs/float-contact-shopper',
    title: '购物者',
    component: FloatContactShopper
  },
  {
    path: '/docs/image',
    name: 'image',
    urlPath: '/docs/image',
    title: '图像',
    component: Image
  }
]
export default router;