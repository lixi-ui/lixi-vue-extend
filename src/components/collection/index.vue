<template>
  <div
    class="collection-component"
    :class="[
      'collection-' + size
    ]"
    @click="toggleCollection"
    data-attr="tagCode.addWish">
    <div class="icon-collection-box">
      <span
        class="icon-collection-default"
        :class="{'active': nativeIsCollection}">
      </span>
      <span
        class="icon-collection-active"
        :class="{'active': nativeIsCollection}">
      </span>
    </div>
    <span class="text" v-if="text">{{ text }}</span>
  </div>
</template>
<script>
// import { tag } from 'framework/utils/config';
export default {
  props: {
    text: String, // 收藏文本
    size: { // 尺寸
      type: String,
      default: () => 'default'
    },
    spuId: [String, Number],  // 商品id
    storeId: [String, Number],  // 店铺id
    searchable: Boolean,  // 需要查询
    isCollection: { // 是否收藏
      type: Boolean,
      default: false
    },  
  },
  data() {
    return {
      // tagCode: tag,
      nativeIsCollection: false,
      isSubmit: false,
    }
  },
  watch: {
    isCollection: {
      handler(val) {
        this.nativeIsCollection = Boolean(val);
      },
      immediate: true
    }
  },
  mounted() {
    if (this.searchable) {
      if (!this.$root.isLogin) return;
      if (this.spuId) {
        this.initProductCollection();
      }
      if (this.storeId) {
        this.initStoreCollection();
      }
    }
  },
  methods: {
    // 查询是否在收藏里
    initProductCollection() {
      this.$http.post('/api/collection/product/isFollow', {
        spuId: this.spuId,
      }).then(res => {
        this.nativeIsCollection = res.data;
      });
    },
    // 查询是否在收藏里
    initStoreCollection() {
      this.$http.post('/api/collection/store/isFollow', {
        storeId: this.storeId,
      }).then(res => {
        this.nativeIsCollection = res.data;
      });
    },
    // 切换收藏状态
    toggleCollection() {
      if (!this.$root.isLogin) {
        location.href = `/${this.$root.countryCode}/login`;
        return;
      }
      if (this.isSubmit) return;
      this.isSubmit = true;
      if (this.spuId) {
        this.toggleProductCollection();
        return;
      }
      if (this.storeId) {
        this.toggleStoreCollection();
        return;
      }
    },
    // 商品收藏
    toggleProductCollection() {
      this.$http.post('/api/collection/product/toggle', {
        ids: [this.spuId],
        isFollow: this.nativeIsCollection ? 0 : 1,
      }).then(() => {
        this.nativeIsCollection = !this.nativeIsCollection;
        if (this.nativeIsCollection) {
          this.$toast(this.$lang.collection_success_tips);
        }
      }).finally(() => {
        this.isSubmit = false;
      });
    },
    // 店铺收藏
    toggleStoreCollection() {
      this.$http.post('/api/collection/store/toggle', {
        ids: [this.storeId],
        isFollow: this.nativeIsCollection ? 0 : 1,
      }).then(() => {
        this.nativeIsCollection = !this.nativeIsCollection;
        if (this.nativeIsCollection) {
          this.$toast(this.$lang.collection_success_tips);
        }
      }).finally(() => {
        this.isSubmit = false;
      });
    },
  }
}
</script>
<style lang="scss" scoped>
  // @import "~asset/scss/base.scss";
  @media only screen and (max-width: 1023px) {
    .collection-component {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon-collection-box {
        position: relative;
        width: 32px;
        height: 32px;
        [class^=icon-collection] {
          position: absolute;
          display: block;
          left: 4px;
          top: 4px;
          width: 24px;
          height: 24px;
        }
        .icon-collection-default {
          transition: opacity 0.3s;
          // @include bg-image('wishlist-default');
          &.active {
            opacity: 0;
          }
        }
        .icon-collection-active {
          transform: scale(0);
          transition: all 0.3s;
          // @include bg-image('wishlist-active');
          &.active {
            opacity: 1;
            transform: scale(1);
          }
        }
      }
      &.collection-small {
        .icon-collection-box {
          width: 24px;
          height: 24px;
          [class^=icon-collection] {
            top: 3px;
            left: 3px;
            width: 18px;
            height: 18px;
          }
        }
      }
      .text {
        font-size: 13px;
        line-height: 16px;
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
  @media only screen and (min-width: 1024px) {
    .collection-component {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon-collection-box {
        position: relative;
        width: 32px;
        height: 32px;
        [class^=icon-collection] {
          position: absolute;
          display: block;
          left: 4px;
          top: 4px;
          width: 24px;
          height: 24px;
        }
        .icon-collection-default {
          transition: opacity 0.3s;
          // @include bg-image('wishlist-default');
          &.active {
            opacity: 0;
          }
        }
        .icon-collection-active {
          transform: scale(0);
          transition: all 0.3s;
          // @include bg-image('wishlist-active');
          &.active {
            opacity: 1;
            transform: scale(1);
          }
        }
      }
      &.collection-small {
        .icon-collection-box {
          width: 24px;
          height: 24px;
          [class^=icon-collection] {
            top: 3px;
            left: 3px;
            width: 18px;
            height: 18px;
          }
        }
      }
      &:hover {
        .text {
          // color: $mainColor;
        }
      }
      .text {
        font-size: 13px;
        line-height: 16px;
        padding-right: 6px;
        color: rgba(0, 0, 0, 0.65);
        transition: all 0.3s;
      }
    }
  }
</style>