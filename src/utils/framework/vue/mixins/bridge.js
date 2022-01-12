
export default {
  data() {
    return {
      fromDevice: 'web', // 设备来源
      wechatAppConnect: false, // 微信连接状态
    }
  },
  created() {
    if (EASY_ENV_IS_BROWSER) {
      switch (this.fromDevice) {
        // 初始化Bridge
        case 'android': {
          window.WebViewJavascriptBridge.init();
          break;
        }
        // 判断微信小程序连接
        case 'wechatApp': {
          // Native
          // wx.miniProgram.getEnv((res) => { 
          //   this.wechatAppConnect = res.miniprogram; 
          // });
          // uniapp
          document.addEventListener("UniAppJSBridgeReady", () => {
            this.wechatAppConnect = true;
          });
          break;
        }
        default: {
          break;
        }
      }
    }
  },
  computed: {
    // 是否需要JSBridge
    needBridge() {
      return this.fromDevice === 'android';
    },
    // 是否需要weixinJS
    needWechatSDK() {
      return this.fromDevice === 'wechatApp';
    },
  },
  methods: {
    // app事件触发
    appHandle(eventName, params = {}) {
      if (!eventName) {
        console.error('事件名称必填');
        return;
      };
      return new Promise((reslove) => {
        const fromDevice = this.fromDevice;
        this.setupWebViewJavascriptBridge(fromDevice, function(bridge) {
          bridge.callHandler(eventName, params, function responseCallback(responseData) {
            reslove(responseData);
            this.setState(state => ({
              callbackResult: responseData
            }));
          });
        });
      })
    },
    // 微信小程序事件触发
    wechatAppHandle(eventName, params = {}) {
      if (this.fromDevice !== 'wechatApp') return;
      if (!this.wechatAppConnect || !eventName) return;
      wx.miniProgram[eventName](params);
    },
    // uniapp小程序发送事件
    uniappHandle(eventName, params = {}) {
      if (this.fromDevice !== 'wechatApp') return;
      if (!this.wechatAppConnect || !eventName) return;
      uni[eventName](params);
    },
    // APP注册连接桥
    setupWebViewJavascriptBridge(type, callback) {
      switch(type) {
        case 'android': {
          return callback(window.WebViewJavascriptBridge);
        }
        case 'ios': {
          if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
          if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
          window.WVJBCallbacks = [callback];
          var WVJBIframe = document.createElement('iframe');
          WVJBIframe.style.display = 'none';
          WVJBIframe.src = 'https://__bridge_loaded__';
          document.documentElement.appendChild(WVJBIframe);
          setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
          break;
        }
        default: {
          break;
        }
      }
    },
  },
}