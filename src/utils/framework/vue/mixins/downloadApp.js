export default {
  data() {
    return {
      userAgent: 'web',
      countryId: '',
    };
  },
  created() {
    this.countryId = this.$root.countryId;
    this.userAgent = this.$root.userAgent;
  },
  computed: {
    iosLink() {
      return this.countryId == 1
        ? "https://itunes.apple.com/cn/app/gshopper/id1410564282?ls=1&mt=8"
        : "https://itunes.apple.com/us/app/gshopper/id1410564282?ls=1&mt=8";
    },
    androidLink() {
      return this.countryId == 1
        ? "http://erp.gshopper.com/index.php?g=universal&m=appDownload&a=download&id=38"
        : "https://play.google.com/store/apps/details?id=com.gshopper.gapp";
    }
  },
  methods: {
    downloadApp() {
      const userAgent = this.userAgent;
      switch (userAgent) {
        case 'ios': {
          location.href = this.iosLink;
          break;
        }
        case 'android': {
          location.href = this.androidLink;
          break;
        }
        default: {
          break;
        }
      }
    },
  },
}