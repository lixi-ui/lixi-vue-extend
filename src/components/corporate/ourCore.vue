<template>
  <div class="component-our-core">
    <div class="our-core-banner" :style="{'background-color': bgColorList[activeId - 1]}">
      <p class="our-core-title">{{ $lang.corporateContent.ourCore }}</p>
      <ul class="our-core-origin">
        <li @click="handleOrigin(index)" :style="{'color': index == (activeId - 1) ? bgColorList[activeId - 1] : '#fff'}" :class="{active: activeId == (index + 1)}" v-for="(item, index) in [1, 2, 3, 4, 5]">{{ item }}</li>
      </ul>
      <div class="our-core-values">
        <div class="our-core-wrap" :class="{active: activeId == (index + 1)}" v-for="(item, index) in ourCoreValues">
          <p class="our-core-sub">{{ item.title }}</p>
          <p class="our-core-content" v-html="item.content"></p>
        </div>
      </div>
    </div>
    <div class="our-core-pic-wrap">
      <div class="pic-wrap">
        <div class="pic-top">
          <img src="~asset/images/corporate/pic-1-jp.png" alt="" v-if="$root.countryId == 147">
          <img src="~asset/images/corporate/pic-1-sh.jpg" alt="" v-else>
        </div>
        <!--<div class="pic-bottom">
          <img src="~asset/images/corporate/pic-2.jpg" alt="">
          <img src="~asset/images/corporate/pic-3.jpg" alt="">
        </div>-->
      </div>
      <div class="pic-wrap">
        <div class="pic-top">
          <img src="~asset/images/corporate/pic-2-mo.jpg" alt="">
        </div>
        <div class="pic-bottom">
          <img src="~asset/images/corporate/pic-3.jpg" alt="">
          <img src="~asset/images/corporate/pic-5.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="careers">
      <p class="careers-title">{{ $lang.corporateContent.careers }}</p>
      <p class="careers-content">
        {{ $lang.corporateContent.careersContent }}
      </p>
      <div class="careers-link">
        <a href="https://www.linkedin.com/company/gshopper">
          <i class="in-icon"></i>
          {{ $lang.corporateContent.connectLinked }}
        </a>
        <!--<a href="https://angel.co/company/gshopper">
          <i class="angelist-icon"></i>
          {{ $lang.corporateContent.connectAngeList }}
        </a>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ourCore',
    data() {
      return {
        activeId: 1,
        bgColorList: ['#F37231', '#1BA1DB', '#3AB550', '#F8C738', '#EE5636'],
        ourCoreValues: []
      };
    },
    mounted() {
      this.ourCoreValues = [
        {
          title: this.$lang.corporateContent.speed,
          content: this.$lang.corporateContent.speedContent,
        },
        {
          title: this.$lang.corporateContent.hardWork,
          content: this.$lang.corporateContent.hardWorkContent,
        },
        {
          title: this.$lang.corporateContent.transparency,
          content: this.$lang.corporateContent.transparencyContent,
        },
        {
          title: this.$lang.corporateContent.teamwork,
          content: this.$lang.corporateContent.teamworkContent,
        },
        {
          title: this.$lang.corporateContent.commitment,
          content: this.$lang.corporateContent.commitmentContent,
        },
      ];
    },
    methods: {
      handleOrigin(index) {
        this.activeId = index + 1;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~asset/scss/base.scss";

  @media only screen and (max-width: 1023px){
    .component-our-core{
      .our-core-banner{
        padding-top: r(56);
        height: r(410);
        background-color: #EE5636;
        text-align: center;
        color: #FFFFFF;
        transition: all .3s ease-out;
        .our-core-title{
          font-size: r(32);
          line-height: r(38);
          color: #fff;
          margin-bottom: r(32);
        }
        .our-core-origin{
          margin: 0 r(16);
          display: flex;
          justify-content: space-between;
          li{
            display: flex;
            align-items: center;
            justify-content: center;
            width: r(46);
            height: r(46);
            opacity: 0.7;
            font-size: r(24);
            color: #fff;
            border: r(2) solid #FFFFFF;
            border-radius: 50%;
            box-sizing: border-box;
            transition: all 0.3s ease-out;
            cursor: pointer;
            &.active{
              opacity: 1;
              background-color: #fff;
              color: #F37232;
            }
          }
        }
        .our-core-values{
          margin: 0 r(16);
          position: relative;
        }
        .our-core-wrap{
          width: 100%;
          position: absolute;
          opacity: 0;
          transition: all .3s ease-out;
          visibility: hidden;
          .our-core-sub{
            margin-top: r(40);
            font-size: r(26);
            line-height: r(31);
          }
          .our-core-content{
            font-size: r(16);
            line-height: r(20);
            margin-top: r(16);
          }
          &.active{
            transform: translateX(0);
            opacity: 1;
            visibility: visible;
          }
        }
      }
      .our-core-pic-wrap{
        margin: r(56) r(16) r(36);
        .pic-wrap{
          margin-bottom: 4px;
          .pic-top{
            margin-bottom: r(4);
            img{
              width: 100%;
            }
          }
          .pic-bottom{
            display: flex;
            justify-content: space-between;
            img{
              width: 49%;
              height: 100%;
              object-fit: contain;
            }
          }
        }
      }
      .careers{
        .careers-title{
          font-size: r(36);
          line-height: r(43);
          color: rgba(0,0,0,0.85);
          text-align: center;
        }
        .careers-content{
          margin: r(12) r(16) r(52);
          font-size: r(16);
          line-height: r(22);
          color: rgba(0,0,0,0.65);
          text-align: center;
          span{
            color: #FF5224;
            border-bottom: 1px solid;
          }
        }
        .careers-link{
          >a{
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            height: r(60);
            margin: 0 r(24);
            padding: 0 r(16);
            font-size: r(18);
            border-radius: r(4);
            &:first-child{
              background-color: #416DA7;
              color: #fff;
              margin-bottom: r(16);
            }
            i{
              margin-right: 16px;
            }
            .in-icon{
              width: r(21);
              height: r(22);
              @include bg-image('in');
            }
            .angelist-icon{
              width: r(24);
              height: r(30);
              @include bg-image('angelist');
            }
          }
        }
      }
    }
  }

  @media only screen and (min-width: 1024px){
    .component-our-core{
      .our-core-banner{
        padding: 56px 0 0;
        height: 430px;
        background-color: #EE5636;
        text-align: center;
        color: #FFFFFF;
        transition: all .3s ease-out;
        .our-core-title{
          font-size: 32px;
          line-height: 38px;
          color: #fff;
          margin-bottom: 50px;
        }
        .our-core-origin{
          width: 450px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          li{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 64px;
            height: 64px;
            opacity: 0.7;
            font-size: 32px;
            color: #fff;
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            box-sizing: border-box;
            transition: all 0.3s ease-out;
            cursor: pointer;
            &.active{
              opacity: 1;
              background-color: #fff;
              color: #F37232;
            }
          }
        }
        .our-core-values{
          width: 720px;
          margin: 0 auto;
          position: relative;
        }
        .our-core-wrap{
          width: 720px;
          position: absolute;
          opacity: 0;
          transform: translateX(50px);
          transition: all .3s ease-out;
          visibility: hidden;
          .our-core-sub{
            margin-top: 50px;
            font-size: 30px;
            line-height: 36px;
          }
          .our-core-content{
            font-size: 17px;
            line-height: 24px;
            margin-top: 24px;
          }
          &.active{
            transform: translateX(0);
            opacity: 1;
            visibility: visible;
          }
        }
      }
      .our-core-pic-wrap{
        max-width: 1300px;
        margin: 140px auto 0;
        display: flex;
        justify-content: space-between;
        .pic-wrap{
          width: calc(100% / 2 - 16px);
          .pic-top{
            img{
              width: 100%;
            }
          }
          .pic-bottom{
            display: flex;
            justify-content: space-between;
            img{
              width: calc(100% / 2 - 16px);
              height: 100%;
            }
          }
          &:last-child{
            display: flex;
            flex-direction: column-reverse;
            .pic-top{
              margin-top: 32px;
              margin-bottom: 0;
            }
          }
        }
      }
      .careers{
        .careers-title{
          margin-top: 70px;
          font-size: 44px;
          line-height: 53px;
          color: rgba(0,0,0,0.85);
          text-align: center;
        }
        .careers-content{
          width: 800px;
          margin: 36px auto 48px;
          font-size: 22px;
          line-height: 26px;
          color: rgba(0,0,0,0.65);
          text-align: center;
          span{
            color: #FF5224;
            border-bottom: 1px solid;
          }
        }
        .careers-link{
          margin: 48px auto 0;
          display: flex;
          justify-content: center;
          >a{
            display: flex;
            align-items: center;
            width: 272px;
            height: 60px;
            padding: 0 16px;
            box-sizing: border-box;
            font-size: 18px;
            border-radius: 4px;
            &:first-child{
              background-color: #416DA7;
              color: #fff;
            }
            i{
              margin-right: 16px;
            }
            .in-icon{
              width: 21px;
              height: 22px;
              @include bg-image('in');
            }
            .angelist-icon{
              width: 24px;
              height: 30px;
              @include bg-image('angelist');
            }
          }
        }
      }
    }
  }
</style>