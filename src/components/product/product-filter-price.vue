<template>
  <div class="product-filter-price-template">
    <el-input @change="handlePriceRange" v-model.trim="minPriceValue" :placeholder="minPlaceHolder"></el-input>
    <span>-</span>
    <el-input @change="handlePriceRange" v-model.trim="maxPriceValue" :placeholder="maxPlaceHolder"></el-input>
  </div>
</template>

<script>
  export default {
    name: 'product-filter-price',
    props: ['minPrice', 'maxPrice', 'currencySign', 'priceRangeSelect',],
    data() {
      return {
        minPlaceHolder: '',
        maxPlaceHolder: '',
        minPriceValue: '',
        maxPriceValue: '',
        priceRange: [],
      };
    },
    mounted() {
      this.minPlaceHolder = this.minPrice != 0 ? this.currencySign + Math.ceil(this.minPrice) : this.$lang.minPrice;
      this.maxPlaceHolder = this.maxPrice != 999999999 ? this.currencySign + Math.ceil(this.maxPrice) : this.$lang.maxPrice;
    },
    methods: {
      handlePriceRange() {
        const minPricePlaceholder = this.minPlaceHolder.split(this.currencySign).length > 1 ? this.minPlaceHolder.split(this.currencySign)[1] : null;
        const maxPricePlaceholder = this.maxPlaceHolder.split(this.currencySign).length > 1 ? this.maxPlaceHolder.split(this.currencySign)[1] : null;
        const minPriceValue = this.minPriceValue || minPricePlaceholder || this.minPrice;
        const maxPriceValue = this.maxPriceValue || maxPricePlaceholder || this.maxPrice;
        this.$emit('handlePriceRange', minPriceValue, maxPriceValue);
        this.minPriceValue = '';
        this.maxPriceValue = '';
      },
    },
    watch: {
      priceRangeSelect(val) {
        this.priceRange = val;
        this.minPlaceHolder = Math.ceil(val[0]) != 0 ? this.currencySign + Math.ceil(val[0]) : this.$lang.minPrice;
        this.maxPlaceHolder = Math.ceil(val[1]) != 999999999 ? this.currencySign + Math.ceil(val[1]) : this.$lang.maxPrice;
      },
      minPriceValue(newVal) {
        this.minPriceValue = String.prototype.replace.call(newVal, /[^0-9]/g, '');
      },
      maxPriceValue(newVal) {
        this.maxPriceValue = String.prototype.replace.call(newVal, /[^0-9]/g, '');
      },
    }
  };
</script>

<style scoped lang="scss">
  @import "~asset/scss/base.scss";
  @media only screen and (min-width: 1024px) {
    .product-filter-price-template{
      display: flex;
      align-items: center;
      span{
        margin: 0 6px;
      }
      .el-input{
        width: 120px;
      }
      /deep/ .el-input__inner{
        height: 40px;
        line-height: 40px;
        border-color: #C4C4C4;
      }
    }
  }
  @media only screen and (max-width: 1023px) {
    .product-filter-price-template{
      display: flex;
      align-items: center;
      span{
        margin: 0 r(6);
      }
      /deep/ .el-input__inner{
        font-size: r(14);
        height: r(44);
        line-height: r(44);
        margin: r(16) 0;
      }
    }
  }
</style>