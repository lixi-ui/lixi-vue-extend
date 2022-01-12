import {
  getCookie,
  delCookie,
  qsToobj,
  addAsyncJavaScript
} from 'framework/utils/utils';
export default {
  data() {
    return {
      googleAuth: null,
      googleParams: {
        client_id: '750761285953-favf5091s5t1tcf0jsitpb35eeg51kki.apps.googleusercontent.com'
      },
      loginLoading: false,
    };
  },
  beforeMount() {
    this.initTwitter();
  },
  mounted() {
    const countryId = getCookie('countryId');
    // 根据国家地区判断是否加载facebook和谷歌的脚本
    if (Number(countryId) !== 1) {
      this.initFacebook();
      this.initGoogle();
    }
  },
  methods: {
    initTwitter() {
      this.hello = require('asset/js/hello.all.js');
      this.hello.init({
        twitter: 'MAB9uhm8ap1TAZwixZ4l6X9zG',
      }, {
        scope: 'email',
      });
    },
    initFacebook() {
      addAsyncJavaScript('https://ws.izenecdn.com/st/website/sdk.js', {}, () => {
        console.log('FB', FB);
        FB.init({
          appId: '311113613141286',
          cookie: true,
          xfbml: true,
          version: 'v2.4'
        });
      });
    },
    initGoogle() {
      addAsyncJavaScript('https://apis.google.com/js/platform.js?onload=onGapiLoad', {
        id: 'auth2_script_id'
      }, () => {
        window.gapi.load('auth2', () => {
          try {
            this.googleAuth = window.gapi.auth2.init(
              Object.assign({}, this.googleParams)
            );
            // window.gapi.signin2.render('googleLogin');
          } catch (err) {
            reject({ err: 'client_id missing or is incorrect, or if you added extra params maybe they are written incorrectly, did you add it to the component or plugin?' });
          }
        });
      });
    },
    redirectOriginal() {
      const redirectURL = qsToobj().redirectURL;
      const lastUrl = redirectURL || getCookie('lastUrl') || localStorage.getItem('lastUrl');
      if (lastUrl) {
        delCookie('lastUrl');
        localStorage.removeItem('lastUrl');
        window.location.href = lastUrl;
      } else {
        window.location.href = `/${this.$root.COOKIE_COUNTRY}`;
      }
    },
    twitterLogin() {
      this.hello('twitter').login('', {
        force: true,
        redirect_uri: location.origin + '/login'
      });
      this.hello.on('auth.login', (res) => {
        if (res.authResponse) {
          this.loginLoading = true;
          this.$http.post('/api/third/login/twitter', {
            access_token: res.authResponse.access_token.split(':')[0],
            secret_token: res.authResponse.oauth_token_secret,
            clientType: this.deviceType ? 'N002430300' : 'N002430200'
          }).then(res => {
            if (res.code == '2000') {
              this.redirectOriginal();
            } else {
              this.loginLoading = false;
            }
          }).catch(err => {
            console.log('twitter', err);
            this.loginLoading = false;
          });
        }
      });
    },
    fbLogin() {
      FB.login(res => {
        if (res.status === 'connected') {
          this.loginLoading = true;
          this.$http.post('/api/third/login/facebook', {
            access_token: res.authResponse.accessToken,
            clientType: this.deviceType ? 'N002430300' : 'N002430200',
          }).then(res => {
            if (res.code == '2000') {
              this.redirectOriginal();
            } else {
              this.loginLoading = false;
            }
          }).catch(err => {
            console.log('fb', err);
            this.loginLoading = false;
          });
        }
      }, { scope: 'email' });
    },
    googleLogin() {
      console.log('login');
      this.googleAuth.signIn().then(res => {
        return this.onGoogleSuccessSignIn(res);
      }).catch(err => {
        return this.onGoogleLoginFail(err);
      });
    },
    onGoogleSuccessSignIn(user) {
      this.loginLoading = true;
      let token;
      for (const key in user) {
        if (user[key].hasOwnProperty('access_token')) {
          token = user[key].access_token;
          break;
        }
      }
      this.$http.post('/api/third/login/google', {
        access_token: token,
        clientType: this.deviceType ? 'N002430300' : 'N002430200',
      }).then(res => {
        if (res.code == '2000') {
          this.redirectOriginal();
        } else {
          this.loginLoading = false;
        }
      }).catch(err => {
        console.log('google', err);
        this.loginLoading = false;
      });
    },
    onGoogleLoginFail(err) {
      console.log(err);
    },
  },
  computed: {
    wechatLoginHref() {
      const redirectUrl = process.env.NODE_ENV === 'production' ? 'https://www.gshopper.com' : 'http://prod.gshopper.com';
      return `https://open.weixin.qq.com/connect/qrconnect?appid=wx3e3deb2caad19869&redirect_uri=${redirectUrl}/api/third/login/wechat&response_type=code&scope=snsapi_login&state=123456#wechat_redirect`;
    },
  }
};