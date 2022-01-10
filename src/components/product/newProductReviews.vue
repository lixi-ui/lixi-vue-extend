<template>
  <div class="new-reviews-wrap">
    <div class="reviews-header">
      <div class="title">{{ $lang.newReviews.title }}</div>
      <div class="goods-reviews-info">
        <div class="reviews-star">
          <div class="reviews-star-info">
            <p class="star-num">{{ Number(productReviewsInfo.avg).toFixed(1) }}</p>
            <div class="reviews-icon">
              <el-rate v-model="productReviewsInfo.avg" disabled></el-rate>
            </div>
            <p class="reviews-num">{{ $lang.newReviews.reviewsNum.replace('%@', productReviewsInfo.total) }}</p>
          </div>
          <ul class="reviews-star-rating" v-if="productReviewsInfo.starData">
            <li v-for="(star, index) in [5, 4, 3, 2, 1]" :key="index">
              <span class="label" v-if="star === 1">{{ $lang.newReviews.star.replace('%@', '1') }}</span>
              <span class="label" v-else>{{ $lang.newReviews.star.replace('%@', star) }}</span>
              <div class="line">
                <i class="line-bg" :style="{'width': productReviewsInfo.starData['percentcnt' + star] + '%'}"></i>
              </div>
              <span class="label">
                {{ `${productReviewsInfo.starData['percentcnt' + star]}%`}}
              </span>
            </li>
          </ul>
        </div>
        <div class="reviews-label">
          <ul class="reviews-tag-list" v-if="productReviewsInfo.tags && productReviewsInfo.tags.length > 0">
            <li class="review-item"
                :class="[{'negative': item.tagAttr == 0}, {'checked': filterParams.tagStr.includes(item.id)}]"
                @click="handleCheckedTag(item.id)"
                v-for="(item, index) in productReviewsInfo.tags"
                :key="index">
              <div v-if="item.languageTag && item.languageTag.length > 0">
                <span class="tag">{{ `${item.languageTag[0].content} (${item.cnt})` }}</span>
              </div>
            </li>
            <!-- class checked选取 negative差评-->
          </ul>
        </div>
      </div>
    </div>
    <div class="reviews-nav">
      <div class="reviews-country">
        <!-- 自适应el-select宽度 -->
        <div class="adaptive-select-box">
          <span class="width-block" v-if=" reviewsStarList.length > 0">
            {{ reviewsStarList[0].label }}
          </span>
          <el-select v-model="filterParams.star"
                     @change="switchReviewsFilter($event, 'star')"
                     class="reviews-select-star">
            <el-option v-for="(item, index) in reviewsStarList"
                       :key="index"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="adaptive-select-box">
          <span class="width-block" v-if=" reviewsCountry.length > 0">
            {{ `${reviewsCountry[0].countryName} (${reviewsCountry[0].count})` }}
          </span>
          <el-select v-model="filterParams.platform"
                     @change="switchReviewsFilter($event, 'country')"
                     class="reviews-select-country">
            <el-option v-for="(item, index) in reviewsCountry"
                       :key="index"
                       :label="`${item.countryName} (${item.count})`"
                       :value="item.platform">
            </el-option>
          </el-select>
        </div>
        <div class="reviews-has-image"
             :class="{'active': filterParams.haveImg === 1}"
             @click="handleCheckedImg">
          {{ $lang.newReviews.hasPhoto.replace('%@', productReviewsInfo.hasImgCount) }}
        </div>
      </div>
      <div class="reviews-filter-wrap">
        <div class="adaptive-select-box">
          <span class="width-block" v-if=" reviewsSortTypeList.length > 0">
            {{ reviewsSortTypeList[0].label }}
          </span>
          <el-select v-model="filterParams.order"
                     @change="switchReviewsFilter($event, 'sort')"
                     class="reviews-select-sort">
            <el-option v-for="(item, index) in reviewsSortTypeList"
                       :key="index"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="reviews-filter-mobile">
        <ul class="filter-tag-list">
          <li class="filter-tag"
              :class="{'active': filterParams.haveImg === 1}"
              @click="handleCheckedImg">
            {{ $lang.newReviews.hasPhoto.replace('%@', productReviewsInfo.hasImgCount) }}
          </li>
        </ul>
        <div class="filter-time">
          <span :class="{'active': filterParams.order === 1}" @click="handleSwitchTime(1)">{{ $lang.newReviews.sortDefault }}</span>
          <span :class="{'active': filterParams.order === 2}" @click="handleSwitchTime(2)">{{ $lang.newReviews.sortLatest }}</span>
        </div>
      </div>
    </div>
    <ul class="reviews-detail-list" v-if="productReviewsList.length > 0">
      <li class="reviews-detail-item"
          v-for="(item, index) in productReviewsList"
          :key="index">
        <div class="user-info">
          <p class="name">
            {{ item.username }}
            <!-- <template v-if="item.username.length === 1">
              {{ item.username }}
            </template>
            <template v-else-if="item.username.length === 2">
              {{ `${item.username.substr(0, 1)}*`}}
            </template>
            <template v-else>
              {{ `${item.username.substr(0, 1)}*${item.username.substr(-1)}`}}
            </template> -->
          </p>
          <p class="platform">
            <img :src="item.countryIcon" alt="">
            <span>{{ item.countryName }}</span>
          </p>
        </div>
        <div class="reviews-content">
          <div class="star-time">
            <el-rate v-model="item.star" disabled></el-rate>
            <span class="attr">{{ item.sktAttr }}</span>
            <span class="time">{{ item.commentTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </div>
          <p class="content">{{ item.comment }}</p>
          <ul class="user-reply-list" v-if="item.userCommentReply.length > 0">
            <li
              class="user-reply-item"
              v-for="(userReplyItem, i) in item.userCommentReply"
              :key="i">
              <span>{{ userReplyItem.commentTime | filterReplyTime(item.commentTime, $lang.comment_reply_date) }}</span>
              <span>{{ userReplyItem.comment }}</span>
            </li>
          </ul>
          <ul class="reviews-tag-list" v-if="item.tagArr && item.tagArr.length > 0">
            <li class="review-item"
                :class="[tag.tagAttr == 1 ? 'good' : 'negative']"
                v-for="(tag, idx) in item.tagArr"
                :key="idx">
              <div>
                <i class="icon"></i>
                <span class="tag">{{ tag.content }}</span>
              </div>
            </li>
          </ul>
          <ul class="reviews-image-list" v-if="item.imgList && item.imgList.length">
            <li v-for="(url, i) in item.imgList"
                :key="i"
                @click="previewImages(item.imgList, i)">
              <img v-lazy="url" alt="">
            </li>
          </ul>
          <div class="reviews-reply" v-if="item.otherCommentReply.length > 0">
            <ul class="reply-list">
              <li
                v-for="(replyItem, i) in item.otherCommentReply"
                :key="i"
                class="reply-item">
                <!-- <span v-if="replyItem.userType == 1" class="reply-user">
                  <i class="icon-store"></i>
                  用户回复
                </span> -->
                <div v-if="replyItem.userType == 2" class="reply-box">
                  <i class="icon-store"></i>
                  <span>{{ $lang.store_reply }}:</span>
                  {{ replyItem.comment }}
                </div>
                <div v-if="replyItem.userType == 3" class="reply-box reply-platform">
                  <i class="icon-platform"></i>
                  <span>{{ $lang.platform_reply }}:</span>
                  {{ replyItem.comment }}
                </div>
                <!-- <span>
                  {{ replyItem.comment }}
                </span> -->
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <div class="pagination-wrap" v-if="productReviewsInfo.total > 10">
      <el-pagination
              background
              layout="prev, pager, next"
              :pager-count="5"
              :current-page="filterParams.page"
              :page-size="filterParams.limit"
              :total="productReviewsInfo.total"
              @current-change="changePage">
      </el-pagination>
    </div>
    <preview-images v-if="visiblePreviewImages"
                    @togglePreviewImages="togglePreviewImages"
                    :index.sync="imagesIndex"
                    :images="previewImageList">
    </preview-images>
  </div>
</template>

<script>
  import {
    getCookie,
  } from '../../framework/utils/utils';
  import previewImages from 'component/common/previewImages';
  import jQuery from 'asset/js/jquery';
  export default {
    name: 'newProductReviews',
    components: { previewImages },
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
        productReviewsInfo: {
          hasImgCount: 0,
          total: 0
        },
        productReviewsList: [],
        reviewsCountry: [],
        reviewsStarList: [],
        reviewsSortTypeList: [],
        filterParams: {
          page: 1,
          limit: 10,
          platform: 'All',
          star: 'All',
          tagStr: [],
          haveImg: 0,
          order: 1
        },
        previewImageList: [],
        visiblePreviewImages: false,
        imagesIndex: 0
      };
    },
    created() {
      this.reviewsSortTypeList = [
        {
          label: this.$lang.newReviews.sortDefault,
          value: 1
        },
        {
          label: this.$lang.newReviews.sortLatest,
          value: 2
        }
      ];
      this.reviewsStarList = [
        { label: this.$lang.newReviews.allStar, value: 'All' },
      ];
    },
    beforeMount() {
      this.initReviews();
    },
    filters: {
      filterReplyTime(val, commentTime, text) {
        const replyDate = (Number(val) - Number(commentTime)) * 1000;
        const afterDays = Math.ceil(replyDate / 86400000);
        return text.replace('%@', afterDays > 180 ? 180 : afterDays);
      }
    },
    methods: {
      previewImages(list, index) {
        this.previewImageList = list;
        this.imagesIndex = index;
        this.togglePreviewImages();
      },
      togglePreviewImages() {
        this.visiblePreviewImages = !this.visiblePreviewImages;
      },
      /**
       * @Description: 请求评论数据
       * @date 2020/8/13
       */
      initReviews() {
        const spuId = this.spuId;
        // 查询评论信息
        this.$http.post('/api/new/reviews/getTag', {
          spu: spuId,
          lang: getCookie('language')
        }).then(res => {
          if (res.data) {
            const data = res.data;
            // 无评价隐藏模块
            if (!data.commentTotal && data.commentTotal == 0) {
              this.$emit('toggleReviewsComponent', false);
              return;
            } else {
              this.$emit('toggleReviewsComponent', true);
            }
            // 评论星级和数量
            if (data.starData) {
              for (const key in data.starData) {
                if (data.starData[key] != 0) {
                  data.starData['percent' + key] = ((data.starData[key] / data.commentTotal) * 100).toFixed(0);
                } else {
                  data.starData['percent' + key] = 0;
                }
              }
              this.reviewsStarList = [
                { label: `${this.$lang.newReviews.allStar}(${data.commentTotal || 0})`, value: 'All' },
                { label: `${this.$lang.newReviews.star1}(${data.starData.cnt1 || 0})`, value: '1' },
                { label: `${this.$lang.newReviews.star2}(${data.starData.cnt2 || 0})`, value: '2' },
                { label: `${this.$lang.newReviews.star3}(${data.starData.cnt3 || 0})`, value: '3' },
                { label: `${this.$lang.newReviews.star4}(${data.starData.cnt4 || 0})`, value: '4' },
                { label: `${this.$lang.newReviews.star5}(${data.starData.cnt5 || 0})`, value: '5' },
              ];
            }
            // 评论标签 排序积极在前面 消极在后面
            data.tags = data.tags && data.tags.filter(t => t.cnt > 0).sort((p, n) => p.tagAttr > n.tagAttr ? -1 : 1);
            this.productReviewsInfo.avg = data.avg;
            this.productReviewsInfo.starData = data.starData;
            this.productReviewsInfo.tags = data.tags;
          }
        });
        // 查询评论详情列表
        this.queryReviews('init');
      },
      // 勾选标签 搜索评论
      handleCheckedTag(id) {
        if (this.filterParams.tagStr.includes(id)) {
          const index = this.filterParams.tagStr.indexOf(id);
          this.filterParams.tagStr.splice(index, 1);
        } else {
          this.filterParams.tagStr.push(id);
        }
        this.filterParams.page = 1;
        this.queryReviews();
      },
      // 勾选有图搜索
      handleCheckedImg() {
        this.filterParams.haveImg = this.filterParams.haveImg === 1 ? 0 : 1;
        this.filterParams.platform = 'All';
        this.queryReviews();
      },
      // 条件搜索评论
      switchReviewsFilter(val, type) {
        this.filterParams.page = 1;
        this.queryReviews();
      },
      // 移动端切换排序
      handleSwitchTime(val) {
        this.filterParams.order = val;
        this.switchReviewsFilter();
      },
      // 评论查询
      queryReviews(type, callback) {
        const params = Object.assign({}, this.filterParams);
        params.platform = params.platform === 'All' ? '' : params.platform;
        params.star = params.star === 'All' ? '' : params.star;
        this.$http.post('/api/new/reviews/getList', {
          spuId: this.spuId,
          lang: getCookie('language'),
          ...params
        }).then(res => {
          if (res.data) {
            const data = res.data;
            this.productReviewsInfo.hasImgCount = Number(data.haveImg);
            this.productReviewsInfo.total = Number(data.total);
            data.comments && data.comments.forEach(item => {
              // 评论sku属性转JSON
              const sktAttrObj = JSON.parse(item.skuInfo);
              item.sktAttr = sktAttrObj && sktAttrObj[getCookie('language')];
              // 评论图片#分隔
              if (item.imgStr) {
                item.imgList = item.imgStr.split('#');
              }
              // 星级转数字类型
              item.star = Number(item.star);
              const countryItem = this.countryCurrency.find(country => country.webSiteCd == item.platform);
              const countryNameItem = countryItem.countryList.find(nameItem => nameItem.languageCode == this.$lang.langCode);
              item.countryIcon = countryItem.iconUrl;
              item.countryName = countryNameItem.countryName;
              // 用户追评
              item.userCommentReply = [];
              item.otherCommentReply = [];
              Array.isArray(item.commentReply) && item.commentReply.forEach(reply => {
                if (reply.userType == '1') {
                  item.userCommentReply.push(reply);
                } else {
                  item.otherCommentReply.push(reply);
                }
              });
            });
            this.productReviewsList = res.data.comments || [];
            // 首次初始化数据
            if (type === 'init') {
              // 站点评价数
              const reviewsCountry = [];
              data.marketCnt && data.marketCnt.forEach(item => {
                const countryItem = this.countryCurrency.find(country => country.webSiteCd == item.platform);
                const countryNameItem = countryItem.countryList.find(nameItem => nameItem.languageCode == this.$lang.langCode);
                reviewsCountry.push({
                  countryName: countryNameItem.countryName,
                  count: item.cnt,
                  platform: countryItem.webSiteCd,
                });
              });
              reviewsCountry.unshift({
                countryName: this.$lang.allCountries,
                count: data.total,
                platform: 'All',
              });
              this.reviewsCountry = reviewsCountry;
            } else {
              // 动态更新筛选条件数量
              if (data.marketCnt && data.marketCnt.length > 0) {
                this.reviewsCountry.forEach(item => {
                  const reviewsCountItem = data.marketCnt.find(market => market.platform === item.platform);
                  if (item.platform === 'All') {
                    item.count = data.total;
                  } else {
                    item.count = reviewsCountItem.cnt;
                  }
                });
              } else {
                this.reviewsCountry.forEach(item => {
                  item.count = 0;
                });
              }
              if (data.starCnt) {
                const total = Object.values(data.starCnt).reduce((p, n) => {
                  return (Number(p) || 0) + (Number(n) || 0);
                });
                this.reviewsStarList = [
                  { label: `${this.$lang.newReviews.allStar}(${total})`, value: 'All' },
                  { label: `${this.$lang.newReviews.star1}(${data.starCnt.cnt1 || 0})`, value: '1' },
                  { label: `${this.$lang.newReviews.star2}(${data.starCnt.cnt2 || 0})`, value: '2' },
                  { label: `${this.$lang.newReviews.star3}(${data.starCnt.cnt3 || 0})`, value: '3' },
                  { label: `${this.$lang.newReviews.star4}(${data.starCnt.cnt4 || 0})`, value: '4' },
                  { label: `${this.$lang.newReviews.star5}(${data.starCnt.cnt5 || 0})`, value: '5' },
                ];
              } else {
                this.reviewsStarList = [
                  { label: `${this.$lang.newReviews.allStar}(0)`, value: 'All' },
                  { label: `${this.$lang.newReviews.star1}(0)`, value: '1' },
                  { label: `${this.$lang.newReviews.star2}(0)`, value: '2' },
                  { label: `${this.$lang.newReviews.star3}(0)`, value: '3' },
                  { label: `${this.$lang.newReviews.star4}(0)`, value: '4' },
                  { label: `${this.$lang.newReviews.star5}(0)`, value: '5' },
                ];
              }
              if (data.tagCnt) {
                this.productReviewsInfo.tags.forEach(item => {
                  const tagCountItem = data.tagCnt.find(tag => tag.tagId == item.id);
                  if (tagCountItem) {
                    item.cnt = tagCountItem.cnt;
                  } else {
                    item.cnt = 0;
                  }
                });
              } else {
                this.productReviewsInfo.tags.forEach(item => {
                  item.cnt = 0;
                });
              }
            }
            if (callback && typeof callback === 'function') {
              callback(res);
            }
          }
        });
      },
      // 翻页
      changePage(val) {
        this.filterParams.page = val;
        this.queryReviews(null, () => {
          const scrollTop = jQuery('.reviews-nav').offset().top - 200;
          if (document.documentElement.scrollTop) {
            document.documentElement.scrollTop = scrollTop;
          } else if (window.pageYOffset) {
            window.pageYOffset = scrollTop;
          } else {
            document.body.scrollTop = scrollTop;
          }
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "~asset/scss/base.scss";
  @media only screen and (max-width: 1023px){
    .adaptive-select-box{
      position: relative;
      height: r(40);
      line-height: r(40);
      padding: 0 30px 0 15px;
      .width-block{
        font-size: r(13);
        color: transparent;
      }
      .el-select{
        position: absolute;
        z-index: 2;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .reviews-tag-list {
      display: flex;
      flex-wrap: wrap;
      .review-item {
        font-size: r(13);
        line-height: r(24);
        margin: 0 r(8) r(8) 0;
        padding: r(3) r(8);
        background-color: #FFEFEB;
        color: $mainColor;
        border-radius: r(30);
        cursor: pointer;
        >div{
          display: flex;
          align-items: center;
          .icon {
            flex-shrink: 0;
            width: r(12);
            height: r(12);
            margin-right: r(6);
            @include bg-image("icon-good");
          }
        }
        &.negative {
          background-color: #f5f5f5;
          color: rgba(0, 0, 0, 0.65);
          .icon {
            @include bg-image("bad");
          }
        }
        &.checked{
          color: #fff;
          background-color: $mainColor;
        }
      }
    }
    .new-reviews-wrap {
      padding: r(16) 0;
      background-color: #fff;
      .title {
        font-size: r(20);
        line-height: r(24);
        font-weight: 600;
        color: rgba(0, 0, 0, 0.85);
      }
      .reviews-header{
        padding: 0 r(16);
        margin-bottom: r(12);
        .goods-reviews-info{
          margin-top: r(14);
          .reviews-star{
            display: flex;
            justify-content: space-between;
            margin-bottom: r(24);
          }
          .reviews-star-info{
            width: r(130);
            .star-num{
              font-size: r(32);
              line-height: r(32);
              font-weight: bold;
              color: #FA8C16;
            }
            .reviews-icon{
              display: flex;
              align-items: center;
              margin-top: r(4);
            }
            .reviews-num{
              font-size: r(12);
              line-height: r(14);
              color: rgba(0, 0, 0, 0.45);
              margin-top: r(4);
            }
          }
          .reviews-star-rating{
            >li{
              display: flex;
              align-items: center;
              height: r(14);
              font-size: r(12);
              color: rgba(0, 0, 0, 0.65);
              .line{
                flex-shrink: 0;
                position: relative;
                width: r(120);
                height: r(6);
                margin: 0 r(8);
                border-radius: r(4);
                background-color: #EAEAEA;
                overflow: hidden;
                .line-bg{
                  position: absolute;
                  left: 0;
                  top: 0;
                  height: r(6);
                  border-radius: r(4);
                  background-color: #FA8C16;
                }
              }
              +li{
                margin-top: r(8);
              }
            }
          }
        }
      }
      .reviews-nav{
        .reviews-country{
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #F5F5F5;
          .reviews-select-country, .reviews-select-star{
            width: 100%;
          }
          .reviews-has-image{
            display: none;
          }
        }
        .reviews-filter-wrap{
          display: none;
        }
        /deep/ .el-select{
          .el-input__inner{
            border: none;
            background-color: transparent;
            font-size: r(13);
            height: r(40);
            line-height: r(40);
            color: rgba(0, 0, 0, 0.85);
          }
          .el-input__icon{
            line-height: r(32);
          }
          .el-icon-arrow-up{
            color: #666;
          }
        }
        .reviews-filter-mobile{
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: r(10) r(16) 0;
          padding-bottom: r(10);
          border-bottom: r(1) solid #EAEAEA;
          .filter-tag-list{
            flex-shrink: 0;
            .filter-tag{
              height: r(22);
              line-height: r(22);
              padding: 0 r(8);
              font-size: r(14);
              color: rgba(0, 0, 0, 0.85);
              border-radius: r(16);
              border: r(1) solid #979797;
              &.active{
                border-color: $mainColor;
                background-color: $mainColor;
                color: #fff;
              }
            }
          }
          .filter-time{
            display: flex;
            font-size: r(13);
            color: rgba(0, 0, 0, 0.65);
            line-height: r(18);
            >span{
              &.active{
                color: $mainColor;
              }
              &:first-child{
                text-align: right;
                border-right: r(1) solid #D8D8D8;
                padding-right: r(8);
                margin-right: r(8);
              }
            }
          }
        }
      }
      .reviews-detail-list{
        padding: 0 r(16);
        .reviews-detail-item{
          padding: r(16) 0;
          border-bottom: r(1) solid #EAEAEA;
          .user-info{
            display: flex;
            justify-content: space-between;
            margin-bottom: r(10);
            .name{
              font-size: r(13);
              line-height: r(18);
              color: rgba(0, 0, 0, 0.85);
            }
            .platform{
              display: flex;
              align-items: center;
              font-size: r(12);
              color: #969799;
              img{
                width: r(12);
                height: r(12);
                margin-right: r(6);
              }
            }
          }
          .reviews-content{
            .star-time{
              display: flex;
              justify-content: space-between;
              /deep/ .el-rate{
                display: inline-block;
                .el-rate__icon{
                  font-size: r(14);
                }
              }
              .attr{
                display: none;
              }
              .time{
                font-size: r(12);
                line-height: r(17);
                color: #969799;
              }
            }
            .content{
              font-size: r(14);
              color: #323233;
              line-height: r(20);
              margin-top: r(8);
              word-break: break-word;
            }
            .reviews-tag-list{
              margin-top: r(12);
            }
            .reviews-image-list{
              display: flex;
              flex-wrap: wrap;
              margin-top: r(12);
              >li{
                display: flex;
                align-items: center;
                justify-content: center;
                width: r(100);
                height: r(100);
                margin-bottom: r(4);
                margin-right: r(4);
                border: 1px solid #eaeaea;
                img{
                  display: block;
                  max-width: 100%;
                  max-height: 100%;
                }
              }
            }
            .user-reply-list {
              margin-top: r(12);
              .user-reply-item {
                font-size: r(14);
                color: #333;
                line-height: r(20);
                word-break: break-word;
                +.user-reply-item {
                  margin-top: r(8);
                }
                >span:first-child {
                  color: #FA8C16;
                }
              }
            }
            .reviews-reply {
              margin-top: r(8);
              padding: r(14);
              background: #F5F5F5;
              .reply-item {
                display: flex;
                align-items: center;
                font-size: r(14);
                color: #333333;
                line-height: r(20);
                +.reply-item {
                  margin-top: r(10);
                }
              }
              .reply-box {
                color: #666;
                word-break: break-word;
                [class^="icon-"] {
                  display: inline-block;
                  width: r(16);
                  height: r(16);
                  vertical-align: r(-3);
                }
                .icon-store {
                  @include bg-image('icon-store');
                }
                .icon-platform {
                  background-image: url('~asset/images/wap/icon-platform.png');
                  background-size: 100% 100%;
                }
                >span {
                  color: #333;
                  margin-right: r(6);
                }
                &.reply-platform {
                  >span {
                    color: #FA8C16;
                  }
                }
              }
            }
          }
        }
      }
      .pagination-wrap{
        text-align: center;
        padding-top: r(32);
        border-top: 1px solid #eaeaea;
        /deep/ .el-pagination{
          .btn-prev, .btn-next, .el-pager li{
            font-size: r(13);
            font-weight: 400;
            width: r(32);
            min-width: r(32);
            height: r(32);
            line-height: r(32);
            border-radius: 50%;
            .el-icon{
              font-size: r(18);
            }
          }
        }
      }
    }
  }
  @media only screen and (min-width: 1024px){
    /deep/ .el-rate__icon{
      font-size: 16px;
      margin-right: 0;
    }
    .adaptive-select-box{
      position: relative;
      min-width: 80px;
      height: 40px;
      line-height: 40px;
      padding: 0 30px 0 15px;
      .width-block{
        font-size: 14px;
        color: transparent;
      }
      .el-select{
        position: absolute;
        z-index: 2;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .reviews-tag-list {
      display: flex;
      flex-wrap: wrap;
      .review-item {
        font-size: 13px;
        line-height: 22px;
        margin: 0 8px 8px 0;
        padding: 3px 8px;
        background-color: #FFEFEB;
        color: $mainColor;
        border-radius: 30px;
        border: 1px solid transparent;
        >div{
          display: flex;
          align-items: center;
          .icon {
            flex-shrink: 0;
            width: 12px;
            height: 12px;
            margin-right: 6px;
            @include bg-image("icon-good");
          }
        }
        &.negative {
          background-color: #f5f5f5;
          color: rgba(0, 0, 0, 0.65);
          .icon {
            @include bg-image("bad");
          }
        }
        &.checked{
          color: #fff;
          background-color: $mainColor;
        }
      }
    }
    .new-reviews-wrap {
      .title {
        font-size: 20px;
        line-height: 24px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.85);
      }
      .reviews-header{
        margin-bottom: 16px;
        .goods-reviews-info{
          display: flex;
          margin-top: 16px;
          .reviews-star{
            display: flex;
            margin-right: 40px;
          }
          .reviews-star-info{
            width: 150px;
            .star-num{
              font-size: 32px;
              font-weight: bold;
              color: #FA8C16;
              line-height: 32px;
            }
            .reviews-icon{
              display: flex;
              align-items: center;
              margin-top: 4px;
            }
            .reviews-num{
              font-size: 12px;
              line-height: 14px;
              color: rgba(0, 0, 0, 0.45);
              margin-top: 4px;
            }
          }
          .reviews-star-rating{
            >li{
              display: flex;
              align-items: center;
              height: 14px;
              font-size: 12px;
              color: rgba(0, 0, 0, 0.65);
              .label{
                width: 70px;
                &:first-child{
                  text-align: right;
                }
              }
              .line{
                position: relative;
                width: 120px;
                height: 6px;
                margin: 0 8px;
                border-radius: 4px;
                background-color: #EAEAEA;
                overflow: hidden;
                .line-bg{
                  position: absolute;
                  left: 0;
                  top: 0;
                  height: 6px;
                  border-radius: 4px;
                  background-color: #FA8C16;
                }
              }
              +li{
                margin-top: 10px;
              }
            }
          }
          .reviews-tag-list{
            .review-item{
              cursor: pointer;
              &:hover{
                border-color: $mainColor;
              }
            }
          }
        }
      }
      .reviews-nav{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #F5F5F5;
        .reviews-country{
          display: flex;
          align-items: center;
          .reviews-select-country, .reviews-select-star{
            width: 100%;
          }
          .reviews-has-image{
            display: flex;
            align-items: center;
            height: 22px;
            padding: 0 8px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.85);
            border-radius: 16px;
            border: 1px solid #979797;
            margin-left: 40px;
            cursor: pointer;
            &.active{
              border-color: $mainColor;
              background-color: $mainColor;
              color: #fff;
            }
            &:not(.active):hover{
              color: $mainColor;
              border-color: $mainColor;
            }
          }
        }
        .reviews-filter-wrap{
          display: flex;
          flex-shrink: 0;
          .reviews-select-sort{
            /deep/.el-input__inner{
              text-align: right;
            }
          }
        }
        /deep/ .el-select{
          .el-input__inner{
            color: rgba(0, 0, 0, 0.85);
            border: none;
            background-color: transparent;
          }
          .el-icon-arrow-up{
            color: #666;
          }
        }
        .reviews-filter-mobile{
          display: none;
        }
      }
      .reviews-detail-list{
        .reviews-detail-item{
          display: flex;
          padding: 16px 0;
          border-bottom: 1px solid #EAEAEA;
          &:last-child{
            border: none;
          }
          .user-info{
            flex-shrink: 0;
            width: 120px;
            padding: 0 16px;
            .name{
              font-size: 14px;
              line-height: 20px;
              color: rgba(0, 0, 0, 0.85);
              @include multipleEllipsis(1);
              word-break: break-word;
            }
            .platform{
              margin-top: 8px;
              display: flex;
              align-items: center;
              font-size: 12px;
              color: #969799;
              img{
                width: 12px;
                height: 12px;
                margin-right: 6px;
              }
            }
          }
          .reviews-content{
            flex: 1;
            padding-right: 16px;
            .star-time{
              line-height: 17px;
              /deep/ .el-rate{
                display: inline-block;
                vertical-align: middle;
                margin-right: 80px;
                .el-rate__icon{
                  font-size: 14px;
                }
              }
              .attr, .time{
                font-size: 12px;
                line-height: 17px;
                color: #969799;
              }
              .time{
                float: right;
              }
            }
            .content{
              font-size: 14px;
              color: #323233;
              line-height: 20px;
              margin-top: 8px;
              word-break: break-word;
            }
            .reviews-tag-list{
              margin-top: 16px;
            }
            .reviews-image-list{
              display: flex;
              flex-wrap: wrap;
              margin-top: 16px;
              >li{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 80px;
                height: 80px;
                margin-bottom: 8px;
                margin-right: 8px;
                cursor: pointer;
                border: 1px solid #eaeaea;
                img{
                  display: block;
                  max-width: 100%;
                  max-height: 100%;
                }
              }
            }
            .user-reply-list {
              margin-top: 16px;
              .user-reply-item {
                font-size: 14px;
                color: #333;
                line-height: 20px;
                word-break: break-word;
                +.user-reply-item {
                  margin-top: 8px;
                }
                >span:first-child {
                  color: #FA8C16;
                }
              }
            }
            .reviews-reply {
              margin-top: 8px;
              padding: 16px;
              background: #F5F5F5;
              .reply-item {
                display: flex;
                font-size: 14px;
                color: #333333;
                line-height: 20px;
                +.reply-item {
                  margin-top: 10px;
                }
              }
              .reply-box {
                color: #666;
                word-break: break-word;
                [class^="icon-"] {
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                  vertical-align: sub;
                }
                .icon-store {
                  @include bg-image('icon-store');
                }
                .icon-platform {
                  background-image: url('~asset/images/wap/icon-platform.png');
                  background-size: 100% 100%;
                }
                >span {
                  color: #333;
                  margin-right: 6px;
                }
                &.reply-platform {
                  >span {
                    color: #FA8C16;
                  }
                }
              }
            }
          }
        }
      }
      .pagination-wrap{
        text-align: center;
        padding-top: 32px;
        border-top: 1px solid #eaeaea;
        /deep/ .el-pagination{
          .btn-prev, .btn-next, .el-pager li{
            font-size: 13px;
            font-weight: 400;
            width: 36px;
            height: 36px;
            line-height: 36px;
            border-radius: 50%;
            .el-icon{
              font-size: 18px;
            }
          }
        }
      }
    }
  }
</style>