<template>
  <div class="searchBox">
    <div class="searchInput">
      <form action="/">
        <van-search
          ref="vanSearch"
          v-model="searchValue"
          placeholder="搜索"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
      <div class="searchModal" v-if="show" @click="toClick"></div>
    </div>
  </div>
</template>

<script>
import { debounce } from "/src/utils/framework/utils/utils";
import { Search } from "vant";

export default {
  name: "g-search",
  components: {
    VanSearch: Search
  },
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
      // if (EASY_ENV_IS_BROWSER) {
      //   const url = window.location.pathname;
      //   if (url.indexOf("/toSearch") > -1) {
      //     return false;
      //   } else {
      //     return true;
      //   }
      // } else {
      //   return true;
      // }
      return true;
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

