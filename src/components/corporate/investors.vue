<template>
  <div class="component-investors">
    <div class="investors-title">{{ $lang.corporateContent.ourInvestors }}</div>
    <!--<div class="banner">100 million in VC funding</div>-->
    <div class="concat-us" v-html="$lang.corporateContent.concatUsEmail"></div>
    <div class="investors-list">
      <ul>
        <li v-for="item in investorsList">
          <div class="avatar" :style="{'background-image': 'url(' + item.avatar + ')'}"></div>
          <div class="content">
            <p class="name">{{ item.name }}</p>
            <p class="position">{{ item.position }}</p>
            <p class="desc" v-html="item.desc"></p>
          </div>
        </li>
      </ul>
    </div>
    <div class="investors-logo-list">
      <ul>
        <li class="oak"></li>
        <li class="clearvue"></li>
        <li class="roads"></li>
      </ul>
      <ul>
        <li class="sbi"></li>
        <li class="ktb"></li>
        <li class="wishnut"></li>
        <li class="soldorn"></li>
        <li class="jyp"></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import AllanKwan from 'asset/images/corporate/AllanKwan@3x.png';
  import HarryHui from 'asset/images/corporate/HarryHui@3x.png';
  import WilliamChen from 'asset/images/corporate/WilliamChen@3x.png';
  import DanielAuerbach from 'asset/images/corporate/DanielAuerbach@3x.png';
  export default {
    name: 'aboutUs',
    data() {
      return {
        investorsList: []
      };
    },
    mounted() {
      this.investorsList = [
        {
          avatar: AllanKwan,
          name: 'Allan Kwan',
          position: this.$lang.corporateContent.investorPosition1,
          desc: this.$lang.corporateContent.investorDesc1,
        },
        {
          avatar: HarryHui,
          name: 'Harry Hui',
          position: this.$lang.corporateContent.investorPosition2,
          desc: this.$lang.corporateContent.investorDesc2,
        },
        {
          avatar: WilliamChen,
          name: 'William Chen',
          position: this.$lang.corporateContent.investorPosition3,
          desc: this.$lang.corporateContent.investorDesc3,
        },
        {
          avatar: DanielAuerbach,
          name: 'Daniel Auerbach',
          position: this.$lang.corporateContent.investorPosition4,
          desc: this.$lang.corporateContent.investorDesc4,
        }
      ];
    }
  };
</script>

