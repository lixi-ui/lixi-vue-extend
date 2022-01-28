<template>
  <div>
    <component :is="component"/>
  </div>
</template>
<script>
import zhCN from './zh-CN/index.md';
import es from './es/index.md';
import './index.scss';

export default {
  name: 'g-docs-checkbox',
  components: {
    zhCN,
    es
  },
  data() {
    return {
      component: this.$locale.$lang === 'zh-CN' ? zhCN : es
    }
  }
}
</script>
