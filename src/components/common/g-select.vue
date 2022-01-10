<template>
  <div class="g-select-components">
    <div v-clickoutside="close">测试</div>
  </div>
</template>

<script>
  import clickoutside from 'framework/vue/directive/clickoutside';
  export default {
    name: 'g-select',
    directives: {
      clickoutside
    },
    methods: {
      close() {
        console.log('aaa')
      }
    }
  };
</script>

<style scoped>
  @import '~asset/scss/common.scss';
  @media only screen and (min-width: 1024px) {
    .g-select-components{

    }
  }
</style>