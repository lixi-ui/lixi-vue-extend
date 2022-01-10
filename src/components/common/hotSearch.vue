<template>
  <div class="hot-search-wrap">
    <!-- <div
      v-show="plan === 'A'"
      class="scroll-hot-search"
      @mouseover="endScroll"
      @mouseleave="startScroll">
      <ul
        :class="['scroll-hot-search-list', {'active': scrollActive}]"
        :style="{'transform': `translateY(${scrollIndex * -17}px)`}">
        <li v-for="(list, i) in scrollList" :key="i">
          <span
            class="scroll-hot-search-item"
            @click="doHotSearch(item)"
            v-for="(item, idx) in list"
            :key="idx">
            {{ item }}
          </span>
        </li>
      </ul>
    </div> -->
    <div class="hot-search-box" v-show="plan === 'B'">
      <ul class="hot-search-keyword">
        <li 
          class="hot-search-item"
          v-for="(item, i) in headerHotSearchKeyword"
          :key="i"
          @click="doHotSearch(item)">
          {{ item }}
        </li>
      </ul>
      <span class="hot-more" v-if="visibleMoreKeyword">
        {{ $lang.seeAll }}
        <i class="el-icon-arrow-down"></i>
      </span>
      <div class="hot-search-pop" v-if="visibleMoreKeyword">
        <ul class="hot-search-keyword">
          <li 
            class="hot-search-item"
            v-for="(item, i) in hotSearchKeyword"
            :key="i"
            @click="doHotSearch(item)">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie } from 'framework/utils/utils';
export default {
  name: 'hotSearchComponent',
  data() {
    return {
      hotSearchKeyword: [],
      visibleMoreKeyword: false,
      headerHotSearchKeyword: [],
      scrollList: [],
      timer: null,
      scrollIndex: 0,
      scrollActive: true,
      plan: 'B',
    };
  },
  mounted() {
    // const plan = getCookie('searchPlan');
    // if (plan) {
    //   this.plan = plan;
    // } else {
    //   this.plan = 'B';
    // }
    this.queryHotSearch();
  },
  methods: {
    // 查询热搜词
    queryHotSearch() {
      this.$http.post('/api/newHotSearchList', {
        platform: this.$root.webSiteCode
      }).then(res => {
        const hotSearchKeyword = [];
        Array.isArray(res.data) && res.data.forEach(item => {
          hotSearchKeyword.push(item.wordsValue);
        });
        this.hotSearchKeyword = hotSearchKeyword;
        this.initHotSearchPlan();
      });
    },
    // 初始化热词方案
    initHotSearchPlan() {
      const val = this.hotSearchKeyword;
      const hotSearchCountryMaxSix = [1, 60186];
      if (hotSearchCountryMaxSix.includes(Number(this.$root.countryId))) {
        if (val.length > 10) {
          this.visibleMoreKeyword = true;
          this.headerHotSearchKeyword = val.slice(0, 10);
          // this.initScrollSearch(10);
        } else {
          this.visibleMoreKeyword = false;
          this.headerHotSearchKeyword = val.slice();
          // this.scrollList = [val];
        }
      } else {
        if (val.length > 6) {
          this.visibleMoreKeyword = true;
          this.headerHotSearchKeyword = val.slice(0, 6);
          // this.initScrollSearch(6);
        } else {
          this.visibleMoreKeyword = false;
          this.headerHotSearchKeyword = val.slice();
          // this.scrollList = [val];
        }
      }
    },
    // 初始化滚动热搜词
    initScrollSearch(count) {
      const scrollList = [];
      const list = this.hotSearchKeyword;
      for (let i = 0; i < list.length; i += count) {
        scrollList.push(list.slice(i, i + count));
      }
      if (scrollList.length > 1) {
        scrollList.push(scrollList[0])
      }
      this.scrollList = scrollList;
      this.initTimer();
    },
    // 初始化定时器
    initTimer() {
      this.timer = setInterval(() => {
        this.scrollActive = true;
        this.scrollIndex++;
        if (this.scrollIndex == this.scrollList.length - 1) {
          setTimeout(() => {
            this.scrollActive = false;
            this.scrollIndex = 0;
          }, 500);
        }
      }, 3000)
    },
    // 热词搜索
    doHotSearch(val) {
      location.href = `/${this.$root.countryCode}/product?keyword=` + encodeURIComponent(val.replace(/(^\s*)|(\s*$)/g, ''));
      // Facebook追踪埋点
      window.fbq && window.fbq('track', 'Search');
    },
    // 开始滚动
    startScroll() {
      if (this.timer || this.scrollList.length <= 1) return;
      this.initTimer();
    },
    // 停止滚动
    endScroll() {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
</script>

<style lang="scss">
  @import "~asset/scss/common";
  .hot-search-wrap {
    position: relative;
    display: flex;
    height: 17px;
    margin-top: 4px;
    // @include multipleEllipsis(1);
    .hot-search-box {
      position: absolute;
      display: flex;
      width: max-content;
    }
    .hot-search-keyword {
      display: flex;
      li{
        flex-shrink: 0;
        cursor: pointer;
        font-size: 12px;
        color: rgba(0,0,0,0.45);
        line-height: 17px;
        margin-right: 16px;
        &:hover{
          color: $mainColor;
        }
      }
    }
    .hot-more {
      flex-shrink: 0;
      font-size: 12px;
      line-height: 17px;
      color: $mainColor;
      cursor: pointer;
      .el-icon-arrow-down {
        color: inherit;
        font-size: 14px;
      }
      &:hover +.hot-search-pop {
        visibility: visible;
        opacity: 1;
      }
    }
    .hot-search-pop {
      visibility: hidden;
      opacity: 0;
      position: absolute;
      width: 100%;
      padding: 12px 16px 0;
      border-radius: 4px;
      box-sizing: border-box;
      background-color: #fff;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      transition: all 0.4s cubic-bezier(0.73, 0.005, 0.22, 1);
      .hot-search-keyword {
        flex-wrap: wrap;
        >li {
          margin-bottom: 12px;
        }
      }
      &:hover {
        visibility: visible;
        opacity: 1;
      }
    }
  }
  .scroll-hot-search {
    position: absolute;
    display: flex;
    width: max-content;
    height: 17px;
    overflow: hidden;
    .scroll-hot-search-list {
      &.active {
        transition: all .5s linear;
      }
      li {
        display: flex;
        .scroll-hot-search-item {
          flex-shrink: 0;
          cursor: pointer;
          font-size: 12px;
          color: rgba(0, 0, 0, 0.45);
          line-height: 17px;
          margin-right: 16px;
          &:hover{
            color: $mainColor;
          }
        }
      }
    }
  }
</style>