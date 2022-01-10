<template>
  <div class="tooltips-component" v-if="visibleEuropeWarranty">
    <div class="tooltips-box" @click="showPopup">
      <ul class="tooltips-list">
        <!--<li class="tooltips-item hover-animation">
          <i class="icon-warranty"></i>
          <span>{{ $lang.warrantyLabel }}</span>
          <div class="pop-wrap">
            <span>{{ $lang.warrantyDetailTips }}</span>
            <a :href="`https://www.gshopper.com/${$root.COOKIE_COUNTRY}/article/detail/help?catId=15`" target="_blank">{{ $lang.viewDetails }}</a>
            <div class="tips-triangle"><span></span></div>
          </div>
        </li>-->
        <li class="tooltips-item hover-animation">
          <i class="icon-tax"></i>
          <span>{{ $lang.taxLabel }}</span>
          <div class="pop-wrap">
            <span>{{ $lang.taxContent }}</span>
            <div class="tips-triangle"><span></span></div>
          </div>
        </li>
        <li class="tooltips-item hover-animation">
          <i class="icon-payment"></i>
          <span>{{ $lang.securePayment }}</span>
          <div class="pop-wrap">
            <i class="service-payment"></i>
            <div class="tips-triangle"><span></span></div>
          </div>
        </li>
      </ul>
      <i class="el-icon-arrow-right"></i>
    </div>
    <van-popup class="tooltips-popup" v-model="visiblePopup" :overlay="visiblePopup && isMobile" position="bottom">
      <div class="tooltips-popup-content" v-show="visiblePopup">
        <h2>{{ $lang.serviceTitle }}</h2>
        <ul class="service-list">
          <!--<li>
            <h3>{{ $lang.warrantyLabel }}</h3>
            <p>
              <span>{{ $lang.warrantyDetailTips }}</span>
              <a :href="`https://www.gshopper.com/${$root.COOKIE_COUNTRY}/article/detail/help?catId=15`" target="_blank">{{ $lang.viewDetails }}</a>
            </p>
          </li>-->
          <li>
            <h3>{{ $lang.taxLabel }}</h3>
            <p>
              <span>{{ $lang.taxContent }}</span>
            </p>
          </li>
          <li>
            <h3>{{ $lang.securePayment }}</h3>
            <p>
              <img src="~asset/images/wap/icon-service-payment@2x.png" alt="">
            </p>
          </li>
        </ul>
        <i class="el-icon-close" @click.stop="visiblePopup = false"></i>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import { getCookie } from '../../framework/utils/utils';
  export default {
    name: 'europeWarranty',
    data() {
      return {
        visibleEuropeWarranty: false,
        visiblePopup: false
      };
    },
    computed: {
      isMobile() {
        return this.$root.isMobile;
      }
    },
    mounted() {
      const countryId = getCookie('countryId');
      this.visibleEuropeWarranty = ['47', '236', '102', '105', '131', '219', '227', '277'].includes(countryId);
    },
    methods: {
      showPopup() {
        if (this.isMobile) {
          this.visiblePopup = true;
        }
      },
    }
  };
</script>

<style scoped lang="scss">
  @import "~asset/scss/base.scss";
  @media only screen and (max-width: 1023px) {
    .tooltips-component {
      margin-top: r(16);
      border-top: r(1) solid #F5F5F5;
      padding: r(16) r(16) 0;
      .tooltips-box{
        display: flex;
        justify-content: space-between;
      }
      .tooltips-list {
        display: flex;
        .tooltips-item {
          position: relative;
          display: flex;
          align-items: center;
          font-size: r(12);
          color: rgba(0, 0, 0, 0.85);
          cursor: pointer;
          + .tooltips-item {
            margin-left: r(12);
          }
          [class^='icon-'] {
            width: r(13);
            height: r(16);
            margin-right: r(4);
          }
          .icon-warranty {
            @include bg-image('icon-warranty');
          }
          .icon-tax {
            @include bg-image('icon-tax');
          }
          .icon-payment {
            @include bg-image('icon-payment');
          }
          .pop-wrap {
            display: none;
          }
        }
      }
      .el-icon-arrow-right{
        font-size: r(16);
        color: #9A9A9A;
      }
    }
    .tooltips-popup{
      box-sizing: border-box;
      left: 0;
      transform: translate3d(0, 0, 0);
      border-radius: 8px 8px 0 0;
      overflow: hidden;
      .tooltips-popup-content{
        position: relative;
        h2{
          font-size: r(17);
          padding: r(16) 0;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.85);
          border-bottom: r(1) solid #D8D8D8;
          text-align: center;
        }
        .service-list{
          padding: r(16);
          >li{
            +li{
              margin-top: r(24);
            }
            h3{
              font-size: r(15);
              line-height: r(18);
              font-weight: bold;
              color: rgba(0, 0, 0, 0.85);
            }
            p{
              font-size: r(13);
              line-height: r(18);
              color: rgba(0, 0, 0, 0.85);
              margin-top: r(4);
              a{
                color: #1BA1DB;
                text-decoration: underline;
              }
              img{
                display: block;
                max-width: 80%;
                margin-top: r(4);
              }
            }
          }
        }
        .el-icon-close{
          position: absolute;
          font-size: r(16);
          right: r(16);
          top: r(16);
          color: #D8D8D8;
        }
      }
    }
  }
  @media only screen and (min-width: 1024px) {
   .tooltips-component{
     position: relative;
     z-index: 2;
     margin: 8px 0 16px;
     .tooltips-list{
       display: flex;
       .tooltips-item{
         position: relative;
         display: flex;
         align-items: center;
         font-size: 12px;
         color: rgba(0, 0, 0, 0.85);
         cursor: pointer;
         +.tooltips-item{
           margin-left: 16px;
         }
         [class^='icon-'] {
           width: 13px;
           height: 16px;
           margin-right: 4px;
         }
         .icon-warranty{
           @include bg-image('icon-warranty');
         }
         .icon-tax{
           @include bg-image('icon-tax');
         }
         .icon-payment{
           @include bg-image('icon-payment');
         }
         &:hover{
           .pop-wrap{
             visibility: visible;
             opacity: 1;
           }
         }
         .pop-wrap{
           visibility: hidden;
           opacity: 0;
           position: absolute;
           z-index: 9;
           left: 0;
           top: 28px;
           min-width: 200px;
           padding: 8px;
           background: #fff;
           box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
           border: 1px solid #dedede;
           font-size: 12px;
           color: rgba(0, 0, 0, 0.85);
           line-height: 17px;
           border-radius: 8px;
           transition: all 0.4s cubic-bezier(0.73, 0.005, 0.22, 1);
           text-align: left;
           font-weight: 400;
           .tips-triangle {
             position: absolute;
             top: -16px;
             left: 18px;
             width: 0;
             height: 0;
             border: 8px solid transparent;
             border-bottom-color: rgba(222,222,222,1);
             span {
               position: absolute;
               width: 0;
               height: 0;
               border: 8px solid transparent;
               border-bottom-color: #fff;
               top: -6px;
               left: -8px;
               z-index: 18;
             }
           }
           .service-payment{
             display: block;
             width: 216px;
             height: 16px;
             background: url("~asset/images/wap/icon-service-payment@2x.png") no-repeat center 100%/100%;
           }
           a{
             color: #1BA1DB;
             text-decoration: underline;
           }
         }
       }
     }
     .tooltips-popup{
       display: none;
     }
     .el-icon-arrow-right{
       display: none;
     }
   }
  }
</style>