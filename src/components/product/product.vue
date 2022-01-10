<template>
  <div class="product-content">
    <!-- <div v-show="wish && stock > 0 && productInfo.price != 0 && productInfo.canSale && productInfo.comeFrom != 1"
         class="wish-status"
         :class="{active: isWish}"
         @click="addWish"
         :data-attr="tagCode.listAddwish"></div> -->
    <a
      :href="`/${$root.countryCode}/product/detail/${productInfo.spuId}`"
      target="_blank"
      class="link-product"
      :data-searchId="searchId"
      :data-spuId="productInfo.spuId"
      :data-countryId="countryId"
    >
      <div class="img-content">
        <img v-lazy="productInfo.thumbnail" :key="productInfo.thumbnail" alt>
        <div v-show="stock != 1" class="product-soldout">{{$lang.soldOut}}</div>
      </div>
      <div class="title-info">
        <div class="brandBox" @click="toBrandDetail(productInfo.brandId, $event)">
          <img class="country-icon" :src="productInfo.countryIcon" alt>
          <span class="brand-info">{{productInfo.brandName}}</span>
        </div>
        <span class="product-info" :title="productInfo.spuName">{{productInfo.spuName}}</span>
      </div>
      <div class="price-info" v-if="productInfo.price && productInfo.price != 0">
        <p class="real-price-discount has-discount">
          <span>
            {{ productInfo.price | money(productInfo.currencySign) }}
          </span>
          <span class="discount" v-if="productInfo.discount">
            {{ (productInfo.discount * 100).toFixed() + '%' }}
            {{ $lang.activityOff }}
              <!--<i class="icon-save"></i>-->
          </span>
        </p>
        <p class="sale-price">
          <template v-if="productInfo.discount">
            {{ productInfo.beforeDiscountPrice | money(productInfo.currencySign) }}
          </template>
        </p>
      </div>
      <!--<div class="price-info" v-else>{{productInfo.currencySign}} 0</div>-->
      <div class="price-info unavailable" v-else>{{ $lang.priceUnavailable }}</div>
      <div class="rate-wrap">
        <template v-if="rate != 0">
          <div class="rate-box">
            <el-rate v-model="rate" disabled></el-rate>
            <span class="review-num">{{review}}</span>
          </div>
        </template>
      </div>
      <div class="store-wrap">
        <div class="store-link" :class="{'has-store': productInfo.storeId}"
             @click="toStoreDetail(productInfo.storeId, $event)">
          <i class="icon-store"></i>
          <span class="store-name">
            {{ productInfo.storeCompanyName || $lang.gshopperOfficialStore }}
          </span>
          <i class="el-icon-arrow-right" v-if="productInfo.storeId"></i>
        </div>
      </div>
      <div class="coupon-text" v-if="productInfo.cmsPromoCodeList && productInfo.cmsPromoCodeList.length > 0 && productInfo.comeFrom != 1">
        <template v-if="$lang.langCode === 'N000920100'">
            <span v-if="productInfo.cmsPromoCodeList[0].reductionType == 1">
              {{ (productInfo.cmsPromoCodeList[0].discount * 100).toFixed() }} 折
            </span>
          <span v-else>立减 {{ `${currencySign}${productInfo.cmsPromoCodeList[0].reductionAmount}` }}</span>
          <span>{{ $lang.coupons }}</span>
        </template>
        <template v-else>
          <span v-if="productInfo.cmsPromoCodeList[0].reductionType == 1">{{ ((1 - productInfo.cmsPromoCodeList[0].discount) * 100).toFixed() + '%' }} OFF</span>
          <span v-else>{{ `${currencySign} ${productInfo.cmsPromoCodeList[0].reductionAmount}` }} {{ $lang.activityOff }}</span>
          <span>{{ $lang.coupons }}</span>
        </template>
      </div>
    </a>
  </div>
</template>
<script>
import { filterStr, getCookie, qsToobj } from "../../framework/utils/utils";
import { mapGetters, mapActions } from 'vuex';
import { tag } from 'framework/utils/config';

