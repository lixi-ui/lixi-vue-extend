<template>
  <div class="component-about-us">
    <p class="about-us-title">{{ $lang.corporateContent.corporateTitle }}</p>
    <!-- 底部视频 -->
    <div class="banner-wrap" ref="bannerWrap" @mouseover="palyVideo" @mouseleave="hideCloseButton">
      <div :class="['video-out-wrap',isOverTop ? 'bottom-video-wrap': '']">
        <div class="video-box">
          <video class="video-wrap" ref="videoWrap" src="https://ws.izenecdn.com/st/website/video/Gshopper.mp4" controls="controls" muted></video>
        </div>
        <span v-if="showCloseButton" class="close-video-button" @click="closeVideo">
          <i class="el-icon-close"></i>
        </span>
      </div>
    </div>
    <div class="center-text">{{ $lang.corporateContent.title }}</div>
    <div>
      <div class="origin-list">
        <div>
          <span>{{ $root.countryCurrency.length }}</span>
          <span>{{ $lang.corporateContent.countries }}</span>
        </div>
        <div>
          <span>14</span>
          <span>{{ $lang.corporateContent.currencies }}</span>
        </div>
        <div>
          <span>{{ $root.languageList.length }}</span>
          <span>{{ $lang.corporateContent.languages }}</span>
        </div>
      </div>
      <div class="origin-list">
        <div>
          <template v-if="language === 'N000920100'">
            <span class="chinese-million">{{Math.floor(orderNumber/10000) }}
              <span>万</span>
            </span>
            <span>订单</span>
          </template>
          <template v-else-if="language === 'N000920300'">
            <span class="chinese-million">{{Math.floor(orderNumber/10000) }}
              <span>万</span>
            </span>
            <span>件の注文</span>
          </template>
          <template v-else-if="language === 'N000920700'">
            <span class="chinese-million">{{ }}
              <span>万</span>
            </span>
            <span>訂單</span>
          </template>
          <template v-else>
            <span>{{Math.floor(orderNumber/10000)/100}}</span >
            <span>Million orders</span>
          </template>
        </div>
        <div>
          <span class="chinese-million" v-if="language === 'N000920100'">
            1
            <span>亿美元</span>
          </span>
          <span class="chinese-million" v-else-if="language === 'N000920300'">
            1
            <span>億米ドル</span>
          </span>
          <span class="chinese-million" v-else-if="language === 'N000920700'">
            1
            <span>億美元</span>
          </span>
          <span v-else>100</span>
          <span>{{ $lang.corporateContent.million }}</span>
        </div>
      </div>
    </div>
    <p class="office-list-title">{{ $lang.corporateContent.ourOffices }}</p>
    <div class="office-list">
      <ul>
        <li v-for="(item,index) in officeList" :key="index">
          <div class="cover" :style="{'background-image': 'url(' + item.img + ')'}"></div>
          <div class="content">
            <p class="name">{{ item.name }}</p>
            <!--<p class="desc" v-html="item.desc"></p>-->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import shanghai from 'asset/images/corporate/shanghai@3x.jpg';
  import pasadena from 'asset/images/corporate/Pasadena@3x.jpg';
  import shenzhen from 'asset/images/corporate/shenzhen@3x.jpg';
  import hongkong from 'asset/images/corporate/Hongkong@3x.jpg';
  import tokyo from 'asset/images/corporate/Tokyo@3x.jpg';
  import melbourne from 'asset/images/corporate/Melbourne@3x.jpg';
  import moscow from 'asset/images/corporate/Moscow@3x.jpg';
  import seoul from 'asset/images/corporate/Seoul@3x.jpg';
  import Singapore from 'asset/images/corporate/Singapore@3x.jpg';
  import { getCookie, throttle } from '../../framework/utils/utils';
  export default {
    name: 'aboutUs',
    computed: {
      shopBeyondImg() {
        if (this.isChinese) {
          return 'r-cn-logo';
        }
        if (this.countryId == 1) {
          return 'tm-logo';
        } else if (this.countryId == 334 || this.countryId == 147 || this.countryId == 278) {
          return 'r-logo';
        } else {
          return 'slogan-logo';
        }
      },
    },
    inject: ['isChinese'],
    mounted() {
      this.$http.post('/api/comment/acquireAllOrders').then(res => {
        console.log('orderNumber', res);
        if (res.code === 2000) {
          this.orderNumber = res.data;
        } else {
          this.$toast(res.message);
        }
      });
      this.countryId = getCookie('countryId');
      this.language = getCookie('language');
      console.log('countryID', this.countryId);
      this.officeList = [
        { img: shanghai, name: this.$lang.corporateContent.shanghai, desc: '<p>Unit F, 6 Floor, Lu Jia Zui Finance Plaza, No.1217 Dongfang Road, Pudong New Area, Shanghai, China</p>' },
        { img: pasadena, name: this.$lang.corporateContent.pasadena, desc: '<p>177 E. Colorado Bivd. Suite 200, Pasadena, CA,  USA, 91105</p>' },
        { img: shenzhen, name: this.$lang.corporateContent.shenzhen, desc: '<p>Room 706, Dongche International Building (Rufeng Building), 573 Bulong Road, <br>Longgang District, Shenzhen, China</p>' },
        { img: hongkong, name: this.$lang.corporateContent.hongkong, desc: '<p>Room 1020, 10/F, Ocean Centre, 5 Canton Road, <br>Tsim Sha Tsui, Kowloon, Hong Kong</p>' },
        { img: tokyo, name: this.$lang.corporateContent.tokyo, desc: '<p>#904 BIZ SMART Kanda, 1-10-6, Kajichou, Chiyoda-ku, Tokyo, Japan, 101-0044</p>' },
        { img: melbourne, name: this.$lang.corporateContent.melbourne, desc: '<p>Suite 514, 100 Victoria Parade, East Melbourne, Australia, VIC 3002</p>' },
        { img: moscow, name: this.$lang.corporateContent.moscow, desc: '<p>Apt 8, 19, Krivoarbatsky Ln, Arbat District, Moscow, Russia</p>' },
        { img: seoul, name: this.$lang.corporateContent.seoul, desc: '<p>5F, 142 Teheran-ro, Gangnam-gu, Seoul, South Korea, 06236</p>' },
        { img: Singapore, name: this.$lang.corporateContent.Singapore, desc: '<p>5F, 142 Teheran-ro, Gangnam-gu, Seoul, South Korea, 06236</p>' },
      ];
      this.$nextTick(() => {
        this.overTimer = setTimeout(() => {
          this.$refs.videoWrap.play();
        }, 2000);
      });
      if (window.innerWidth >= 1024) {
        window.addEventListener('scroll', throttle(this.handleScroll, 300));
      }
    },
    destroyed() {
      // 销毁定时器
      clearTimeout(this.videoTimer);
      window.removeEventListener('scroll', this.handleScroll);
    },
    data() {
      return {
        countryId: '',
        language: '',
        officeList: [],
        videoTimer: null,
        isOverTop: false, // 视频位置
        isCancelScroll: true, // 是否监听滚动
        showCloseButton: false, // 悬停展示按钮
        orderNumber: '',
      };
    },
    methods: {
      hideCloseButton() { // 隐藏关闭按钮
        this.showCloseButton = false;
      },
      palyVideo() { // mouserover播放
        // 检测是否停止播放了
        this.showCloseButton = !!this.isOverTop;
        const isPaused = this.$refs.videoWrap.paused;
        if (!isPaused) return;
        this.$refs.videoWrap.play();
      },
      handleScroll() { // 滚动
        if (!this.isCancelScroll) return;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        const videoHeiht = this.$refs.bannerWrap.offsetHeight + 34;
        if (scrollTop > videoHeiht) {
          this.isOverTop = true;
        } else {
          this.isOverTop = false;
        }
      },
      closeVideo() { // 关闭小视频
        this.$refs.videoWrap.pause();
        this.isOverTop = false;
        this.isCancelScroll = false;
        // window.removeEventListener('scroll', this.handleScroll);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~asset/scss/base.scss";

  @media only screen and (max-width: 1023px){
    .component-about-us{
      .about-us-title{
        font-size: r(36);
        color: rgba(0, 0, 0, 0.85);
        padding: r(32) r(16);
        text-align: center;
      }
      .banner-wrap{
        width: 100%;
        min-height: r(200);
        box-sizing: border-box;
        padding: 0 r(8);
        margin: 16px auto 24px auto;
        .video-box{
          overflow: hidden;
          border-radius: r(12);
          box-shadow: 0 0 r(10) 0 rgba(0, 0, 0, .2);
        }
        .bottom-video-wrap{
          position: fixed;
          z-index: -99!important;
        }
        .video-wrap{
          width: 100%;
          height: 100%;
        }
      }
      .center-text{
        font-size: r(16);
        line-height: r(24);
        padding: r(40) r(16);
        text-align: center;
        color: rgba(0,0,0,0.65);
      }
    }
    .origin-list{
      text-align: center;
      >div{
        width: r(190);
        text-align: center;
        margin: r(40) auto 0;
        box-sizing: border-box;
        padding-bottom: r(24);
        position: relative;
        span{
          display: block;
          color: $mainColor;
          &:first-child{
            font-size: r(88);
          }
          &:last-child{
            margin-top: r(8);
            font-size: r(18);
            line-height: r(21);
            color: rgba(0,0,0,0.65);
          }
        }
        &:after{
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          width: r(152);
          height: 1px;
          background-color: rgba(0,0,0,0.25);
        }
        &:last-child{
          width: r(300);
          .chinese-million{
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            span{
              font-size: r(56);
              line-height: 1;
              color: $mainColor;
              margin-top: r(14);
            }
          }
        }
      }
    }
    .office-list-title{
      font-size: r(36);
      line-height: r(43);
      color: rgba(0,0,0,0.85);
      margin: r(70) 0 r(32);
      text-align: center;
    }
    .office-list{
      padding: 0 r(16);
      ul{
        width: 100%;
        li{
          margin-bottom: r(32);
          .cover{
            width: 100%;
            height: auto;
            padding-top: 54%;
            background-size: 100%;
          }
          .content{
            margin-top: r(16);
            .name{
              display: block;
              text-align: center;
              font-size: r(14);
              color: rgba(0,0,0,0.85);
              line-height: r(22);
              margin-bottom: r(8);
              font-weight: 500;
            }
            .desc{
              display: block;
              text-align: center;
              font-size: r(13);
              color: rgba(0,0,0,0.65);
              line-height: r(21);
              word-break: break-word;
            }
          }
        }
      }
    }
  }

  @media only screen and (min-width: 1024px){
    .component-about-us{
      .about-us-title{
        font-size: 56px;
        color: rgba(0, 0, 0, 0.85);
        padding: 56px 32px 12px;
        text-align: center;
      }
      .banner-wrap{
        width: 960px;
        height: 540px;
        margin: 34px auto 90px auto;
        .video-out-wrap{
          width: 960px;
          height: 540px;
          .video-box{
            width: 100%;
            height: 100%;
            border-radius: 16px;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, .2);
            overflow: hidden;
          }
          .video-wrap{
            width: 100%;
            height: 100%;
          }
          &.bottom-video-wrap{
            position: fixed!important;
            bottom: 63px;
            right: 63px;
            width: 316px;
            height: 178px;
            z-index: 99!important;
            .video-wrap{
              width: 100%;
              height: 100%;
              border-radius: 4px;
            }
            .close-video-button{
              position: absolute;
              display: inline-block;
              top: -16px;
              right: 0;
              width: 16px;
              height: 16px;
              text-align: center;
              line-height: 16px;  
              background: rgba(0, 0, 0, 0.45);
              font-size: 8px;
              color: #fff;
            }
          }
        }
        .video-wrap{
          width: 100%;
          height: 100%;
        }
      }
      .center-text{
        width: 960px;
        font-size: 24px;
        line-height: 38px;
        color: rgba(0,0,0,0.65);
        text-align: center;
        margin: 70px auto 94px;
      }
      .origin-list{
        display: flex;
        justify-content: space-around;
        width: 960px;
        margin: 0 auto;
        >div{
          width: 190px;
          text-align: center;
          padding-bottom: 24px;
          position: relative;
          span{
            position: relative;
            display: block;
            color: $mainColor;
            &:first-child{
              line-height: 105px;
              font-size: 88px;
            }
            &:last-child{
              font-size: 18px;
              line-height: 22px;
              color: rgba(0,0,0,0.65);
            }
          }
          &:after{
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: 152px;
            height: 1px;
            background-color: rgba(0,0,0,0.25);
          }
        }
        &:last-child{
          width: 700px;
          padding-top: 70px;
          >div{
            width: 320px;
            .chinese-million{
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              span{
                font-size: 56px;
                line-height: 1;
                color: $mainColor;
                margin-top: 12px;
              }
            }
          }
        }
      }
      .office-list-title{
        font-size: 56px;
        line-height: 67px;
        color: rgba(0,0,0,0.85);
        margin: 140px 0 50px;
        text-align: center;
      }
      .office-list {
        max-width: 1190px;
        margin: 0 auto;
        ul{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          li{
            width: 32%;
            margin-bottom: 60px;
            .cover{
              width: 100%;
              height: auto;
              padding-top: 54%;
              background-size: 100%;
            }
            .content{
              padding: 16px;
              .name{
                text-align: center;
                font-size: 18px;
                font-weight: 500;
                color: rgba(0,0,0,0.85);
              }
              .desc{
                margin-top: 8px;
                font-size: 14px;
                color: rgba(0,0,0,0.65);
                line-height: 22px;
                word-break: break-word;
              }
            }
            //&:nth-child(7){
            //  margin-left: 200px;
            //}
            //&:nth-child(8){
            //  margin-right: 200px;
            //}
          }
        }
      }
    }
  }
</style>