<style lang="scss" scoped>
  @import "~asset/scss/base.scss";

  @media only screen and (max-width: 1023px){
    .component-investors{
      background-color: #F4F4F4;
      .investors-title{
        font-size: r(36);
        line-height: r(43);
        color: rgba(0,0,0,0.85);
        text-align: center;
        padding: r(40) 0;
      }
      .concat-us{
        font-size: 16px;
        font-weight: 400;
        height: 22px;
        line-height: 22px;
        text-align: center;
        p{
          >a{
            display: inline-block;
            width: 200px;
            height: 16px;
            line-height: 16px;
            color: #FF5224!important;
          }
        }
      }
      .banner{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: r(97);
        font-size: r(24);
        color: #fff;
        background-color: #3AB550;
      }
      .investors-list{
        padding: 0 r(16) r(40);
        ul{
          >li{
            text-align: center;
            margin-bottom: r(32);
            .avatar{
              width: r(200);
              height: r(200);
              background-size: 100%;
              margin: 0 auto r(24);
            }
            .content{
              flex: 1;
              .name{
                font-size: r(24);
                line-height: r(30);
                color: rgba(0,0,0,0.85);
                margin-bottom: r(8);
              }
              .position{
                font-size: r(12);
                line-height: r(14);
                color: rgba(0,0,0,0.65);
                margin-bottom: r(16);
              }
              .desc{
                position: relative;
                font-size: r(14);
                color: rgba(0,0,0,0.85);
                line-height: r(20);
              }
            }
          }
        }
      }
      .investors-logo-list{
        margin: 0 auto;
        ul{
          text-align: center;
          li{
            display: block;
            margin: 0 auto r(40);
            &.oak{
              width: r(180);
              height: r(80);
              background: url("~asset/images/corporate/OAK@3x.jpg");
              background-size: 100%;
            }
            &.clearvue{
              width: r(256);
              height: r(89);
              background: url("~asset/images/corporate/CLEARVUE@3x.jpg");
              background-size: 100%;
            }
            &.roads{
              width: r(340);
              height: r(90);
              background: url("~asset/images/corporate/ROADS@3x.jpg");
              background-size: 100%;
            }
            &.sbi{
              width: r(124);
              height: r(96);
              background: url("~asset/images/corporate/SBI@3x.jpg");
              background-size: 100%;
            }
            &.ktb{
              width: r(102);
              height: r(85);
              background: url("~asset/images/corporate/KTB@3x.jpg");
              background-size: 100%;
            }
            &.wishnut{
              width: r(200);
              height: r(96);
              background: url("~asset/images/corporate/WISENUT@3x.jpg");
              background-size: 100%;
            }
            &.soldorn{
              width: r(97);
              height: r(80);
              background: url("~asset/images/corporate/SOLBORN@3x.jpg");
              background-size: 100%;
            }
            &.jyp{
              width: r(166);
              height: r(80);
              background: url("~asset/images/corporate/JYP@3x.jpg");
              background-size: 100%;
            }
          }
          &:last-child{
            li{
              display: inline-block;
              margin: 0 r(8) r(40);
            }
          }
        }
      }
    }
  }

  @media only screen and (min-width: 1024px){
    .component-investors{
      background-color: #F4F4F4;
      padding: 60px 0;
      .investors-title{
        padding: 24px 0;
        font-size: 56px;
        line-height: 78px;
        color: rgba(0,0,0,0.85);
        text-align: center;
      }
      .concat-us{
        font-size: 16px;
        font-weight: 400;
        height: 22px;
        line-height: 22px;
        text-align: center;
        p{
          >a{
            display: inline-block;
            width: 200px;
            height: 16px;
            line-height: 16px;
            color: #FF5224!important;
          }
        }
      }
      .banner{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 260px;
        font-size: 56px;
        color: #fff;
        background-color: #3AB550;
      }
      .investors-list{
        max-width: 1030px;
        margin: 56px auto 0;
        ul{
          >li{
            margin-bottom: 80px;
            display: flex;
            .avatar{
              width: 200px;
              height: 200px;
              background-size: 100%;
              margin-right: 40px;
            }
            .content{
              flex: 1;
              .name{
                font-size: 24px;
                line-height: 30px;
                color: rgba(0,0,0,0.85);
                margin-bottom: 8px;
              }
              .position{
                font-size: 14px;
                line-height: 16px;
                color: rgba(0,0,0,0.65);
                margin-bottom: 24px;
              }
              .desc{
                position: relative;
                font-size: 14px;
                color: rgba(0,0,0,0.85);
                line-height: 20px;
              }
            }
          }
        }
      }
      .investors-logo-list{
        max-width: 1190px;
        margin: 0 auto;
        ul{
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 60px;
          li{
            background-size: 100%;
            &.oak{
              width: 180px;
              height: 90px;
              background: url("~asset/images/corporate/OAK@3x.jpg");
              background-size: 100%;
            }
            &.clearvue{
              width: 256px;
              height: 89px;
              background: url("~asset/images/corporate/CLEARVUE@3x.jpg");
              background-size: 100%;
            }
            &.roads{
              width: 340px;
              height: 90px;
              background: url("~asset/images/corporate/ROADS@3x.jpg");
              background-size: 100%;
            }
            &.sbi{
              width: 112px;
              height: 96px;
              background: url("~asset/images/corporate/SBI@3x.jpg");
              background-size: 100%;
            }
            &.ktb{
              width: 102px;
              height: 85px;
              background: url("~asset/images/corporate/KTB@3x.jpg");
              background-size: 100%;
            }
            &.wishnut{
              width: 200px;
              height: 96px;
              background: url("~asset/images/corporate/WISENUT@3x.jpg");
              background-size: 100%;
            }
            &.soldorn{
              width: 97px;
              height: 80px;
              background: url("~asset/images/corporate/SOLBORN@3x.jpg");
              background-size: 100%;
            }
            &.jyp{
              width: 166px;
              height: 80px;
              background: url("~asset/images/corporate/JYP@3x.jpg");
              background-size: 100%;
            }
          }
        }
      }
    }
  }
</style>