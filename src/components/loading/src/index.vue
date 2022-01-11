<template>
  <div class="loading">
    <div class="loader-39" v-if="show">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div>{{ t('el.loading.text') }}</div>
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

<style lang="scss" type="text/scss" scoped>
  .loading {
    height: auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    @-webkit-keyframes loader39-1 {
      0% {
        -webkit-transform: translate(0px, 0px);
      }
      25% {
        -webkit-transform: translate(-30px, 0px);
      }
      50% {
        -webkit-transform: translate(0px, 0px);
      }
      100% {
        -webkit-transform: translate(0px, 0px);
      }
    }
    @-webkit-keyframes loader39-2 {
      0% {
        -webkit-transform: translate(0px, 0px);
      }
      25% {
        -webkit-transform: translate(30px, 0px);
      }
      50% {
        -webkit-transform: translate(0px, 0px);
      }
      100% {
        -webkit-transform: translate(0px, 0px);
      }
    }
    .loader-39 {
      height: 80px;
      width: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .loader-39 span {
      width: 15px;
      height: 15px;
      background: #ff5224;
      border-radius: 50%;
      display: inline-block;
    }
    .loader-39 span:nth-child(1) {
      -webkit-animation: loader39-1 infinite 1.5s linear;
    }
    .loader-39 span:nth-child(5) {
      -webkit-animation: loader39-2 infinite -0.75s 1.5s linear;
    }
  }
</style>