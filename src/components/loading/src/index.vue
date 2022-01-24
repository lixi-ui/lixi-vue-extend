<template>
  <div class="loading">
    <div class="loader-39" v-if="show">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
  import { t } from 'g-ui/src/locale/index.js'
  export default {
    name: 'g-loading',
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    methods:{
      t: t
    }
  };
</script>
