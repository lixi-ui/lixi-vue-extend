<template>
  <div class="product-list-component">
    <ul class="good-list">
      <li class="good-store-info">
        <i class="icon-store"></i>
        <span>{{ list[0].storeCompanyName || $lang.gshopperOfficialStore }}</span>
      </li>
      <li v-for="(item, index) in list" :key="index">
        <div class="good-item">
          <div class="thumbnail">
            <img :src="item.thumbnail" alt="">
          </div>
          <div class="good-box">
            <div class="good-info">
              <p class="name">{{ item.productName }}</p>
              <p class="attr">{{ item.attributes }}</p>
              <p class="id">{{ $lang.productId }}: {{ item.skuId }}</p>
              <div class="good-price-count">
                <span class="price">
                  {{ item.realPrice | money(currencySign) }}
                </span>
                <span class="count">
                  {{ $lang.quantity }}&nbsp;&nbsp;
                  {{ item.count }}
                </span>
              </div>
            </div>
            <div class="good-options">
              <div class="good-shipping-logic">
                <p class="shipping">
                  <template v-if="item.shippingFee && item.shippingFee != 0">
                    {{ $lang.shippingFee }}&nbsp;&nbsp;
                    {{ item.shippingFee | money(currencySign) }}
                  </template>
                  <template v-else>
                    {{ $lang.freeShipping }}
                  </template>
                </p>
                <div class="logic-day-country" v-if="item.comeFrom != 1">
                  <p class="day">
                    {{ getLogicDays(item.skuPriceList, item.warehouse) }}
                  </p>
                  <p class="country">
                    {{ $lang.shippingFromCountry }}
                    {{ getWarehouseCountry(item.skuPriceList, item.warehouse) }}
                  </p>
                </div>
                <div v-else>
                  <p class="day" v-if="item.shopNcTplAreaVo">
                    <span>{{ $lang.DeliveredWithin }}</span>
                    <span>{{ item.shopNcTplAreaVo.timeLength }}</span>
                    <span>{{ $lang.days }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'productListHorizontal',
    props: {
      list: {
        type: Array,
        default: () => []
      },
      countryList: {
        type: Array,
        default: () => []
      },
      currencySign: String,
      countryId: [String, Number],
      currencyCode: String,
    },
    mounted() {
      console.log(this)
    },
    methods: {
      // 获取该商品的预计抵达时间
      getLogicDays(skuPriceList = [], warehouse = '') {
        const priceItem = skuPriceList.find(item => item.warehouse == warehouse && item.countryId == this.countryId);
        if (priceItem.preSale == 1 && priceItem.cmsBookingGoods) {
          if (priceItem.cmsBookingGoods.shipType == 2) {
            return this.$lang.preSaleShipping.replace('%@', priceItem.cmsBookingGoods.shipContent);
          } else {
            return this.$lang.preSaleShippingDay.replace('%@', priceItem.cmsBookingGoods.shipContent);
          }
        }
        if (priceItem.logicstartday || priceItem.logicday) {
          if (priceItem.logicstartday && priceItem.logicday) {
            return `${this.$lang.DeliveredWithin} ${priceItem.logicstartday}-${priceItem.logicday} ${this.$lang.days}`;
          } else if (priceItem.logicstartday && !priceItem.logicday) {
            return `${this.$lang.DeliveredWithin} ${priceItem.logicstartday} ${this.$lang.days}`;
          } else if (!priceItem.logicstartday && priceItem.logicday) {
            return `${this.$lang.DeliveredWithin} ${priceItem.logicday} ${this.$lang.days}`;
          }
        }
        return '';
      },
      // 获取该商品的仓库地区
      getWarehouseCountry(skuPriceList = [], warehouse = '') {
        const warehouseRegionItem = skuPriceList.find(item => item.warehouse == warehouse);
        if (!warehouseRegionItem) return '';
        const countryItem = this.countryList.find(country => country.countryId == warehouseRegionItem.warehouseRegion);
        return countryItem ? countryItem.countryName : '';
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '~asset/scss/base.scss';
  @media only screen and (max-width: 1023px) {
    .product-list-component{
      .good-list{
        li{
          padding: r(16) r(16) 0 r(16);
          &:last-child{
            padding-bottom: r(16);
          }
        }
        .good-store-info{
          display: flex;
          align-items: center;
          font-size: r(14);
          font-weight: 500;
          color: rgba(0,0,0,0.65);
          padding: r(12) r(16);
          border-bottom: 1px solid #EAEAEA;
          .icon-store{
            width: r(16);
            height: r(16);
            margin-right: r(8);
            @include bg-image('icon-store');
          }
        }
        .good-item{
          display: flex;
          .thumbnail{
            @include imgBox(r(60), r(60));
            border: 1px solid #EAEAEA;
            border-radius: 4px;
            margin-right: r(12);
            img{
              border-radius: 4px;
            }
          }
          .good-box{
            flex: 1;
            .good-info{
              .name{
                font-size: r(14);
                line-height: r(18);
                color: rgba(0,0,0,0.85);
                margin-bottom: r(4);
              }
              .attr{
                font-size: r(14);
                line-height: r(18);
                color: rgba(0,0,0,0.65);
                margin-bottom: r(4);
              }
              .id{
                font-size: r(12);
                line-height: r(16);
                color: rgba(0,0,0,0.45);
                margin-bottom: r(4);
              }
              .good-price-count{
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: rgba(0,0,0,0.85);
                text-align: center;
                line-height: r(20);
                margin-bottom: r(8);
                .price{
                  font-size: r(16);
                  font-weight: 600;
                }
                .count{
                  font-size: r(13);
                }
              }
            }
            .good-options{
              .good-shipping-logic{
                line-height: r(16);
                text-align: right;
                .shipping{
                  font-size: r(12);
                  color:rgba(0,0,0,0.85);
                  margin-bottom: r(4);
                }
                .logic-day-country{
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                }
                .day, .country{
                  font-size: r(12);
                  line-height: r(16);
                  color: rgba(0,0,0,0.45);
                  margin-left: r(8);
                }
              }
            }
          }
        }
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    .product-list-component{
      .good-list{
        .good-item{
          display: flex;
          .thumbnail{
            @include imgBox(120px, 120px);
            border: 1px solid #EAEAEA;
            margin-right: r(16);
          }
          .good-box{
            flex: 1;
            display: flex;
            .good-info{
              width: 50%;
              .good-price-count{
                display: flex;
                justify-content: flex-end;
                margin-bottom: r(18);
                .count{
                  margin-left: r(32);
                }
              }
            }
            .good-options{
              flex: 1;
              padding-left: r(16);
              .good-shipping-logic{
                .logic-day-country{
                  display: block;
                  .day, .country{
                    font-size: r(12);
                    line-height: r(16);
                    color: rgba(0,0,0,0.45);
                    margin-left: r(8);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media only screen and (min-width: 1024px) {
    .product-list-component{
      .good-list{
        li+li{
          margin-top: 16px;
        }
        .good-store-info{
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 500;
          color: rgba(0,0,0,0.65);
          margin-bottom: 16px;
          .icon-store{
            width: 16px;
            height: 16px;
            margin-right: 8px;
            @include bg-image('icon-store');
          }
        }
        .good-item{
          display: flex;
          .thumbnail{
            @include imgBox(120px, 120px);
            border: 1px solid #EAEAEA;
            border-radius: 4px;
            margin-right: 24px;
            img{
              border-radius: 4px;
            }
          }
          .good-box{
            padding-top: 8px;
            flex: 1;
            display: flex;
            .good-info{
              flex: 1;
              .name{
                font-size: 14px;
                line-height: 18px;
                color: rgba(0,0,0,0.85);
                margin-bottom: 4px;
              }
              .attr{
                font-size: 14px;
                line-height: 18px;
                color: rgba(0,0,0,0.65);
                margin-bottom: 12px;
              }
              .id{
                font-size: 12px;
                line-height: 16px;
                color: rgba(0,0,0,0.45);
                margin-bottom: 12px;
              }
              .good-price-count{
                display: flex;
                color:rgba(0,0,0,0.85);
                text-align: center;
                font-size: 14px;
                line-height: 20px;
                .price{
                  font-size: 16px;
                  margin-right: 12px;
                }
              }
            }
            .good-options{
              width: 25%;
              display: flex;
              justify-content: flex-end;
              flex-shrink: 0;
              .good-shipping-logic{
                line-height: 20px;
                text-align: right;
                .shipping{
                  font-size: 14px;
                  color:rgba(0,0,0,0.85);
                  margin-bottom: 4px;
                }
                .day, .country{
                  font-size: 12px;
                  line-height: 16px;
                  color: rgba(0,0,0,0.45);
                  margin-bottom: 4px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>