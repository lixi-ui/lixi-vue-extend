<template>
  <div class="searchBox">
    <div class="searchInput">
      <form action="/">
        <van-search
          ref="vanSearch"
          v-model="searchValue"
          :placeholder="$lang.search"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
      <div class="searchModal" v-if="show" @click="toClick"></div>
    </div>
  </div>
</template>

<script>
import { debounce } from "framework/utils/utils";

export default {
  name: "search",
  props: {
    isFocus: {
      type: Boolean,
      default: false
    },
    keyWord: {
      type: String,
      default: ""
    }
  },
  computed: {
    show() {
      if (EASY_ENV_IS_BROWSER) {
        const url = window.location.pathname;
        if (url.indexOf("/toSearch") > -1) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
  },
  data() {
    return {
      searchValue: ""
    };
  },
  created() {
    this.searchValue = this.keyWord;
    this.$watch(
      "searchValue",
      debounce(newVal => {
        this.$emit("onSearchChange", newVal);
      }, 300)
    );
  },
  mounted() {
    if (this.isFocus) {
      document.querySelector(".van-field__control").focus();
    }
  },
  methods: {
    toClick() {
      this.$emit("toClick");
    },
    onSearch() {
      this.$emit("onSearch", this.searchValue);
    },
    onCancel() {
      this.$emit("onCancel");
    }
  }
};
</script>

<style lang="scss">
@import "~asset/scss/base.scss";
@media only screen and (max-width: 1023px) {
  .searchBox {
    width: 100%;
    height: r(45);
    padding: 0 r(16);
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0 1px r(2) -1px rgba(0, 0, 0, 0.1);
    .searchInput {
      width: 100%;
      height: r(36);
      position: relative;
      .van-search {
        height: r(36);
        border-radius: 10px;
        .van-field {
          background: #f3f3f3 !important;
          padding: 0;
        }
      }
      .searchModal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
