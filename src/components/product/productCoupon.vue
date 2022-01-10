<template>
  <div class="product-coupon-container">
    <div class="product-coupon">
      <div class="coupon-card coupon-gear">
        <div class="coupon-info-left">
          <template v-if="$lang.langCode === 'N000920100'">
            <p class="price" v-if="defaultCoupon.reductionType == 1">
              <span>{{ Number(defaultCoupon.discount * 10).toFixed(2) }} 折</span>
              <span class="discount-price" v-if="defaultCoupon.isShowDiscountPrice">
                {{ $lang.afterCoupon }}
                {{ defaultCoupon.realPrice | money(currencySign) }}
              </span>
            </p>
            <p class="price" v-else>
              <span>立减 {{ defaultCoupon.reductionAmount | money(currencySign) }}</span>
              <span class="discount-price" v-if="defaultCoupon.isShowDiscountPrice">
                {{ $lang.afterCoupon }}
                {{ defaultCoupon.realPrice | money(currencySign) }}
              </span>
            </p>
          </template>
          <template v-else>
            <p class="price" v-if="defaultCoupon.reductionType == 1">
              <span>{{ ((1 - defaultCoupon.discount) * 100).toFixed() + '%' }} OFF</span>
              <span class="discount-price" v-if="defaultCoupon.isShowDiscountPrice">
                {{ $lang.afterCoupon }}
                {{ defaultCoupon.realPrice | money(currencySign) }}
              </span>
            </p>
            <p class="price" v-else>
              <span>{{ defaultCoupon.reductionAmount | money(currencySign) }} {{ $lang.activityOff }}</span>
              <span class="discount-price" v-if="defaultCoupon.isShowDiscountPrice">
                {{ $lang.afterCoupon }}
                {{ defaultCoupon.realPrice | money(currencySign) }}
              </span>
            </p>
          </template>
          <div class="limit-price">
            {{ $lang.couponOrderOver.replace('%@', defaultCoupon.formatOrderAmount) }}
            <popover v-if="defaultCoupon.isShowDiscountPrice" :isMobile="isMobile">
              <div class="discount-pop">
                <ul class="price-list">
                  <li class="price-item">
                    <span>{{ $lang.originalPrice }}</span>
                    <span>{{ price | money(currencySign) }}</span>
                  </li>
                  <li class="price-item">
                    <span>{{ $lang.discountPrice }}</span>
                    <span>{{ defaultCoupon.dicountPrice | money(currencySign) }}</span>
                  </li>
                  <li class="price-item">
                    <span>{{ $lang.couponPrice }}</span>
                    <span class="total-price">{{ defaultCoupon.realPrice | money(currencySign) }}</span>
                  </li>
                </ul>
                <p class="tips-text">{{ $lang.couponPriceTips }}</p>
              </div>
            </popover>
          </div>
        </div>
        <div class="coupon-info-right">
          <span class="copy-code" @click="copyShowCouponDialog(defaultCoupon.promoCode)">
            {{ $lang.copy }}
          </span>
        </div>
      </div>
      <div class="more-coupon"
           @mouseenter="isShowCouponList = true"
           @mouseleave="isShowCouponList = false">
        <span>{{ $lang.seeAll }}</span>
        <i class="el-icon-arrow-down" :class="{'active': isShowCouponList}"></i>
      </div>
      <div class="icon-block">
        <i class="el-icon-arrow-down" @click="isShowCouponList = true"></i>
      </div>
    </div>
    <div class="coupon-list-wrap"
         v-show="isShowCouponList"
         @mouseenter="isShowCouponList = true"
         @mouseleave="isShowCouponList = false">
      <p class="title">{{ $lang.couponPopTips }}</p>
      <ul class="coupon-list">
        <li class="coupon-card coupon-gear"
            v-for="(coupon, index) in productInfo.couponList"
            :key="index">
          <div class="coupon-info-left">
            <template v-if="$lang.langCode === 'N000920100'">
              <p class="price" v-if="coupon.reductionType == 1">
                <span>{{ Number(coupon.discount * 10).toFixed(2) }} 折</span>
                <span class="discount-price" v-if="coupon.isShowDiscountPrice">
                  {{ $lang.afterCoupon }}
                  {{ coupon.realPrice | money(currencySign) }}
                </span>
              </p>
              <p class="price" v-else>
                <span>立减 {{ coupon.reductionAmount | money(currencySign) }}</span>
                <span class="discount-price" v-if="coupon.isShowDiscountPrice">
                  {{ $lang.afterCoupon }}
                  {{ coupon.realPrice | money(currencySign) }}
                </span>
              </p>
            </template>
            <template v-else>
              <p class="price" v-if="coupon.reductionType == 1">
                <span>{{ ((1 - coupon.discount) * 100).toFixed() + '%' }} OFF</span>
                <span class="discount-price" v-if="coupon.isShowDiscountPrice">
                  {{ $lang.afterCoupon }}
                  {{ coupon.realPrice | money(currencySign) }}
                </span>
              </p>
              <p class="price" v-else>
                <span>{{ coupon.reductionAmount | money(currencySign) }} {{ $lang.activityOff }}</span>
                <span class="discount-price" v-if="coupon.isShowDiscountPrice">
                  {{ $lang.afterCoupon }}
                  {{ coupon.realPrice | money(currencySign) }}
                </span>
              </p>
            </template>
            <div class="limit-price">
              {{ $lang.couponOrderOver.replace('%@', coupon.formatOrderAmount) }}
              <popover :isMobile="isMobile" v-if="coupon.isShowDiscountPrice">
                <div class="discount-pop">
                  <ul class="price-list">
                    <li class="price-item">
                      <span>{{ $lang.originalPrice }}</span>
                      <span>{{ price | money(currencySign) }}</span>
                    </li>
                    <li class="price-item">
                      <span>{{ $lang.discountPrice }}</span>
                      <span>{{ coupon.dicountPrice | money(currencySign) }}</span>
                    </li>
                    <li class="price-item">
                      <span>{{ $lang.couponPrice }}</span>
                      <span class="total-price">{{ coupon.realPrice | money(currencySign) }}</span>
                    </li>
                  </ul>
                  <p class="tips-text">{{ $lang.couponPriceTips }}</p>
                </div>
              </popover>
            </div>
            <p class="coupon-time">
              <span>{{ $lang.couponTime }}：</span>
              <span>
                {{ coupon.startDate | parseTime('{m}.{d} {h}:{i}') }}
                ~
                {{ coupon.endDate | parseTime('{m}.{d} {h}:{i}') }}
                UTC+8
              </span>
            </p>
          </div>
          <div class="coupon-info-right" @click="copyShowCouponDialog(coupon.promoCode)">
            <p class="promo-code">{{ coupon.promoCode }}</p>
            <span class="copy-code">{{ $lang.copy }}</span>
          </div>
        </li>
      </ul>
    </div>
    <van-popup class="coupon-popup"
               v-model="isShowCouponList"
               :overlay="isShowCouponList && isMobile"
               position="bottom">
      <div class="coupon-list-wrap" v-show="isShowCouponList">
        <p class="title">{{ $lang.couponPopTips }}</p>
        <ul class="coupon-list">
          <li class="coupon-card coupon-gear"
              v-for="(coupon, index) in productInfo.couponList"
              :key="index">
            <div class="coupon-info-left">
              <template v-if="$lang.langCode === 'N000920100'">
                <p class="price" v-if="coupon.reductionType == 1">
                  <span>{{ Number(Number(coupon.discount * 10).toFixed(2)) }} 折</span>
                  <span class="discount-price" v-if="coupon.isShowDiscountPrice">
                    {{ $lang.afterCoupon }}
                    {{ coupon.realPrice | money(currencySign) }}
                  </span>
                </p>
                <p class="price" v-else>
                  <span>立减 {{ coupon.reductionAmount | money(currencySign) }}</span>
                  <span class="discount-price" v-if="coupon.isShowDiscountPrice">
                    {{ $lang.afterCoupon }}
                    {{ coupon.realPrice | money(currencySign) }}
                  </span>
                </p>
              </template>
              <template v-else>
                <p class="price" v-if="coupon.reductionType == 1">
                  <span>{{ ((1 - coupon.discount) * 100).toFixed() + '%' }} OFF</span>
                  <span class="discount-price" v-if="coupon.isShowDiscountPrice">
                    {{ $lang.afterCoupon }}
                    {{ coupon.realPrice | money(currencySign) }}
                  </span>
                </p>
                <p class="price" v-else>
                  <span>{{ coupon.reductionAmount | money(currencySign) }} {{ $lang.activityOff }}</span>
                  <span class="discount-price" v-if="coupon.isShowDiscountPrice">
                    {{ $lang.afterCoupon }}
                    {{ coupon.realPrice | money(currencySign) }}
                  </span>
                </p>
              </template>
              <div class="limit-price">
                {{ $lang.couponOrderOver.replace('%@', coupon.formatOrderAmount) }}
                <i class="icon-popover" v-if="coupon.isShowDiscountPrice" @click.stop="toggleMobileDiscountPop($event, coupon)"></i>
              </div>
              <p class="coupon-time">
                <span>{{ $lang.couponTime }}：</span>
                <span>
                  {{ coupon.startDate | parseTime('{m}.{d} {h}:{i}') }}
                  ~
                  {{ coupon.endDate | parseTime('{m}.{d} {h}:{i}') }}
                  UTC+8
                </span>
              </p>
            </div>
            <div class="coupon-info-right" @click="copyShowCouponDialog(coupon.promoCode)">
              <p class="promo-code">{{ coupon.promoCode }}</p>
              <span class="copy-code">{{ $lang.copy }}</span>
            </div>
          </li>
        </ul>
        <i class="el-icon-close" @click="isShowCouponList = false"></i>
      </div>
    </van-popup>
    <!--<van-dialog class="coupon-dialog-wrap"
                :closeOnClickOverlay="true"
                v-model="isShowCouponDialog"
                :showConfirmButton = "false">
      <div class="coupon-dialog">
        <p class="title">{{ $lang.couponTitle }}</p>
        <p class="code-text">{{ $lang.coupon }}</p>
        <p class="coupon-code">{{ couponCode }}</p>
        <p class="copy-text">{{ $lang.couponCopyText }}</p>
        <div class="copy-button" @click="closeDialog">{{ $lang.confirm }}</div>
      </div>
    </van-dialog>-->
    <div class="discount-pop"
         :style="{ ...popStyle }"
         v-show="isShowMobileDiscountPop">
      <ul class="price-list">
        <li class="price-item">
          <span>{{ $lang.originalPrice }}</span>
          <span>{{ price | money(currencySign) }}</span>
        </li>
        <li class="price-item">
          <span>{{ $lang.discountPrice }}</span>
          <span>{{ popCoupon.dicountPrice | money(currencySign) }}</span>
        </li>
        <li class="price-item">
          <span>{{ $lang.couponPrice }}</span>
          <span class="total-price">{{ popCoupon.realPrice | money(currencySign) }}</span>
        </li>
      </ul>
      <p class="tips-text">{{ $lang.couponPriceTips }}</p>
    </div>
  </div>