export default {
  props: {
    productInfo: {
      type: Object,
      default: []
    },
    rate: {
      type: Number,
      default: 0
    },
    review: {
      type: Number,
      default: 0
    },
    stock: {
      type: Number,
      default: 1
    },
    currencySign: {
      type: String
    },
    currencyCode: {
      type: String
    },
    // wish: {
    //   type: Boolean,
    //   default: true
    // },
    searchId: {
      type: String,
      default: ''
    },
  },
  computed: {
    // ...mapGetters(['wishList', 'localWishList']),
    farmatSpuName() {
      if (!this.productInfo.spuName) {
        return "";
      } else {
        return filterStr(this.productInfo.spuName);
      }
    },
  },
  data() {
    return {
      type: "",
      isFloor: false,
      currentUrl: "",
      isWish: false,
      login: false,
      tagCode: tag,
      countryId: '',
    };
  },
  created() {
    this.countryId = this.$root.countryId;
  },
  beforeMount() {},
  mounted() {
    const lastUrl = window.location.pathname;
    const q = window.location.search;
    this.currentUrl = `${lastUrl}&n=${qsToobj().n}&referrer=floor`;
    if (lastUrl.indexOf("product") != -1) {
      this.type = "recommendations";
    } else if (lastUrl.indexOf("brand") != -1) {
      this.type = this.productInfo.brandName;
    } else if (lastUrl.indexOf("country") != -1) {
      this.type = this.productInfo.countryDetail;
    } else if (lastUrl.indexOf("category") != -1) {
      this.type = this.productInfo.cateName;
    } else if (lastUrl.indexOf("search") != -1) {
      this.isFloor = true;
      this.type = lastUrl.split("/")[2];
    } else if (lastUrl.indexOf('wish') != -1) {
      this.type = this.$lang.wishList
    } else {
      this.isFloor = true;
      this.type = q.split("=")[1];
    }
    // console.log(this.type,"before");
    this.type = decodeURIComponent(this.type).replace(
      /[,` ~!@#$%^&*:;+'><|.\\ \/=]+/g,
      "-"
    );
    this.login = !!getCookie('Auth-Token')
    // console.log(this.type,"after");
  },
  methods: {
    // ...mapActions(['setWishList', 'setLocalWishList']),
    /* addWish() {
      const data = {
        spuId: this.productInfo.spuId,
        skuId: this.productInfo.minPriceSkuId,
        count:  this.productInfo.minOrdQty || 1,
        warehouse: this.productInfo.warehouse,
      }
      if (!this.login) {
        if (this.isWish) {
          let wishList = JSON.parse(window.localStorage.getItem('localWishList')) || []
          let currIndex = null
          wishList.forEach((item, index) => {
            if (item.spuId === data.spuId) {
              currIndex = index
            }
          })
          if (currIndex !== null) {
            wishList.splice(currIndex, 1, Object.assign(data, {isDel: true}))
          }
          window.localStorage.setItem('localWishList', JSON.stringify(wishList))
          // this.setWishList(wishList)
          this.setLocalWishList(wishList)
        } else {
          let wishList = JSON.parse(window.localStorage.getItem('localWishList')) || []
          let currIndex = null
          wishList.forEach((item, index) => {
            if (item.spuId === data.spuId) {
              currIndex = index
            }
          })
          if (currIndex !== null) {
            wishList.splice(currIndex, 1, data)
          } else {
            wishList.push(data)
          }
          window.localStorage.setItem('localWishList', JSON.stringify(wishList))
          // this.setWishList(wishList)
          this.setLocalWishList(wishList)
        }
      } else if (this.login) {
        if (this.isWish) {
          this.$http.delete(`/api/wish/removeBySpu/${data.spuId}`)
            .then(res => {
              if (res.code === 2000) {
                this.isWish = false
                this.getWishList()
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$http.post(`/api/wish/create`, {wishSpu: [data]})
            .then(res => {
              if (res.code === 2000) {
                this.isWish = true
                this.getWishList()
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    },
    getWishList() {
      this.$http.get(`/api/wish/spuList`)
        .then(res => {
          if (res.code === 2000) {
            this.setWishList(res.data)
            window.localStorage.setItem('wishList', JSON.stringify(res.data))
          }
        })
    }, */
    toBrandDetail(id, event) {
      location.href = `/${this.$root.countryCode}/brand/detail?brandId=${id}`;
      event.preventDefault();
    },
    toStoreDetail(id, event) {
      if (!id) return;
      location.href = `/${this.$root.countryCode}/store/${id}`;
      event.preventDefault();
    },
  },
  /* watch: {
    wishList(newVal) {
      if (newVal && newVal.length > 0) {
        let isWish = false
        newVal.forEach(item => {
          if (item.spuId == this.productInfo.spuId) {
            isWish = true
            if (item.isDel && item.isDel === true) {
              isWish = false
            }
          }
        })
        this.isWish = isWish
      }
    },
    localWishList(newVal) {
      console.log(newVal, 'local')
      if (newVal && newVal.length > 0) {
        let isWish = false
        newVal.forEach(item => {
          if (item.spuId == this.productInfo.spuId) {
            isWish = true
            if (item.isDel && item.isDel === true) {
              isWish = false
            }
          }
        })
        this.isWish = isWish
      }
    }
  } */
};
</script>
<style lang="scss">
@import "~asset/scss/base.scss";

.product-content {
  position: relative;
  height: auto !important;
  /* .wish-status {
    position: absolute;
    right: r(8);
    top: r(10);
    z-index: 10;
    width: r(32);
    height: r(32);
    cursor: pointer;
    &:before, &:after {
      content: '';
      display: block;
      position: absolute;
      top: r(4);
      left: r(4);
      width: r(24);
      height: r(24);
    }
    &:before {
      transition: opacity .3s;
      @include bg-image('wishlist-default');
      opacity: 1;
    }
    &:after {
      transition: all .3s;
      @include bg-image('wishlist-active');
      opacity: 0;
      transform: scale(0);
    }
    &.active {
      &:before {
        opacity: 0;
      }
      &:after {
        opacity: 1;
        transform: scale(1);
      }
    }
  } */
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
      min-width: r(73);
      padding: 0 r(8);
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
    }

    .brand-info {
      margin-left: r(8);
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
    .el-rate{
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
    font-size: r(13);
    color: #000000;
    font-weight: 600;
    min-height: r(32);
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
  .price-info {
    margin-top: r(8);
    .real-price-discount {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: r(8);
      font-size: r(14);
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
@media only screen and (min-width: 1024px) {
  .product-content {
    z-index: 8;
    border-bottom: 1px solid #efefef;

    /* .wish-status {
      position: absolute;
      right: 16px;
      top: 16px;
      z-index: 10;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 0 none;
      box-sizing: border-box;
      &:hover {
        background-color: rgba(0,0,0,.10);
      }
      &:before, &:after {
        content: '';
        display: block;
        position: absolute;
        top: 4px;
        left: 4px;
        width: 24px;
        height: 24px;
        background-size: cover;
      }
    } */
    .link-product {
      width: 100%;
      height: 100%;
      display: block;
      background: #ffffff;
      padding: 20px 24px;
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
        margin-left: 8px;
        font-size: 13px;
        color: #666666;
      }
      &:hover{
        .brand-info{
          color: $mainColor;
        }
      }
    }

    .rate-wrap {
      margin-top: 6px;
      height: 15px;
      .el-rate{
        height: auto;
        .el-icon-star-on{
          font-size: 14px;
          margin-right: 0;
        }
      }
      .review-num {
        font-weight: normal;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.35);
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
      font-size: 14px;
      color: #000000;
      font-weight: normal;
      min-height: 32px;
    }
    .price-info {
      margin-top: 8px;
      .real-price-discount {
        display: flex;
        align-items: center;
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
    }
    .store-wrap{
      margin-top: 6px;
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
