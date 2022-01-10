<template>
  <div class="product-content">
    <a :href="`/${$root.countryCode}/product/detail/${productInfo.spu_id}`"
       target="_blank"
       class="link-product">
      <div class="img-content">
        <img v-lazy="productInfo.goods_image" :key="productInfo.goods_image" alt>
        <div v-show="productInfo.goods_storage == 0" class="product-soldout">
          {{ $lang.soldOut }}
        </div>
      </div>
      <div class="title-info">
        <div class="brandBox">
          <!--<img class="country-icon" :src="productInfo.countryIcon" alt>-->
          <span class="brand-info">{{ productInfo.brand_name }}</span>
        </div>
        <span class="product-info"
              :title="productInfo.goods_name">
          {{ productInfo.goods_name }}
        </span>
      </div>
      <div class="price-info"
           v-if="productInfo.goods_state == 1">
        <p class="real-price-discount has-discount">
          <span>
            {{ productInfo.goods_price | money(productInfo.currency) }}
          </span>
          <span class="discount" v-if="productInfo.goods_marketprice != productInfo.goods_price">
            {{ ((productInfo.goods_marketprice - productInfo.goods_price) / productInfo.goods_marketprice * 100).toFixed() + '%' }}
            {{ $lang.activityOff }}
          </span>
        </p>
        <p class="sale-price">
          <template v-if="productInfo.goods_marketprice != productInfo.goods_price">
            {{ productInfo.goods_marketprice | money(productInfo.currency) }}
          </template>
        </p>
      </div>
      <div class="price-info unavailable" v-else>{{ $lang.priceUnavailable }}</div>
      <div class="rate-wrap">
        <div class="rate-box" v-if="productInfo.evaluation_good_star != 0">
          <el-rate v-model="productInfo.evaluation_good_star" disabled ></el-rate>
          <span class="review-num">{{ productInfo.evaluation }}</span>
        </div>
      </div>
      <div class="store-wrap">
        <a class="store-link" :class="{'has-store': productInfo.store_id}"
           :href="productInfo.storeId ? `/${$root.countryCode}/store/${productInfo.store_id}` : false">
          <i class="icon-store"></i>
          <span class="store-name">
          {{ productInfo.store_name || 'Gshopper' }}
        </span>
          <i class="el-icon-arrow-right" v-if="productInfo.store_id"></i>
        </a>
      </div>
    </a>
    <slot></slot>
  </div>
</template>
<script>
  import { getCookie } from "../../framework/utils/utils";
  import { tag } from 'framework/utils/config';

  export default {
    props: {
      productInfo: {
        type: Object,
        default: []
      },
    },
    computed: {
    },
    data() {
      return {
        login: false,
        tagCode: tag,
      };
    },
    beforeMount() {},
    mounted() {
      this.login = !!getCookie('Auth-Token');
    },
  };
