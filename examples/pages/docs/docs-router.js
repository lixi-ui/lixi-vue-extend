import Introduce from './introduce/doc/index';
import Install from './install/doc/index';
import Design from './design/doc/index';
import Plan from './plan/index';
import Loading from 'g-ui/src/components/loading/doc/index.vue';
import Checkbox from 'g-ui/src/components/checkbox/doc/index.vue';
import EuropeWarranty from 'g-ui/src/components/europe-warranty/doc/index.vue';
import FloatContactShopper from 'g-ui/src/components/float-contact-shopper/doc/index.vue';
import Image from 'g-ui/src/components/image/doc/index.vue';
import Button from 'g-ui/src/components/g-button/doc/index.vue';
import Input from 'g-ui/src/components/input/doc/index.vue';
import GpPagination from 'g-ui/src/components/gp-pagination/doc/index.vue';
import GPopover from 'g-ui/src/components/popover/doc/index.vue';
import GPreviewImages from 'g-ui/src/components/preview-images/doc/index.vue';
import GSearch from 'g-ui/src/components/search/doc/index.vue';
import GStep from 'g-ui/src/components/step/doc/index.vue';
import GWechatQrcode from 'g-ui/src/components/wechat-qrcode/doc/index.vue';
import GZoomImage from 'g-ui/src/components/zoom-image/doc/index.vue';

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
    path: '/docs/install',
    name: 'install',
    urlPath: '/docs/install',
    title: '安装',
    component: Install
  },
  {
    path: '/docs/design',
    name: 'design',
    urlPath: '/docs/design',
    title: '设计',
    component: Design
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
  },
  {
    path: '/docs/button',
    name: 'button',
    urlPath: '/docs/button',
    title: '按钮',
    component: Button
  },
  {
    path: '/docs/input',
    name: 'input',
    urlPath: '/docs/input',
    title: '输入框',
    component: Input
  },
  {
    path: '/docs/gp-pagination',
    name: 'gpPagination',
    urlPath: '/docs/gp-pagination',
    title: '分页',
    component: GpPagination
  },
  {
    path: '/docs/popover',
    name: 'popover',
    urlPath: '/docs/popover',
    title: '弹出',
    component: GPopover
  },
  {
    path: '/docs/preview-images',
    name: 'previewImages',
    urlPath: '/docs/preview-images',
    title: '预览图片',
    component: GPreviewImages
  },
  {
    path: '/docs/search',
    name: 'search',
    urlPath: '/docs/search',
    title: '搜索',
    component: GSearch
  },
  {
    path: '/docs/step',
    name: 'step',
    urlPath: '/docs/step',
    title: '步骤',
    component: GStep
  },
  {
    path: '/docs/wechat-qrcode',
    name: 'wechat-qrcode',
    urlPath: '/docs/wechat-qrcode',
    title: '二维码',
    component: GWechatQrcode
  },
  {
    path: '/docs/zoom-image',
    name: 'zoom-image',
    urlPath: '/docs/zoom-image',
    title: '图片缩放',
    component: GZoomImage
  }
]
export default router;