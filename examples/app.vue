<template>
  <div id="app">
    <main-header :navAll="navAll"></main-header>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
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
      this.navAll = [{name: 'home', path: '/home'}, { name: 'docs', path: '/docs'}, { name: 'share', path: '/share'}]
    }
  }
</script>
