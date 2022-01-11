<template>
  <div class='main-content'>
    <div class="main-side">
      <div class="side-wrap">
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
        title: 'title'
      }
    },
  }
</script>
<style scoped lang="scss">
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
    margin-left: 200px;
    min-height: calc(100vh - 4rem - 1px);
    margin-bottom: 0px;
    position: relative;
    top: 0;
    bottom: 0;
    .md-cnt{
      min-height: calc(100vh - 7.4rem - 2px);
      padding-left: 20px;
    }
  }
}
</style>
