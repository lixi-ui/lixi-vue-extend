<template>
  <div class="tooltips-component" v-if="visibleEuropeWarranty">
    <div class="tooltips-box" @click="showPopup">
      <ul class="tooltips-list">
        <!--<li class="tooltips-item hover-animation">
          <i class="icon-warranty"></i>
          <span>{{ $lang.warrantyLabel }}</span>
          <div class="pop-wrap">
            <span>{{ $lang.warrantyDetailTips }}</span>
            <a :href="`https://www.gshopper.com/${$root.COOKIE_COUNTRY}/article/detail/help?catId=15`" target="_blank">{{ $lang.viewDetails }}</a>
            <div class="tips-triangle"><span></span></div>
          </div>
        </li>-->
        <li class="tooltips-item hover-animation">
          <i class="icon-tax"></i>
          <span>税务标签</span>
          <div class="pop-wrap">
            <span>税务内容</span>
            <div class="tips-triangle"><span></span></div>
          </div>
        </li>
        <li class="tooltips-item hover-animation">
          <i class="icon-payment"></i>
          <span>安全支付</span>
          <div class="pop-wrap">
            <i class="service-payment"></i>
            <div class="tips-triangle"><span></span></div>
          </div>
        </li>
      </ul>
      <i class="el-icon-arrow-right"></i>
    </div>
    <van-popup class="tooltips-popup" v-model="visiblePopup" :overlay="visiblePopup && isMobile" position="bottom">
      <div class="tooltips-popup-content" v-show="visiblePopup">
        <h2>服务标题</h2>
        <ul class="service-list">
          <!--<li>
            <h3>{{ $lang.warrantyLabel }}</h3>
            <p>
              <span>{{ $lang.warrantyDetailTips }}</span>
              <a :href="`https://www.gshopper.com/${$root.COOKIE_COUNTRY}/article/detail/help?catId=15`" target="_blank">{{ $lang.viewDetails }}</a>
            </p>
          </li>-->
          <li>
            <h3>税务标签</h3>
            <p>
              <span>税务内容</span>
            </p>
          </li>
          <li>
            <h3>安全支付</h3>
            <p>
              <!-- <img src="~asset/images/wap/icon-service-payment@2x.png" alt=""> -->
            </p>
          </li>
        </ul>
        <i class="el-icon-close" @click.stop="visiblePopup = false"></i>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import { getCookie } from 'g-ui/src/utils/framework/utils/utils';
  import { Popup } from 'vant'
  export default {
    name: 'g-europe-warranty',
    components: {
      vanPopup: Popup
    },
    data() {
      return {
        visibleEuropeWarranty: false,
        visiblePopup: false
      };
    },
    computed: {
      isMobile() {
        return false;
      }
    },
    mounted() {
      const countryId = getCookie('countryId');
      // this.visibleEuropeWarranty = ['47', '236', '102', '105', '131', '219', '227', '277'].includes(countryId);
      this.visibleEuropeWarranty = true;
    },
    methods: {
      showPopup() {
        if (this.isMobile) {
          this.visiblePopup = true;
        }
      },
    }
  };
</script>
