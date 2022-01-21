<template>
  <div class='main-content' :class="showSide ? 'show-side' : 'hide-side'">
    <div class="main-cnt-side" v-if="!bigScreen" @click="showSideFn">
      <div class="expand-iocn">
        <span class="span"></span>
        <span class="span"></span>
        <span class="span"></span>
      </div>
    </div>
    <div class="main-side">
      <div class="side-wrap g-scroll">
        <div class="side-group" v-for="(item,index) in nav" :key="index" @click="showSideFnNo">
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
        showSide: true,
        bigScreen: true
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
          this.bigScreen = true
        } else {
          this.bigScreen = false
          this.showSide = false
        }
      },
      showSideFn () {
        // console.log("this.showSide", this.showSide)
        this.showSide = !this.showSide
      },
      showSideFnNo() {
        if (document.body.clientWidth > 1024) {
          this.showSide = true
        } else {
          this.showSide = false
        }
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
  .main-cnt-side{
    position: fixed;
    top: 10px;
    left: 5px;
    z-index: 1;
    .expand-iocn{
      // background: #ddd;
      width: 34px;
      height: 34px;
      padding: 5px;
      margin: 5px;
      cursor: pointer;
      .span{
        display: block;
        width: 100%;
        height: 4px;
        padding: 2px 0;
        margin: 3px 0;
        background: #fb6638;
      }
    }
  }
  .main-content{
    position: relative;
    padding-top: 58px;
    .main-side{
      position: fixed;
      height: calc(100vh - 58px);
      width: 200px;
      // padding-left: 20px;
      border-right: 1px solid lightblue;
      // background: lightgreen;
      
      .side-wrap{
        height: 100%;
        overflow: auto;
        .side-group{
          // margin-bottom: 10px;
          padding: 4px 10px 0px 20px;
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
            color: var(--text-color);
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
      min-height: calc(100vh - 58px - 1px);
      margin-bottom: 0px;
      position: relative;
      top: 0;
      bottom: 0;
      .md-cnt{
        min-height: calc(100vh - 108px - 2px);
        padding:20px 40px 0;
      }
    }
  }
}

@media only screen and (max-width: 1023px) {
  .show-side{
    .main-side{
      display: block;
      position: absolute;
      height: calc(100vh - 58px);
      z-index: 1;
      width: 100%;
      // padding-left: 20px;
      
      background: rgba(0,0,0,0.2);
      // background: lightgreen;
      
      .side-wrap{
        height: 100%;
        overflow: auto;
        width: 400px;
        border-right: 1px solid lightblue;
        background: #f9f9f9;
        .side-group{
          margin-bottom: 10px;
          padding: 4px 10px 0px 20px;
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
      position: fixed;
      width: 100%;
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
    padding-top: 58px;
    .main-cnt{
      margin-left: 0px;
      min-height: calc(100vh - 58px - 1px);
      margin-bottom: 0px;
      position: relative;
      top: 0;
      bottom: 0;
      .md-cnt{
        min-height: calc(100vh - 108px - 2px);
        padding:0 40px;
      }
      
    }
  }
  .main-cnt-side{
    position: fixed;
    top: 10px;
    left: 5px;
    z-index: 1;
    .expand-iocn{
      // background: #ddd;
      width: 34px;
      height: 34px;
      padding: 5px;
      margin: 5px;
      cursor: pointer;
      .span{
        display: block;
        width: 100%;
        height: 4px;
        padding: 2px 0;
        margin: 3px 0;
        background: #fb6638;
      }
    }
  }
}


</style>
