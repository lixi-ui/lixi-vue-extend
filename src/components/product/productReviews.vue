<template>
  <div class="review-wrap" v-cloak v-if="productInfo.comeFrom != 1">
    <div class="reviews-header">
      <div class="reviews-header-left">
        <div class="title">{{ $lang.reviews }}</div>
        <div class="reviews-icon">
          <van-rate v-model="productInfo.avgStart" disabled/>
          <span>{{ productInfo.sumReview }}</span>
        </div>
      </div>
    </div>
    <div class="my-reviews" v-if="myReviews.length > 0">
      <ul class="review-list">
        <li class="my-reviews-label">{{ $lang.your_review }}</li>
        <li class="review-item"
            :class="{'negative': item.tagType == 2}"
            v-for="(item, index) in myReviews">
          <div>
            <span class="tag">{{item.tagName}}</span>
            <i class="icon"></i>
            <span class="count">{{item.tagCount}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="reviews-nav">
      <div class="reviews-country">
        <div v-for="item in reviewsCountry"
             @click="switchReviewsFilter(item.countryId, 'country')"
             v-if="item.tagCount > 0"
             :class="{'active': reviewsCountryId == item.countryId}">
          {{ item.countryName }} ({{ item.tagCount }})
        </div>
      </div>
      <div class="reviews-filter-wrap">
        <el-select v-model="reviewsCountryId" @change="switchReviewsFilter($event, 'country')" class="reviews-select-country">
          <el-option v-for="(item, index) in reviewsCountry"
                     :key="index"
                     :label="`${item.countryName} (${ item.tagCount})`"
                     :value="item.countryId">
          </el-option>
        </el-select>
        <el-select v-model="reviewsType" @change="switchReviewsFilter($event, 'type')">
          <el-option v-for="(item, index) in reviewsTypeList"
                     :key="index"
                     :label="item.text"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="reviewsSortType" @change="switchReviewsFilter($event, 'sort')" class="reviews-select-sort">
          <el-option v-for="(item, index) in reviewsSortTypeList"
                     :key="index"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <ul class="review-list" v-show="reviewsList.length > 0">
      <li class="review-item"
          :class="{'negative': item.tagType == 2, 'checked': checkedTagIds.includes(item.tagId)}"
          v-for="(item, index) in reviewsList"
          :key="index"
          @click="checkedReviews(item)"
      >
        <div>
          <span class="tag">{{item.tagName}}</span>
          <i class="icon"></i>
          <span class="count">{{item.tagCount}}</span>
        </div>
      </li>
    </ul>
    <p class="not-reviews-tips" v-show="!hasReviews">{{ $lang.notReviewsTips }}</p>
    <div class="add-reviews-container">
      <div class="reviews-pagination">
        <template v-if="pageCount > 1">
          <i @click="reviewsNext('prev')" class="el-icon-arrow-left"></i>
          <div>
            <span>{{ currentPage }}</span>
            <span>/</span>
            <span>{{ pageCount }}</span>
          </div>
          <i @click="reviewsNext('next')" class="el-icon-arrow-right"></i>
        </template>
      </div>
      <div class="add-reviews-form">
        <template v-if="toggleReviewsForm">
          <div class="review-input-wrap">
            <label class="icon-edit" for="reviews-good"></label>
            <input v-model="reviewsContent"
                   :class="['reviews-input', {'focus': showFormControl}]"
                   :placeholder="inputFocus ? $lang.reviewsTips :  $lang.reviewsTipsDefault"
                   @focus="inputFocusHandle"
                   id="reviews-good">
          </div>
          <div class="review-control" v-show="showFormControl">
            <span class="reviews-content-num" :class="{'err': reviewsContent.length == 40}">{{ reviewsContent.length || 0 }}/40</span>
            <div class="add-reviews-radio">
              <el-radio v-model="addReviewsType" label="1">
                <i class="icon icon-good"></i>
              </el-radio>
              <el-radio v-model="addReviewsType" label="2">
                <i class="icon icon-bad"></i>
              </el-radio>
            </div>
          </div>
          <van-button class="reviews-btn"
                      v-show="showFormControl"
                      @click="submitReviews"
                      :loading="submitLoading"
                      :disabled="submitLoading">
            {{ $lang.submit }}
          </van-button>
        </template>
      </div>
    </div>
    <div class="checked-reviews" v-if="myReviews.length <= 0">
      <ul class="review-list">
        <li class="review-item"
            :class="{'negative': item.tagType == 2}"
            v-for="(item, index) in checkedReviewsList"
            :key="index"
        >
          <div>
            <span class="tag">{{item.tagName}}</span>
            <i class="icon"></i>
            <i class="el-icon-close" @click="deleteTag(index)"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    getCookie,
    filterLanguageItem
  } from '../../framework/utils/utils';
  export default {
    name: 'product-reviews',
    props: {
      productInfo: {
        default: () => {}
      },
      spuId: [String, Number],
      skuId: [String, Number],
      countryCurrency: Array,
    },
    data() {
      return {
        reviewsType: 'All',
        reviewsCountryId: 'All',
        reviewsTypeList: [],
        reviewsCountry: [],
        myReviews: [],
        reviewsList: [],
        reviewsContent: '',
        addReviewsType: '1',
        checkedReviewsList: [],
        inputFocus: false,
        submitLoading: false,
        currentPage: 1,
        pageCount: 1,
        toggleReviewsForm: false,
        reviewsSortTypeList: [],
        reviewsSortType: 1
      };
    },
    computed: {
      checkedTagIds() {
        return this.checkedReviewsList.map(item => item.tagId);
      },
      showFormControl() {
        return this.inputFocus || this.reviewsContent.trim().length > 0 || this.checkedReviewsList.length > 0;
      },
      isLogin() {
        if (EASY_ENV_IS_BROWSER) {
          return !!getCookie('Auth-Token');
        }
        return false;
      },
      hasReviews() {
        return this.reviewsCountry.reduce((prev, next) => {
          return prev + next.tagCount;
        }, 0) > 0;
      },
    },
    watch: {
      reviewsContent(newVal) {
        if (newVal.length > 40) {
          this.reviewsContent = newVal.substr(0, 40);
        }
      },
    },
    created() {
      this.reviewsSortTypeList = [
        {
          label: this.$lang.reviewsPopular,
          value: 1
        },
        {
          label: this.$lang.reviewsRecent,
          value: 2
        }
      ];
    },
    beforeMount() {
      this.initReviews();
    },
    methods: {
      /**
       * @Description: 输入框获取焦点
       * @date 2020/8/13
      */
      inputFocusHandle() {
        if (!this.isLogin) {
          location.href = `/${this.$root.COOKIE_COUNTRY}/login`;
        } else {
          this.inputFocus = true;
        }
      },
      /**
       * @Description: 提交评论
       * @date 2020/8/13
       */
      submitReviews() {
        if (!this.isLogin) {
          this.$toast('Need login');
          return;
        }
        const tag = [...this.checkedReviewsList];
        if (this.reviewsContent.trim().length > 0) {
          tag.push({
            tagName: this.reviewsContent,
            tagType: this.addReviewsType,
            whetherCustom: 1
          });
        }
        if (tag.length === 0) {
          this.$toast(this.$lang.reviewsTips);
          return;
        }
        this.submitLoading = true;
        const tags = tag.map(item => {
          return {
            tagId: item.tagId || '',
            tagName: item.tagName,
            tagType: item.tagType,
            whetherCustom: item.whetherCustom
          };
        });
        const ratingStar = ((tag.reduce((prev, next) => {
          return next.tagType == 1 ? prev + 1 : prev;
        }, 0)) / tag.length * 5).toFixed(0);
        const data = [{
          spuId: this.spuId,
          skuId: this.skuId,
          whetherPurchase: 0,
          countryId: getCookie('countryId'),
          ratingStar,
          tags,
        }];
        this.$http.post('/api/reviews', {
          createReviewUserRequests: data
        }).then(res => {
          this.$toast(this.$lang.toastSuccess);
          this.checkedReviewsList = [];
          this.queryReviews();
          setTimeout(() => {
            this.getReviewsCount();
          }, 1000);
          this.myReviews = tags.sort((prev, next) => {
            return Number(prev.tagType) - Number(next.tagType);
          });
          this.toggleReviewsForm = this.myReviews.length <= 0;
        }).catch(() => {
          this.submitLoading = false;
        });
      },
      /**
       * @Description: 请求评论数据
       * @date 2020/8/13
      */
      initReviews() {
        const spuId = this.spuId;
        this.getUserReviews();
        this.getReviewsCount();
        this.$http.post('/api/getReviews', {
          spuId
        }).then(res => {
          const reviewsList = [];
          this.reviewsTypeList = [
            {
              text: `${this.$lang.all_type_review_count}(${(res.nonPurchase + res.purchased) || 0})`,
              value: 'All'
            },
            {
              text: `${this.$lang.non_purchased_review_count}(${res.nonPurchase || 0})`,
              value: '0'
            },
            {
              text: `${this.$lang.verified_purchased_review_count}(${res.purchased || 0})`,
              value: '1'
            },
          ];
          res.data && res.data.forEach(item => {
            const tagObj = {
              tagId: item.tagId,
              tagCount: item.tagCount,
              tagType: item.reviewTag.tagType,
              whetherCustom: item.reviewTag.whetherCustom || 0
            };
            const tagNameObj = filterLanguageItem(item.reviewTag.tagNames, this.$lang.langCode);
            tagObj.tagName = tagNameObj.tagName;
            reviewsList.push(tagObj);
          });
          const goodReviews = reviewsList.filter(item => item.tagType == '1');
          const badReviews = reviewsList.filter(item => item.tagType == '2');
          this.reviewsList = [...goodReviews, ...badReviews];
          this.pageCount = res.pageCount;
        });
      },
      /**
       * @Description: 获取评价数量
       * @date 2020/8/21
      */
      getReviewsCount() {
        this.$http.post('/api/reviewsCount', {
          spuId: this.spuId
        }).then(res => {
          const data = res.data;
          let count = 0;
          const reviewsCountry = [];
          data && data.forEach(item => {
            count += item.tagCount;
            for (const country of this.countryCurrency) {
              if (country.countryId == item.countryId) {
                country.countryList.forEach(name => {
                  if (this.$lang.langCode == name.languageCode) {
                    reviewsCountry.push({
                      countryId: country.countryId,
                      countryName: name.countryName,
                      tagCount: item.tagCount
                    });
                  }
                });
              }
            }
          });
          this.reviewsCountry = reviewsCountry.filter(item => item.tagCount > 0);
          this.reviewsCountry.unshift({
            countryId: 'All',
            countryName: this.$lang.allCountries,
            tagCount: count
          });
        });
      },
      /**
       * @Description: 获取用户评论
       * @date 2020/8/13
       */
      getUserReviews() {
        if (this.isLogin) {
          this.$http.post('/api/userReview', {
            spuId: this.spuId
          }).then(res => {
            const userReviews = res.data;
            userReviews && userReviews.forEach(item => {
              const tagObj = {
                tagId: item.tagId,
                tagCount: item.tagCount,
                tagType: item.reviewTag.tagType,
              };
              const tagNameObj = filterLanguageItem(item.reviewTag.tagNames, this.$lang.langCode);
              tagObj.tagName = tagNameObj.tagName;
              this.myReviews.push(tagObj);
            });
            this.myReviews.sort((prev, next) => {
              return Number(prev.tagType) - Number(next.tagType);
            });
            this.toggleReviewsForm = this.myReviews.length <= 0;
            this.submitLoading = false;
          });
        } else {
          this.toggleReviewsForm = true;
        }
      },
      /**
       * @Description: 切换条件查询评论
       * @date 2020/8/13
       */
      switchReviewsFilter(val, type) {
        switch (type) {
          case 'country':
            this.reviewsCountryId = val;
            this.reviewsType = 'All';
            break;
          case 'type':
            break;
          case 'sort':
            break;
          default:
            break;
        }
        this.currentPage = 1;
        this.queryReviews();
      },
      /**
       * @Description: 分页查询评论接口
       * @date 2020/8/13
       */
      queryReviews() {
        this.$http.post('/api/getReviews', {
          page: this.currentPage,
          pageSize: 20,
          whetherPurchase: this.reviewsType === 'All' ? '' : this.reviewsType,
          countryId: this.reviewsCountryId === 'All' ? '' : this.reviewsCountryId,
          spuId: this.spuId,
          sortType: this.reviewsSortType
        }).then(res => {
          this.pageCount = res.pageCount;
          if (res.data && res.data.length > 0) {
            this.reviewsTypeList = [
              {
                text: `${this.$lang.all_type_review_count}(${(res.nonPurchase + res.purchased) || 0})`,
                value: 'All'
              },
              {
                text: `${this.$lang.non_purchased_review_count}(${res.nonPurchase || 0})`,
                value: '0'
              },
              {
                text: `${this.$lang.verified_purchased_review_count}(${res.purchased || 0})`,
                value: '1'
              },
            ];
            const reviewsList = [];
            res.data && res.data.forEach(item => {
              const tagObj = {
                tagId: item.tagId,
                tagCount: item.tagCount,
                tagType: item.reviewTag.tagType,
                whetherCustom: item.reviewTag.whetherCustom || 0
              };
              const tagNameObj = filterLanguageItem(item.reviewTag.tagNames, this.$lang.langCode);
              tagObj.tagName = tagNameObj.tagName;
              reviewsList.push(tagObj);
            });
            const goodReviews = reviewsList.filter(item => item.tagType == '1');
            const badReviews = reviewsList.filter(item => item.tagType == '2');
            this.reviewsList = [...goodReviews, ...badReviews];
          } else {
            this.reviewsList = [];
          }
        });
      },
      /**
       * @Description: 分页查询触发器
       * @date 2020/8/13
       */
      reviewsNext(type) {
        if (this.pageCount == 1) return;
        switch (type) {
          case 'prev': {
            this.currentPage = this.currentPage == 1 ? this.pageCount : this.currentPage - 1;
            this.queryReviews();
            break;
          }
          case 'next': {
            this.currentPage = this.currentPage == this.pageCount ? 1 : this.currentPage + 1;
            this.queryReviews();
            break;
          }
          default:
            break;
        }
      },
      /**
       * @Description: 勾选评论
       * @date 2020/8/13
       */
      checkedReviews(tag) {
        if (!this.isLogin || !this.inputFocus || this.myReviews.length > 0) return;
        if (this.checkedTagIds.includes(tag.tagId)) {
          this.checkedReviewsList = this.checkedReviewsList.filter(item => item.tagId != tag.tagId);
        } else {
          this.checkedReviewsList.push(tag);
        }
      },
      /**
       * @Description: 删除勾选评论
       * @date 2020/8/13
       */
      deleteTag(index) {
        this.checkedReviewsList.splice(index, 1);
      },
    }
  };
