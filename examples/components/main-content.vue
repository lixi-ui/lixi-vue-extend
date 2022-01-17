<template>
  <div class='main-content' :class="showSide ? 'show-side' : 'hide-side'">
    <div class="main-cnt-side" @click="showSideFn">{{ showSide ? '12' : '21' }}</div>
    <div class="main-side">
      <div class="side-wrap g-scroll">
        <div class="side-group" v-for="(item,index) in nav" :key="index">
          <router-link
            active-class="active"
            :to="item.path">
            {{ item.title }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="main-cnt">
      <div class="md-cnt">
        <slot></slot>
      </div>
      <main-footer></main-footer>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MainContent',
    props:{
      nav: {
        type: Array,
        default: function(){
          return []
        }
      }
    },
    data () {
      return {
        title: 'title',
        showSide: true
      }
    },
    mounted() {
      window.onresize = () => {
        this.dealWithScreen()
      }
      this.dealWithScreen()
    },
    methods: {
      dealWithScreen () {
        // console.log('document.body.clientWidth', document.body.clientWidth)
        if (document.body.clientWidth > 1024) {
          this.showSide = true
        } else {
          this.showSide = false
        }
      },
      showSideFn () {
        console.log("this.showSide", this.showSide)
        this.showSide = !this.showSide
      }
    }
  }
</script>
<style scoped lang="scss">
@media only screen and (min-width: 1024px) {
  .show-side{
    .main-side{
      display: block;
    }
    div.main-cnt{
      margin-left: 200px;
    }
  }
  .hide-side{
    .main-side{
      display: none !important;
    }
    div.main-cnt{
      margin-left: 0px;
    }
  }
  .main-content{
    position: relative;
    padding-top: 4rem;
    .main-side{
      position: fixed;
      height: calc(100vh - 4rem);
      width: 200px;
      // padding-left: 20px;
      border-right: 1px solid lightblue;
      // background: lightgreen;
      
      .side-wrap{
        height: 100%;
        overflow: auto;
        .side-group{
          // margin-bottom: 10px;
          padding: 0px 10px 0px 20px;
          font-size: 16px;
          .title{
            color: #333;
            padding-bottom: 5px;
            margin-bottom: 5px;
            font-weight: 600;
            border-bottom: 1px solid lightgray;
          }
          a{
            padding: 3px 3px;
            display: inline-block;
            width: 100%;
            color: #444;
            text-decoration: none;
            &:hover{
              color: #fb6638;
            }
          }
          .active{
            color: #fb6638;
          }
        }
      }
    }
    .main-cnt{
      min-height: calc(100vh - 4rem - 1px);
      margin-bottom: 0px;
      position: relative;
      top: 0;
      bottom: 0;
      .md-cnt{
        min-height: calc(100vh - 7.4rem - 2px);
        padding:0 20px;
      }
    }
  }
}

@media only screen and (max-width: 1023px) {
  .show-side{
    background: rgba(0,0,0,0.2);
    .main-side{
      display: block;
      position: absolute;
      height: calc(100vh - 4rem);
      z-index: 1;
      width: 200px;
      // padding-left: 20px;
      border-right: 1px solid lightblue;
      background: lightgreen;
      
      .side-wrap{
        height: 100%;
        overflow: auto;
        .side-group{
          // margin-bottom: 10px;
          padding: 0px 10px 0px 20px;
          font-size: 16px;
          .title{
            color: #333;
            padding-bottom: 5px;
            margin-bottom: 5px;
            font-weight: 600;
            border-bottom: 1px solid lightgray;
          }
          a{
            padding: 3px 3px;
            display: inline-block;
            width: 100%;
            color: #444;
            text-decoration: none;
            &:hover{
              color: #fb6638;
            }
          }
          .active{
            color: #fb6638;
          }
        }
      }
    }
    div.main-cnt{
      margin-left: 0px;
    }
  }
  .hide-side{
    .main-side{
      display: none !important;
    }
    div.main-cnt{
      margin-left: 0px;
    }
  }
  .main-content{
    position: relative;
    padding-top: 4rem;
    .main-cnt{
      margin-left: 0px;
      min-height: calc(100vh - 4rem - 1px);
      margin-bottom: 0px;
      position: relative;
      top: 0;
      bottom: 0;
      .md-cnt{
        min-height: calc(100vh - 7.4rem - 2px);
        padding:0 20px;
      }
      .main-cnt-side{
        position: absolute;
        top: 0px;
        left: 0px;
      }
    }
  }
}


</style>
