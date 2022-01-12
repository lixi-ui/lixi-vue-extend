import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default function createStore(state) {
  return new Vuex.Store({
    state: {
      count: 0,
      countryInfo: null,
      mobileMenuShow: false,
      wishList: [],
      localWishList: [],
      discountText: {},
      fromDeviceType: 'web',  // 设备来源, web, Android, ios
      visibleTopBanner: false, // 顶部banner
      topBanner: {}, // 顶部banner数据
      appSchema: '',
      unreadTotalNum: 0, // 站内信未读总数
      messageTotalData: {}, // 消息中心未读数据
      appFirstOrderDiscount: null, // app首单折扣
      ...state,
      categoryList: [],
    },
    getters: {
      getCount(state) {
        return state.count;
      },
      getCountryInfo(state) {
        return state.countryInfo;
      },
      getMobileMenuShow(state) {
        return state.mobileMenuShow;
      },
      wishList(state) {
        return state.wishList;
      },
      localWishList(state) {
        return state.localWishList;
      },
      discountText(state) {
        return state.discountText;
      },
      fromDeviceType: state => state.fromDeviceType,
      visibleTopBanner: state => state.visibleTopBanner,
      topBanner: state => state.topBanner,
      appSchema: state => state.appSchema,
      getUnreadNum: state => {
        const count = Object.values(state.messageTotalData).reduce((p, n) => {
          return p + n;
        }, 0);
        return count > 99 ? '99+' : count;
      },
      messageTotalData: state => state.messageTotalData,
      appFirstOrderDiscount: state => state.appFirstOrderDiscount,
      userInfo: state => state.userInfo || null,
      categoryList: state => state.categoryList,
    },
    mutations: {
      increment(state, num) {
        state.count = num;
      },
      countryInfo(state, info) {
        state.countryInfo = info;
      },
      mobileMenuShow(state, status) {
        state.mobileMenuShow = status;
      },
      wishList(state, list) {
        state.wishList = list;
      },
      localWishList(state, list) {
        state.localWishList = list;
      },
      discountText(state, text) {
        state.discountText = text;
      },
      setFromDeviceType(state, fromDeviceType) {
        state.fromDeviceType = fromDeviceType;
      },
      setVisibleTopBanner(state, visibleTopBanner) {
        state.visibleTopBanner = visibleTopBanner;
      },
      setTopBanner(state, topBanner) {
        state.topBanner = topBanner;
      },
      setAppSchema(state, schema) {
        state.appSchema = schema;
      },
      messageTotalData(state, data) {
        state.messageTotalData = data;
      },
      appFirstOrderDiscount(state, data) {
        state.appFirstOrderDiscount = data;
      },
      setCategoryList(state, data = []) {
        state.categoryList = data;
      }
    },
    actions: {
      increment(context, num) {
        context.commit('increment', num);
      },
      setCountryInfo(context, info) {
        context.commit('countryInfo', info);
      },
      setMobileMenuShow(context, status) {
        context.commit('mobileMenuShow', status);
      },
      setWishList(context, list) {
        context.commit('wishList', list);
      },
      setLocalWishList(context, list) {
        context.commit('localWishList', list);
      },
      setDiscountText(context, text) {
        context.commit('discountText', text);
      },
      setMessageTotalData(context, data = {}) {
        context.commit('messageTotalData', data);
      },
    }
  });
};
// Vue.prototype.$store = store;