</script>
<style lang="scss" scoped>
  @import "~asset/scss/base.scss";

  .product-content {
    position: relative;
    height: auto !important;
    .link-product {
      width: 100%;
      height: 100%;
      display: block;
      background: #ffffff;
      box-shadow: 0 0 r(2) 0 rgba(0, 0, 0, 0.1);
      border-radius: r(4);
      padding: r(8);
      box-sizing: border-box;
      position: relative;
    }

    .img-content {
      width: r(150);
      height: r(150);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin: 0 auto;

      img {
        max-width: 100%;
        max-height: 100%;
      }

      .product-soldout {
        position: absolute;
        left: r(-6);
        bottom: r(4);
        width: r(73);
        height: r(24);
        line-height: r(24);
        opacity: 0.94;
        background-color: rgba(219, 224, 234, 0.8);
        border-radius: 4px;
        color: #666666;
        text-align: center;
        font-size: r(13);
        font-weight: 500;
      }
    }

    .brandBox {
      display: flex;
      margin-top: r(10);
      height: 16px;
      align-items: center;

      .img-bg {
        display: inline-block;
        width: 24px;
        height: 17px;
        background: url("//ws.izenecdn.com/cms/library/flags/all-country-flags.png")
        no-repeat 0 0;
        background-size: 24px 3876px;
        vertical-align: middle;
        overflow: hidden;
        border: r(1) solid rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
      }

      .country-icon {
        width: 16px;
        height: 16px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 8px;
      }

      .brand-info {
        font-size: r(13);
        color: #666666;
      }
    }

    .rate-wrap {
      margin-top: r(6);
      height: r(15);
      .rate-box{
        display: flex;
        align-items: center;
      }
      /deep/ .el-rate{
        height: auto;
        .el-icon-star-on{
          font-size: r(14);
          margin-right: 0;
        }
      }
    }

    .product-info {
      margin-top: r(6);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      line-height: r(16);
      height: r(32);
      font-size: r(13);
      color: #000000;
      font-weight: 600;
    }
    .price-info {
      margin-top: r(8);
      .real-price-discount{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: r(8);
        font-size: r(16);
        line-height: r(16);
        color: rgba(0, 0, 0, 0.85);
        font-weight: 600;
        &.has-discount{
          color: $mainColor;
          .discount{
            flex-shrink: 0;
            display: flex;
            align-items: center;
            height: r(14);
            font-weight: normal;
            font-size: r(12);
            line-height: 1;
            color: #fff;
            margin-left: r(8);
            padding: r(1) r(4);
            background: linear-gradient(270deg, #FF1269 0%, #FF5050 100%);
            opacity: 0.89;
            border-radius: r(2);
            .icon-save{
              width: r(6);
              height: r(10);
              margin-left: r(4);
              @include bg-image('icon-save');
            }
          }
        }
      }
      .sale-price{
        font-size: r(12);
        line-height: r(12);
        height: r(12);
        color: rgba(0, 0, 0, 0.45);
        margin-top: r(4);
        text-decoration: line-through;
      }
      &.unavailable{
        font-size: r(14);
        line-height: r(17);
        height: r(34);
        color: rgba(0,0,0,0.45);
      }
    }
  }

  @media only screen and (max-width: 1023px) {
    .review-num {
      font-weight: normal;
      font-size: r(13);
      color: rgba(0, 0, 0, 0.35);
      margin-left: r(4);
    }
    .store-wrap{
      margin-top: r(6);
      .store-link{
        display: inline-flex;
        align-items: center;
        height: r(17);
        .icon-store{
          display: inline-block;
          width: r(12);
          height: r(12);
          @include bg-image('icon-store');
          vertical-align: bottom;
          flex-shrink: 0;
        }
        .store-name, .el-icon-arrow-right{
          @include multipleEllipsis(1);
          font-size: r(12);
          line-height: r(17);
          color: rgba(0, 0, 0, 0.45);
          margin-left: r(4);
        }
        .el-icon-arrow-right{
          flex-shrink: 0;
        }
      }
    }
    .coupon-text{
      margin-top: r(6);
      display: inline-block;
      font-size: r(12);
      height: r(16);
      line-height: r(16);
      padding: 0 r(8);
      color: $mainColor;
      border: 1px solid $mainColor;
      border-radius: 8px;
      overflow: hidden;
    }
  }
  @media only screen and (min-width: 1024px) {
    .product-content {
      position: relative;
      z-index: 8;
      border-bottom: 1px solid #efefef;
      .link-product {
        width: 100%;
        height: 100%;
        display: block;
        background: #ffffff;
        padding: 12px;
        box-sizing: border-box;
        position: relative;
        box-shadow: none;
        border-radius: 4px;
        transition: box-shadow 0.4s cubic-bezier(0.73, 0.005, 0.22, 1);
        &:hover{
          box-shadow: 0 2px 8px 0 rgba(200,201,204,0.5);
          border-radius: 4px;
        }
      }

      .img-content {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin: 0 auto;
        height: auto;
        /*height: 4.5rem;*/
        padding-top: 100%;
        img {
          max-width: 100%;
          max-height: 100%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .product-soldout {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 76px;
          height: 24px;
          line-height: 24px;
          opacity: 0.94;
          // background-color: dodgerblue;
          border-radius: 4px;
          // color: #ffffff;
          text-align: center;
          font-size: 12px;
          font-weight: 500;
        }
      }

      .brandBox {
        display: flex;
        margin-top: 10px;
        height: 17px;
        align-items: center;

        .img-bg {
          display: inline-block;
          width: 24px;
          height: 17px;
          background: url("//ws.izenecdn.com/cms/library/flags/all-country-flags.png")
          no-repeat 0 0;
          background-size: 24px 3876px;
          vertical-align: middle;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.2);
          box-sizing: border-box;
        }

        .brand-info {
          font-size: 13px;
          color: #666666;
        }
      }

      .rate-wrap {
        margin-top: 6px;
        height: 15px;
        /deep/ .el-rate{
          height: auto;
          .el-icon-star-on{
            font-size: 14px;
            margin-right: 0;
          }
        }
        .review-num{
          font-size: 13px;
          color: rgba(0,0,0,.35);
          margin-left: 6px;
        }
      }
      .product-info {
        margin-top: 4px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-height: 20px;
        height: 40px;
        font-size: 14px;
        color: #000000;
        font-weight: normal;
      }
      .price-info {
        margin-top: 8px;
        .real-price-discount {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-top: 8px;
          font-size: 18px;
          line-height: 18px;
          color: rgba(0, 0, 0, 0.85);
          font-weight: 600;
          &.has-discount{
            color: $mainColor;
            .discount{
              display: flex;
              align-items: center;
              height: 14px;
              font-weight: normal;
              font-size: 12px;
              line-height: 1;
              color: #fff;
              margin-left: 12px;
              padding: 1px 4px;
              background: linear-gradient(270deg, #FF1269 0%, #FF5050 100%);
              opacity: 0.89;
              border-radius: 2px;
              .icon-save{
                width: 6px;
                height: 10px;
                margin-left: 4px;
                @include bg-image('icon-save');
              }
            }
          }
        }
        .sale-price{
          font-size: 12px;
          line-height: 12px;
          height: 12px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 4px;
          text-decoration: line-through;
        }
        &.unavailable{
          font-size: 15px;
          line-height: 17px;
          height: 34px;
          color: rgba(0,0,0,0.45);
        }
      }
      &:hover {
        .product-info {
          color: $mainColor;
        }
        background: #ffffff;
        z-index: 9;
      }
      .store-wrap{
        margin-top: 8px;
        .store-link{
          display: inline-flex;
          align-items: center;
          height: 17px;
          .icon-store{
            flex-shrink: 0;
            display: inline-block;
            width: 12px;
            height: 12px;
            @include bg-image('icon-store');
            vertical-align: bottom;
          }
          .store-name, .el-icon-arrow-right{
            @include multipleEllipsis(1);
            font-size: 12px;
            line-height: 17px;
            color: rgba(0, 0, 0, 0.45);
            margin-left: 4px;
          }
          .el-icon-arrow-right{
            flex-shrink: 0;
          }
          &.has-store{
            &:hover{
              .store-name, .el-icon-arrow-right{
                color: $mainColor;
              }
            }
          }
        }
      }
      .coupon-text{
        margin-top: 6px;
        display: inline-block;
        font-size: 12px;
        height: 16px;
        line-height: 16px;
        padding: 0 8px;
        color: $mainColor;
        border: 1px solid $mainColor;
        border-radius: 8px;
        overflow: hidden;
      }
    }
  }
</style>