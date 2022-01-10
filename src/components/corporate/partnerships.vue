<template>
  <div class="component-partnerships">
    <div class="partnerships-title">{{ $lang.corporateContent.ourPartners }}</div>
    <div class="partnerships-sub-title">{{ $lang.corporateContent.overOrders }}</div>
    <div class="banner">
      <div class="map"></div>
      <p class="banner-warehouses">136 {{ $lang.corporateContent.warehouses }}</p>
      <p class="banner-logistics">64 {{ $lang.corporateContent.logisticsPartners }}</p>
    </div>
    <div class="brand-wrap" v-if="$root.countryId != 1">
      <p class="brand-title">{{ $lang.corporateContent.brandTitle }}</p>
      <ul class="brand-list">
        <li v-for="item in brandList">
          <img :src="item" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'partnerships',
    data() {
      return {
        brandList: [
          require('asset/images/corporate/brand/brands3-logo_22.jpg'),
          require('asset/images/corporate/brand/brands3-logo_02.jpg'),
          require('asset/images/corporate/brand/brands3-logo_03.jpg'),
          require('asset/images/corporate/brand/brands3-logo_04.jpg'),
          require('asset/images/corporate/brand/brands3-logo_05.jpg'),
          require('asset/images/corporate/brand/brands3-logo_06.jpg'),
          require('asset/images/corporate/brand/brands3-logo_07.jpg'),
          require('asset/images/corporate/brand/brands3-logo_08.jpg'),
          require('asset/images/corporate/brand/brands3-logo_09.jpg'),
          require('asset/images/corporate/brand/brands3-logo_10.jpg'),
          require('asset/images/corporate/brand/brands3-logo_11.jpg'),
          require('asset/images/corporate/brand/brands3-logo_12.jpg'),
          require('asset/images/corporate/brand/brands3-logo_13.jpg'),
          require('asset/images/corporate/brand/brands3-logo_14.jpg'),
          require('asset/images/corporate/brand/brands3-logo_15.jpg'),
          require('asset/images/corporate/brand/brands3-logo_16.jpg'),
          require('asset/images/corporate/brand/brands3-logo_17.jpg'),
          require('asset/images/corporate/brand/brands3-logo_21.jpg'),
          require('asset/images/corporate/brand/brands3-logo_19.jpg'),
          require('asset/images/corporate/brand/brands3-logo_20.jpg'),
        ]
      };
    },
    mounted() {
    }
  };
</script>

<style lang="scss" scoped>
  @import "~asset/scss/base.scss";

  @media only screen and (max-width: 1023px){
    .component-partnerships{
      padding-bottom: r(16);
      .partnerships-title{
        margin: r(40) 0 r(15);
        text-align: center;
        font-size: r(36);
        line-height: r(43);
        color: rgba(0,0,0,0.85);
      }
      .partnerships-sub-title{
        width: r(200);
        margin: 0 auto r(20);
        font-size: r(16);
        line-height: r(20);
        text-align: center;
        color: rgba(0,0,0,0.65);
      }
      .banner{
        position: relative;
        width: 100%;
        padding: 0 r(16);
        box-sizing: border-box;
        .map{
          width: 100%;
          padding-top: 52%;
          @include bg-image-pc('corporate/map');
        }
        .banner-warehouses{
          position: relative;
          display: inline-block;
          font-size: r(12);
          line-height: r(14);
          color: #F37232;
          margin-left: r(42);
          &:after{
            content: '';
            display: block;
            width: r(8);
            height: r(8);
            border-radius: 50%;
            background-color: #F37232;
            position: absolute;
            left: r(-12);
            top: r(2);
          }
        }
        .banner-logistics{
          position: relative;
          display: inline-block;
          font-size: r(12);
          line-height: r(14);
          color: #1BA1DB;
          float: right;
          margin-right: r(24);
          &:after{
            content: '';
            display: block;
            width: r(8);
            height: r(8);
            border-radius: 50%;
            background-color: #1BA1DB;
            position: absolute;
            left: r(-12);
            top: r(2);
          }
        }
      }
      .brand-wrap{
        margin-top: r(36);
        .brand-title{
          width: r(240);
          font-size: r(16);
          line-height: r(19);
          margin: 0 auto;
          text-align: center;
          color: rgba(0,0,0,0.65);
        }
        .brand-list{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          margin: r(32) r(16);
          li{
            width: 33%;
            height: r(66);
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: r(16);
            img{
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
      }
    }
  }

  @media only screen and (min-width: 1024px){
    .component-partnerships{
      .partnerships-title{
        margin: 80px auto 32px;
        text-align: center;
        font-size: 56px;
        line-height: 78px;
        color: rgba(0,0,0,0.85);
      }
      .partnerships-sub-title{
        font-size: 17px;
        line-height: 20px;
        color: rgba(0,0,0,0.65);
        text-align: center;
        margin-bottom: 26px;
      }
      .banner{
        position: relative;
        max-width: 1190px;
        margin: 40px auto;
        .map{
          width: 100%;
          padding-top: 47%;
          @include bg-image-pc('corporate/map');
        }
        .banner-warehouses{
          position: absolute;
          top: 75%;
          left: 59%;
          font-size: 16px;
          line-height: 19px;
          color: #F37232;
          &:after{
            content: '';
            display: block;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: #F37232;
            position: absolute;
            left: -24px;
            top: 2px;
          }
        }
        .banner-logistics{
          position: absolute;
          top: 82%;
          left: 59%;
          font-size: 16px;
          line-height: 19px;
          color: #1BA1DB;
          &:after{
            content: '';
            display: block;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: #1BA1DB;
            position: absolute;
            left: -24px;
            top: 2px;
          }
        }
      }
      .brand-wrap{
        padding: 40px 0 80px;
        .brand-title{
          font-size: 24px;
          line-height: 29px;
          text-align: center;
          color: rgba(0,0,0,0.85);
          margin-bottom: 42px;
        }
        .brand-list{
          max-width: 1040px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          li{
            width: 20%;
            height: 110px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 60px;
            img{
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
      }
    }
  }
</style>