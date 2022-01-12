/*
import { debounce } from 'framework/utils/utils';
const isMobile = {
  data() {
    return {
      clientWidth: 0,
      clientHeight: 0
    };
  },
  computed: {
    isMobile() {
      return this.clientWidth < 1024;
    }
  },
  created() {
    this.$watch('clientWidth', debounce((newVal) => {
      this.clientWidth = newVal;
    }, 500));
    if (EASY_ENV_IS_BROWSER) {
      this.clientWidth = window.innerWidth;
      this.clientHeight = window.innerHeight;
    }
  },
  beforeMount() {
    const that = this;
    window.onresize = function() {
      if (EASY_ENV_IS_BROWSER) {
        const clientWidth = window.innerWidth;
        const clientHeight = window.innerHeight;
        that.clientWidth = clientWidth;
        that.clientHeight = clientHeight;
      }
    };
  },
};
export default isMobile;
*/