</script>

<style lang="scss">
  @import "~asset/scss/base.scss";
  @media only screen and (max-width: 1023px){
    .review-wrap {
      background-color: #fff;
      padding: 0 r(16) r(16) r(16);
      border-bottom: 1px solid #CCCCCC;
      .reviews-header{
        margin-bottom: 16px;
        .reviews-header-left{
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: r(24);
          .title{
            font-size: r(14);
            color: rgba(51,51,51,0.87);
            font-weight: 600;
          }
          .reviews-icon{
            display: flex;
            align-items: center;
            span{
              font-size: r(12);
              margin-left: r(4);
              color: rgba(0,0,0,0.35);
            }
            /deep/ .van-rate{
              .van-rate__item{
                width: r(12) !important;
                height: r(12) !important;
              }
            }
          }
        }
      }
      .my-reviews{
        display: flex;
        padding: r(16) 0 r(8);
        .my-reviews-label{
          width: 100%;
          flex-shrink: 0;
          font-size: r(12);
          color: rgba(0,0,0,0.65);
          margin-bottom: r(8);
        }
      }
      .reviews-nav{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: r(16);
        padding-top: r(24);
        border-top: 1px solid rgba(0,0,0,0.10);
        .reviews-country{
          display: none;
        }
        .reviews-filter-wrap{
          display: flex;
          justify-content: space-between;
        }
        /deep/ .el-select{
          width: 33%;
          .el-input__inner{
            padding: 0 r(24) 0 r(8);
            font-size: r(12);
            height: r(32);
            line-height: r(32);
            color: rgba(0,0,0,0.85);
          }
          .el-input__icon{
            line-height: r(32);
          }
        }
      }
      .not-reviews-tips{
        font-size: r(14);
        color: rgba(0,0,0,0.65);
        line-height: r(20);
        margin-bottom: r(16);
      }
      .review-list {
        display: flex;
        flex-wrap: wrap;
        .review-item {
          background-color: rgba(74, 144, 226, 0.1);
          color: #4a90e2;
          font-size: r(11);
          line-height: r(19);
          padding: r(2) r(8);
          box-sizing: border-box;
          border-radius: r(100);
          margin: 0 r(6) r(10) 0;
          &.checked{
            border-color: #4a90e2;
          }
          .icon {
            display: inline-block;
            width: r(10);
            height: r(10);
            @include bg-image("good");
          }
          &.negative {
            background-color: #f5f5f5;
            color: rgba(0, 0, 0, 0.54);
            .icon {
              @include bg-image("bad");
            }
            &.checked{
              border-color: rgba(0, 0, 0, 0.54);
            }
          }
          .el-icon-close{
            margin-left: r(4);
            cursor: pointer;
          }
        }
      }
      .add-reviews-container{
        margin-bottom: r(16);
        .add-reviews-form{
          .review-input-wrap{
            width: max-content;
            margin: 0 auto;
            position: relative;
            .reviews-input{
              width: r(150);
              height: r(30);
              line-height: r(30);
              border-radius: 30px;
              font-size: r(13);
              padding: 0 r(30);
              box-sizing: border-box;
              border: 1px solid rgba(151,151,151,1);
              transition: 0.3s all ease-in-out;
              &.focus{
                width: r(330);
                border-color: $mainColor;
              }
            }
            .icon-edit{
              display: inline-block;
              position: absolute;
              left: r(10);
              top: 50%;
              width: r(12);
              height: r(14);
              transform: translateY(-50%);
              @include bg-image('icon-edit');
            }
          }
        }
        .review-control{
          margin: r(12) 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .reviews-content-num{
          color: rgba(0,0,0,0.25);
          &.err{
            color: #D0021B;
          }
        }
        .add-reviews-radio{
          display: flex;
          align-items: center;
          /deep/ .el-radio{
            display: flex;
            align-items: center;
            padding-top: r(12);
            +.el-radio{
              margin-left: r(12);
            }
            .el-radio__inner{
              width: r(12);
              height: r(12);
            }
          }
          .icon{
            display: inline-block;
            width: r(12);
            height: r(12);
            &.icon-good{
              @include bg-image("good");
            }
            &.icon-bad{
              @include bg-image("bad");
            }
          }
        }
        .reviews-btn{
          width: 100%;
          height: r(32);
          line-height: r(32);
          text-align: center;
          color: #fff;
          font-size: r(14);
          @include btn-gradient();
        }
      }
      .reviews-pagination{
        margin: r(6) 0 r(16);
        display: flex;
        justify-content: center;
        align-items: center;
        i{
          font-size: r(18);
          color: #666;
          cursor: pointer;
          font-weight: 600;
          &.not-next{
            cursor: not-allowed;
            opacity: 0.4;
          }
        }
        div{
          width: r(64);
          text-align: center;
          font-size: r(14);
          color: rgba(0,0,0,0.85);
          span:last-child{
            color: rgba(0,0,0,0.45);
          }
        }
      }
    }
  }
  @media only screen and (min-width: 1024px){
    .popper__arrow{
      left: auto !important;
      right: 10% !important;
    }
    .review-wrap {
      .title {
        font-size: 16px;
        line-height: 19px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 600;
      }
      .reviews-header{
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        .reviews-icon{
          display: flex;
          align-items: center;
          margin-top: 8px;
          span{
            font-size: 13px;
            line-height: 15px;
            margin-left: 9px;
            color: rgba(0,0,0,0.35);
          }
          /deep/ .van-rate{
            .van-rate__item{
              width: 16px !important;
              height: 16px !important;
            }
          }
        }
      }
      .my-reviews{
        display: flex;
        padding: 16px 0;
        .my-reviews-label{
          flex-shrink: 0;
          font-size: 16px;
          color: rgba(0,0,0,0.65);
          margin-right: 16px;
          line-height: 26px;
        }
      }
      .reviews-nav{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #F5F5F5;
        margin-bottom: 16px;
        .reviews-country{
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          div{
            height: 36px;
            line-height: 36px;
            margin: 0 16px;
            font-size: 13px;
            color: rgba(0,0,0,0.85);
            &.active{
              color: $mainColor;
            }
            &:hover{
              cursor: pointer;
            }
          }
        }
        .reviews-select-country{
          display: none;
        }
        .reviews-filter-wrap{
          display: flex;
          flex-shrink: 0;
        }
        /deep/ .el-select{
          width: 230px;
          .el-input__inner{
            border: none;
            text-align: right;
            background-color: transparent;
          }
        }
        .reviews-select-sort{
          width: 120px;
        }
      }
      .review-list {
        display: flex;
        flex-wrap: wrap;
        .review-item {
          font-size: 13px;
          line-height: 21px;
          margin: 0 12px 12px 0;
          padding: 3px 8px;
          background-color: rgba(74, 144, 226, 0.1);
          color: #4a90e2;
          border-radius: 30px;
          border: 1px solid transparent;
          cursor: pointer;
          &.checked{
            border-color: #4a90e2;
          }
          >div{
            display: flex;
            align-items: center;
          }
          .icon {
            width: 12px;
            height: 12px;
            margin: 0 4px 0 8px;
            @include bg-image("good");
          }
          &.negative {
            background-color: #f5f5f5;
            color: rgba(0, 0, 0, 0.54);
            .icon {
              @include bg-image("bad");
            }
            &.checked{
              border-color: rgba(0, 0, 0, 0.54);
            }
          }
          .el-icon-close{
            margin-left: 4px;
            cursor: pointer;
          }
        }
      }
      .not-reviews-tips{
        font-size: 14px;
        color: rgba(0,0,0,0.65);
        line-height: 20px;
        margin-bottom: 16px;
      }
      .add-reviews-container{
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        .add-reviews-form{
          display: flex;
          align-items: center;
          position: relative;
          .reviews-input{
            width: 300px;
            height: 30px;
            line-height: 30px;
            border-radius: 30px;
            font-size: 13px;
            padding: 0 30px;
            box-sizing: border-box;
            border: 1px solid rgba(151,151,151,1);
            transition: 0.3s all ease-in-out;
            &.focus{
              width: 626px;
              border-color: $mainColor;
            }
          }
          .icon-edit{
            display: inline-block;
            position: absolute;
            left: 10px;
            top: 50%;
            width: 12px;
            height: 14px;
            transform: translateY(-50%);
            @include bg-image('icon-edit');
          }
        }
        .review-control{
          display: flex;
          align-items: center;
        }
        .reviews-content-num{
          margin-left: 12px;
          color: rgba(0,0,0,0.25);
          &.err{
            color: #D0021B;
          }
        }
        .add-reviews-radio{
          margin-left: 24px;
          display: flex;
          align-items: center;
          /deep/ .el-radio{
            display: flex;
            align-items: center;
            padding-top: 2px;
            +.el-radio{
              margin-left: 12px;
            }
            .el-radio__inner{
              width: 12px;
              height: 12px;
            }
          }
          .icon{
            display: inline-block;
            width: 12px;
            height: 12px;
            &.icon-good{
              @include bg-image("good");
            }
            &.icon-bad{
              @include bg-image("bad");
            }
          }
        }
        .reviews-btn{
          width: auto;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #fff;
          font-size: 14px;
          margin-left: 16px;
          @include btn-gradient();
        }
      }
      .reviews-pagination{
        display: flex;
        align-items: center;
        i{
          font-size: 18px;
          color: #666;
          cursor: pointer;
          font-weight: 600;
          &.not-next{
            cursor: not-allowed;
            opacity: 0.4;
          }
        }
        div{
          width: 64px;
          text-align: center;
          font-size: 14px;
          color: rgba(0,0,0,0.85);
          span:last-child{
            color: rgba(0,0,0,0.45);
          }
        }
      }
    }
  }
</style>