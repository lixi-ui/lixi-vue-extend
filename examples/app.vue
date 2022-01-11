<template>
  <div id="app">
    <main-header :navAll="navAll"></main-header>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

  import navsData from './router/nav.config.js';
  import locale from 'g-ui/src/locale/index';
  import webLocale from 'examples/locale/index.js';

  export default {
    name: "app",
    data(){
      return {
        meta: this.$route.meta,
        nav: [],
        navAll: []
      }
    },
    components:{
    },
    beforeCreate () {
      this.$locale.$lang = localStorage.getItem('g-lang');
      if(!this.$locale.$lang){
        this.$locale.$lang = 'zh-CN';
        localStorage.setItem('g-lang', 'zh-CN')
      }
      locale.use()
      webLocale.use()
    },
    mounted(){
      // console.log('nav?',navsData["zh-CN"][1].children[0].children);
      this.nav = navsData["zh-CN"][1].children
      this.navAll = navsData["zh-CN"]
    }
  }
</script>