</template>

<script>
  import {
    copyContent,
    moneyFormat
  } from 'framework/utils/utils';
  import popover from '../common/popover';
  export default {
    name: 'productCoupon',
    props: ['productInfo', 'currencySign', 'isMobile', 'price'],
    components: {
      popover
    },
    data() {
      return {
        defaultCoupon: {},
        isShowCouponList: false, // 是否显示优惠券列表
        isShowCouponDialog: false, // 是否显示优惠券复制弹窗
        couponCode: '', // 优惠码
        isShowMobileDiscountPop: false, // 移动端折扣信息弹窗
        popStyle: {}, // mobile窗口样式
        popCoupon: {}, // mobile端气泡优惠券信息
      };
    },
    created() {
      this.calcCoupon();
    },
    watch: {
      price() {
        this.calcCoupon();
      }
      // 'productInfo.couponList': {
      //   handler(newVal) {
      //     if (newVal && Array.isArray(newVal) && newVal.length > 0) {
      //       newVal.forEach(item => {
      //         if (this.price >= item.orderAmount) {
      //           item.isShowDiscountPrice = true;
      //           if (item.reductionType == 1) {
      //             item.realPrice = this.price * item.discount;
      //             item.dicountPrice = this.price - item.realPrice;
      //           } else {
      //             item.realPrice = this.price - item.reductionAmount;
      //             item.dicountPrice = item.reductionAmount;
      //           }
      //         } else {
      //           item.isShowDiscountPrice = false;
      //         }
      //         item.formatOrderAmount = moneyFormat(item.orderAmount, this.currencySign);
      //       });
      //       this.defaultCoupon = newVal[0];
      //     }
      //   },
      //   immediate: true
      // }
    },
    mounted() {
      window.addEventListener('click', () => {
        this.isShowMobileDiscountPop = false;
      });
    },
    methods: {
      // 计算优惠券优惠金额和货币转换
      calcCoupon() {
        const list = this.productInfo.couponList;
        if (list && Array.isArray(list) && list.length > 0) {
          list.forEach(item => {
            if (this.price >= item.orderAmount) {
              item.isShowDiscountPrice = true;
              if (item.reductionType == 1) {
                item.realPrice = this.price * item.discount;
                item.dicountPrice = this.price - item.realPrice;
              } else {
                item.realPrice = this.price - item.reductionAmount;
                item.dicountPrice = item.reductionAmount;
              }
            } else {
              item.isShowDiscountPrice = false;
            }
            item.formatOrderAmount = moneyFormat(item.orderAmount, this.currencySign);
          });
          this.defaultCoupon = list[0];
        }
      },
      /**
       * @Description: 复制优惠码
       * @date 2020/1/9
       */
      copyShowCouponDialog(code) {
        this.couponCode = code;
        // this.isShowCouponDialog = true;
        this.isShowCouponList = false;
        copyContent(code).then(() => {
          this.$toast(this.$lang.couponCopySuccess);
        });
      },
      closeDialog() {
        this.isShowCouponDialog = false;
        this.isShowCouponList = false;
      },
      toggleMobileDiscountPop($event, coupon) {
        this.popStyle = {
          top: `${$event.clientY}px`
        };
        this.popCoupon = coupon;
        this.isShowMobileDiscountPop = true;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "~asset/scss/common.scss";
  @media only screen and (max-width: 1023px) {
    .product-coupon-container{
      position: relative;
      font-size: r(12);
      margin-top: r(8);
      .coupon-card{
        min-width: r(300);
        display: flex;
        align-items: stretch;
        position: relative;
        color: #fff;
        .coupon-info-left{
          flex: 1;
          padding: r(8);
          border-radius: 0 r(4) r(4) 0;
          background: linear-gradient(90deg, #FF5224 0%, #FF5D5D 100%);
          .price{
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            font-size: r(14);
            font-weight: 600;
            >span{
              margin-bottom: r(6);
            }
            >span:first-child{
              margin-right: r(8);
            }
            .discount-price{
              padding: r(2) r(4);
              font-size: r(12);
              line-height: 1;
              font-weight: 500;
              color: #FF5224;
              background: #FFEFEB;
              border-radius: r(3);
            }
          }
          .limit-price{
            display: flex;
            align-items: center;
            font-size: r(12);
            .icon-popover{
              display: block;
              width: r(12);
              height: r(12);
              background-image: url("~asset/images/wap/icon-popover.png");
              background-size: 100%;
              margin-left: r(4);
            }
          }
        }
        .coupon-info-right{
          width: r(60);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 r(12);
          border-left: 1px dashed #fff;
          border-radius: r(4) 0 0 r(4);
          background: linear-gradient(90deg, #FF5D5D 0%, #FF5224 100%);
        }
      }
      .coupon-gear{
        position: relative;
        margin: 0 r(2);
        &:before{
          content: '';
          width: r(2);
          height: 100%;
          position: absolute;
          left: r(-2);
          background-image: url("~asset/images/wap/coupon-left@2x.png");
          background-size: r(2) 100%;
        }
        &:after{
          content: '';
          width: r(2);
          height: 100%;
          position: absolute;
          right: r(-2);
          background-image: url("~asset/images/wap/coupon-right@2x.png");
          background-size: r(2) 100%;
        }
      }
      .copy-code{
        padding: 0 r(8);
        text-align: center;
        line-height: r(16);
        border-radius: r(8);
        background: #fff;
        color: rgba(0, 0, 0, 0.65);
        cursor: pointer;
      }
      .product-coupon{
        display: flex;
        align-items: stretch;
        .more-coupon{
          display: none;
        }
        .icon-block{
          display: flex;
          align-items: center;
          padding: 0 r(16);
          .el-icon-arrow-down{
            color: rgba(0, 0, 0, 0.85);
            font-size: r(15);
          }
        }
      }
      .coupon-list-wrap{
        display: none;
      }
      .popover-container{
        margin-left: r(4);
        .discount-pop{
          position: static;
          transform: translate3d(0, 0, 0);
          padding: r(4);
          box-shadow: none;
        }
      }
    }
    .coupon-popup{
      max-height: 80vh;
      box-sizing: border-box;
      left: 0;
      transform: translate3d(0, 0, 0);
      border-radius: r(8) r(8) 0 0;
      overflow: hidden;
      .coupon-list-wrap{
        display: block;
        padding: r(32) r(12);
        .title{
          font-size: r(12);
          color: rgba(0, 0, 0, 0.45);
          line-height: r(17);
          margin-bottom: r(8);
        }
        .coupon-list{
          max-height: calc(80vh - 2.18rem);
          overflow-y: auto;
        }
        .coupon-card{
          +.coupon-card{
            margin-top: r(8);
          }
          .coupon-info-left{
            flex: 1;
            .coupon-time{
              font-size: r(12);
              color: rgba(255, 255, 255, 0.8);
              line-height: r(16);
              margin-top: r(6);
            }
          }
          .coupon-info-right{
            width: r(90);
            flex-direction: column;
            justify-content: center;
            .promo-code{
              font-size: r(12);
              font-weight: 600;
              color: #FFFFFF;
              line-height: r(16);
              margin-bottom: r(6);
            }
          }
        }
        .el-icon-close{
          position: absolute;
          font-size: r(18);
          top: r(12);
          right: r(12);
          color: #D8D8D8;
        }
      }
    }
    .coupon-dialog-wrap.van-dialog{
      .coupon-dialog{
        padding: r(32) r(16);
        text-align: center;
        .title{
          font-size: r(20);
          font-weight: 600;
          color: rgba(0,0,0,0.85);
          line-height: r(28);
          margin-bottom: r(24);
        }
        .code-text{
          font-size: r(14);
          color: rgba(0,0,0,0.45);
          line-height: r(20);
          margin-bottom: r(4);
        }
        .coupon-code{
          font-size: r(20);
          color: $mainColor;
          line-height: r(24);
          margin-bottom: r(16);
        }
        .copy-text{
          font-size: r(12);
          color: rgba(0,0,0,0.85);
          line-height: r(16);
          margin-bottom: r(16);
        }
        .copy-button{
          height: r(44);
          line-height: r(44);
          font-size: r(16);
          cursor: pointer;
          margin: 0 r(32);
          @include btn-gradient();
        }
      }
    }
    .discount-pop{
      position: fixed;
      left: 0;
      right: 0;
      margin: 0 auto;
      transform: translateY(-110%);
      z-index: 9999;
      width: r(250);
      padding: r(8) r(12);
      background-color: #fff;
      box-shadow: 0 r(2) r(4) 0 rgba(0, 0, 0, 0.11);
      border-radius: r(8);
      .price-list{
        margin-bottom: r(8);
        .price-item{
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: r(14);
          color: rgba(0, 0, 0, 0.85);
          line-height: r(20);
          +.price-item{
            margin-top: r(2);
          }
          >span:last-child{
            flex-shrink: 0;
            align-self: flex-start;
          }
          .total-price{
            font-weight: 600;
          }
        }
      }
      .tips-text{
        font-size: r(12);
        color: rgba(0, 0, 0, 0.45);
        line-height: r(17);
      }
    }
  }
  @media only screen and (min-width: 1024px) {
    .product-coupon-container{
      margin: 12px 0;
      position: relative;
      display: flex;
      align-items: center;
      font-size: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid #EAEAEA;
      .coupon-card{
        display: flex;
        align-items: stretch;
        position: relative;
        color: #fff;
        .coupon-info-left{
          padding: 8px;
          border-radius: 0 4px 4px 0;
          background: linear-gradient(90deg, #FF5224 0%, #FF5D5D 100%);
          .price{
            display: flex;
            align-items: center;
            font-size: 14px;
            font-weight: 600;
            .discount-price{
              padding: 2px 4px;
              font-size: 12px;
              line-height: 1;
              font-weight: 500;
              color: #FF5224;
              background: #FFEFEB;
              border-radius: 3px;
              margin-left: 8px;
            }
          }
          .limit-price{
            display: flex;
            align-items: center;
            font-size: 12px;
            margin-top: 6px;
            .popover-container{
              margin-left: 4px;
            }
          }
        }
        .coupon-info-right{
          display: flex;
          align-items: center;
          padding: 0 12px;
          border-left: 1px dashed #fff;
          border-radius: 4px 0 0 4px;
          background: linear-gradient(90deg, #FF5D5D 0%, #FF5224 100%);
        }
      }
      .coupon-gear{
        position: relative;
        margin: 0 2px;
        &:before{
          content: '';
          width: 2px;
          height: 100%;
          position: absolute;
          left: -2px;
          background-image: url("~asset/images/wap/coupon-left@2x.png");
          background-size: 2px 100%;
        }
        &:after{
          content: '';
          width: 2px;
          height: 100%;
          position: absolute;
          right: -2px;
          background-image: url("~asset/images/wap/coupon-right@2x.png");
          background-size: 2px 100%;
        }
      }
      .copy-code{
        padding: 0 8px;
        text-align: center;
        line-height: 16px;
        border-radius: 8px;
        background: #fff;
        color: rgba(0, 0, 0, 0.65);
        cursor: pointer;
      }
      .product-coupon{
        display: flex;
        align-items: stretch;
        .more-coupon{
          position: relative;
          display: flex;
          align-items: center;
          font-size: 13px;
          color: rgba(0, 0, 0, 0.85);
          cursor: pointer;
          margin-left: 12px;
          .el-icon-arrow-down{
            color: rgba(0, 0, 0, 0.85);
            font-size: 15px;
            transition: all .2s ease-in-out;
            margin-left: 4px;
            &.active{
              transform: rotate(180deg);
            }
          }
        }
        .icon-block{
          display: none;
        }
      }
      .coupon-list-wrap{
        width: 440px;
        box-sizing: border-box;
        position: absolute;
        top: 72px;
        left: 0;
        padding: 12px;
        background-color: #fff;
        z-index: 10;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        &:before{
          content: '';
          position: absolute;
          top: -24px;
          left: 0;
          display: block;
          width: 100%;
          height: 24px;
        }
        .title{
          font-size: 12px;
          color: rgba(0, 0, 0, 0.45);
          line-height: 17px;
          margin-bottom: 8px;
        }
        .coupon-card{
          +.coupon-card{
            margin-top: 8px;
          }
          .coupon-info-left{
            flex: 1;
            .coupon-time{
              font-size: 12px;
              color: rgba(255, 255, 255, 0.8);
              line-height: 16px;
              margin-top: 6px;
            }
          }
          .coupon-info-right{
            flex-shrink: 0;
            width: 100px;
            flex-direction: column;
            justify-content: center;
            .promo-code{
              font-size: 12px;
              font-weight: 600;
              color: #FFFFFF;
              line-height: 14px;
              margin-bottom: 6px;
            }
          }
        }
      }
      .discount-pop{
        width: 200px;
        padding: 8px 12px;
        .price-list{
          margin-bottom: 8px;
          .price-item{
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.85);
            line-height: 20px;
            +.price-item{
              margin-top: 2px;
            }
            >span:last-child{
              flex-shrink: 0;
              align-self: flex-start;
            }
            .total-price{
              font-weight: 600;
            }
          }
        }
        .tips-text{
          font-size: 12px;
          color: rgba(0, 0, 0, 0.45);
          line-height: 17px;
        }
      }
    }
    .coupon-popup{
      display: none;
    }
    .coupon-dialog-wrap.van-dialog{
      width: auto;
      max-width: max-content;
      font-size: 14px;
      .coupon-dialog{
        width: 460px;
        text-align: center;
        .title{
          font-size: 24px;
          font-weight: 600;
          color: rgba(0,0,0,0.85);
          line-height: 33px;
          margin-bottom: 32px;
        }
        .code-text{
          font-size: 14px;
          color: rgba(0,0,0,0.45);
          line-height: 20px;
          margin-bottom: 4px;
        }
        .coupon-code{
          font-size: 20px;
          color: $mainColor;
          line-height: 24px;
          margin-bottom: 16px;
        }
        .copy-text{
          font-size: 12px;
          color: rgba(0,0,0,0.85);
          line-height: 16px;
          margin-bottom: 24px;
        }
        .copy-button{
          width: 220px;
          height: 44px;
          line-height: 44px;
          font-size: 16px;
          cursor: pointer;
          margin: 0 auto;
          @include btn-gradient();
        }
      }
    }
  }
</style>