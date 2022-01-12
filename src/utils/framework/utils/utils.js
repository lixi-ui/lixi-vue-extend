// 获取cookie、
export function getCookie(name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()
      .split(';')
      .shift());
  }
}

// 设置cookie,增加到vue实例方便全局调用
export function setCookie(c_name, value, expiredays = 420, domain) {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  domain = domain ? '; domain=' + domain : '';
  document.cookie = c_name + '=' + encodeURIComponent(value) + ((expiredays == null) ? '' : '; expires=' + exdate.toGMTString()) + '; path=/' + domain;
}

// 删除cookie
export function delCookie(name, domain) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(name);
  domain = domain ? '; domain=' + domain : '';
  if (cval != null) {
    document.cookie = name + '=' + cval + '; path=/;expires=' + exp.toGMTString() + domain;
  }
}

// 5442 1796 1969 0834
// 效验卡类型
export function checkCardType(number) {
  const cards = {
    electron: /^(4026|417500|4405|4508|4844|4913|4917)d+$/,
    maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)d+$/,
    dankort: /^(5019)d+$/,
    interpayment: /^(636)d+$/,
    unionpay: /^(62|88)\d+$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35d{3})d{11}$/,
  };
  for (const card in cards) {
    if (cards[card].test(number)) {
      return card;
    }
  }
}

/** 数组根据数组对象中的某个属性值进行排序的方法
 * 使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
 * @param attr 排序的属性 如number属性
 * @param rev true表示升序排列，false降序排序
 * */
export function sortBy(attr, rev) {
  // 第二个参数没有传递 默认升序排列
  if (rev === undefined) {
    rev = 1;
  } else {
    rev = (rev) ? 1 : -1;
  }

  return function(a, b) {
    a = Number(a[attr]);
    b = Number(b[attr]);
    if (a < b) {
      return rev * -1;
    }
    if (a > b) {
      return rev * 1;
    }
    return 0;
  };
}

/**
 * 字符串去除空格以及特殊字符
 *
 * */
export function filterStr(str) {
  return String.prototype.replace.call(str, /[,`~!@#$%^&*:;+'><|.\\ \/=]+/g, '-');
}

/**
 * 字符串去除空格
 *
 * */
export function removeAllSpace(str) {
  return String.prototype.replace.call(str, (/\s+/g, ''));
}
/**
 * @Description: 截取字符
 * @date 2020/2/17
 * @param length
*/
export function limitSubStr(str, length) {
  return String.prototype.substr.call(str, 0, length);
}


export const urlParse = (url = location.href) => {
  const reg = /[?&]([^#&?]+)=([^#&\?=]+)/g;
  const obj = {};
  url.replace(reg, (group, catch1, catch2, index, str) => {
    obj[catch1] = catch2;
  });
  return obj;
};

/** *
 * @param func 输入完成的回调函数
 * @param delay 延迟时间
 */
export function debounce(func, delay) {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function searchDebounce(func, delay) {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function throttle(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}

export function setStatistics(obj) {
  if (obj.site) {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'data-mps');
    meta.setAttribute('content', obj.site);
    const firstMeta = document.querySelector('meta');
    firstMeta.parentNode.insertBefore(meta, firstMeta);
  }
  if (obj.page) {
    const body = document.querySelector('body');
    body.setAttribute('data-mps', obj.page);
  }
}
const evil = (fn) => {
  const Fn = Function; // 一个变量指向Function，防止有些前端编译工具报错
  return new Fn('return ' + fn)();
};

export const ChangeParam = (name, value, url = location.href) => {
  let newUrl = '';
  const reg = new RegExp('(^|)' + name + '=([^&]*)(|$)');
  const tmp = name + '=' + value;
  if (url.match(reg) != null) {
    newUrl = url.replace(evil(reg), tmp);
  } else {
    if (url.match('[\?]')) {
      newUrl = url + '&' + tmp;
    } else {
      newUrl = url + '?' + tmp;
    }
  }
  return newUrl;
};

export const getQueryString = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);

  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

export const objToqs = (obj) => {
  if (!obj && !Object.keys(obj).length) {
    return '';
  } else {
    const arr = [];
    for (const key in obj) {
      if (obj[key]) {
        arr.push(key + '=' + encodeURIComponent(obj[key]));
      }
    }
    return arr.join('&');
  }
};

export const qsToobj = (url = location.href) => {
  const qs = url.split('?')[1];
  let arr = [];
  const res = {};
  if (!qs) {
    return {};
  } else {
    arr = qs.split('&');
    for (let i = 0, len = arr.length; i < len; i++) {
      const key = arr[i].split('=')[0];
      const val = arr[i].split('=')[1];
      res[key] = decodeURIComponent(val);
    }
  }
  return res;
};

// 定义检测数据类型的功能函数
function checkedType(target) {
  return Object.prototype.toString.call(target).slice(8, -1);
}
// 实现深度克隆---对象/数组
export const clone = (target) => {
  // 判断拷贝的数据类型
  // 初始化变量result 成为最终克隆的数据
  let result = null;
  const targetType = checkedType(target);
  if (targetType === 'Object') {
    result = {};
  } else if (targetType === 'Array') {
    result = [];
  } else {
    return target;
  }
  // 遍历目标数据
  for (const i in target) {
    // 获取遍历数据结构的每一项值。
    const value = target[i];
    // 判断目标结构里的每一值是否存在对象/数组
    if (checkedType(value) === 'Object' ||
      checkedType(value) === 'Array') { // 对象/数组里嵌套了对象/数组
      // 继续遍历获取到value值
      result[i] = clone(value);
    } else { // 获取到value值是基本的数据类型或者是函数。
      result[i] = value;
    }
  }
  return result;
};

// 判断值或者对象或者数组不为空
export const validValue = (param) => {
  if (!param && param !== 0) {
    return false;
  }
  if (param === 'undefined' || param === 'null') {
    return false;
  }
  if (JSON.stringify(param) === '{}') {
    return false;
  }
  return true;
};

// 获取设备类型
export const deviceWeb = () => {
  const ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isIos = /(iPhone|iPod|ios|iPad)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian;
  return isPc;
};

// 添加异步脚本
export const addAsyncJavaScript = (src, options = {}, callback) => {
  const element = document.createElement('script');
  element.src = src;
  element.async = true;
  for (const key in options) {
    if (options.hasOwnProperty(key)) {
      element.setAttribute(key, options[key]);
    }
  }
  document.head.appendChild(element);
  element.onload = element.onreadystatechange = function() {
    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      callback && callback();
    }
  };
};

// 筛选语言对象 无当前语言返回英语
export const filterLanguageItem = (list, langCode, languageField = 'language') => {
  const currentLanguageObj = list.find(item => item[languageField] === langCode);
  if (currentLanguageObj) {
    return currentLanguageObj;
  } else {
    return list.find(item => item[languageField] === 'N000920200');
  }
};

// 复制文本
export const copyContent = (content) => {
  return new Promise((resolve, reject) => {
    const textarea = document.createElement('textarea');
    textarea.value = content;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.zIndex = '-1';
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    try {
      document.execCommand('copy');
      resolve();
      document.body.removeChild(textarea);
    } catch (err) {
      reject(err);
    }
  });
};

// 判断地址特殊符号并进行替换
export function addressFilterStr(str) {
  const reg = /[`~!@#$%^&*()_\\+=<>?:"{}|,;\[\]·！￥…（）—《》？：“”【】、；‘，。]+/g;
  return String.prototype.replace.call(str, reg, '');
}

/** 2021/6/7
 * @Author: show
 * @Description: 根据不同货币进行格式化 exp: 2200.00 => CNY 2,200.00 EUR 2.200,00
 */
export function currencyPriceReplace(price, currency) {
  if (!price || !currency) return '';
  const cuy = String.prototype.toLowerCase.call(currency);
  const isEurope = ['eur', '€', 'dkk', 'kr', 'sek', 'ron', 'huf', 'ft', 'lei', 'zł', '₽', 'r$', 'грн'].includes(cuy);
  let newP = isEurope ? price.toString().replace(/\./, ',') : price;
  let tag = ',';
  if (isEurope) {
    tag = '.'
  }
  if (cuy === 'грн') {
    tag = ' ';
  }
  newP = newP.replace(/\d+/, function(n) {
    return n.replace(/(\d)(?=(\d{3})+$)/g, function($1) {
      return $1 + tag;
    });
  });
  return newP;
}

/** 2021/6/7
 * @Author: show
 * @Description: 根据不同货币进行 价格和单位调整
 */
export function currencyPriceSort(price, currency) {
  if (!price || !currency) return '';
  const cuy = String.prototype.toLowerCase.call(currency);
  const isReserve = ['ft', 'kr', 'lei', 'zł', '₽', 'грн'].includes(cuy);
  return isReserve ? `${price} ${currency}` : `${currency}${price}`;
}

// 千分位数字转换
export function moneyFormat(val, currency) {
  if (val === '' || val === null || val === undefined) return '';
  if (typeof val === 'string') {
    val = Number(val);
  }
  let price = null;
  if (currency === 'KRW' || currency === '₩') {
    price = val.toFixed(0);
  } else {
    price = val.toFixed(2);
  }
  price = currencyPriceReplace(price, currency);
  price = currencyPriceSort(price, currency);
  return price;
}

// 切换站点
export function selectPlatform(val) {
  const country = getCookie('countryCode');
  const queryParams = {
    ...qsToobj()
  };
  let queryString = '';
  if (Object.keys(queryParams).length > 0) {
    if (queryParams.currentPage) {
      queryParams.currentPage = 1;
    }
    queryString = '?' + objToqs(queryParams);
  }
  setCookie('countryId', val.countryId);
  setCookie('countryCode', val.countryCode);
  setCookie('currency', val.currencyCode);
  setCookie('webSiteCode', val.webSiteCd);
  setCookie('language', val.defaultLanguage);
  localStorage.setItem('language', val.countryCode);
  // const startPath = location.pathname.substr(0, 3);
  // if (startPath === `/${country}`) {
  if (/^\/\w{2}($|\/)/.test(location.pathname)) {
    location.href = `/${val.countryCode}${location.pathname.substr(3)}${location.search}`;
  } else {
    const pathname = location.pathname === '/' ? '' : location.pathname;
    location.href = `/${val.countryCode}${pathname}${location.search}`;
  }
}

// 唤醒app
export function wakeupApp(type, schema) {
  switch (type) {
    case 'ios': {
      location.href = schema;
      const start = new Date();
      setTimeout(function() {
        const end = new Date();
        if (end - start < 3000 && end - start > 2000) {
          location.href = '/download/app';
        }
      }, 2000);
      break;
    }
    default: {
      location.href = schema;
      const start = new Date();
      setTimeout(function() {
        const end = new Date();
        if (end - start < 3000 && end - start > 2000) {
          location.href = '/download/app';
        }
      }, 2000);
      break;
    }
  }
}

// 获取节点距离顶部的距离
export function elementOffsetTop(ele) {
  if (!ele) return 0;
  let realTop = ele.offsetTop;
  let parent = ele.offsetParent;
  while (parent !== null) {
    realTop += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return realTop;
}

// 生成一个区间的随机整数
export function randomNum(minNum, maxNum) { 
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    default: 
      return 0;
  } 
}

// 清楚用户信息cookie
export function clearUserInfoCookie() {
  const list = ['Auth-Token', 'Auth-Token.nc', 'authEmail', 'gwap-userid', 'platform', 'userId', 'userName', 'userEmail', 'userPhone'];
  list.forEach(key => {
    delCookie(key);
  });
  delCookie('Auth-Token.nc', '.gshopper.com');
  localStorage.removeItem('wishList');
}

// 获取浏览器型号
export function getBrowserInfo() {
  const Sys = {};
  const ua = navigator.userAgent.toLowerCase();
  const re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
  const m = ua.match(re);
  try {
    Sys.browser = m[1].replace(/version/, "'safari");
    Sys.ver = m[2];
  } catch (e) {
    console.log("getBrowserInfo fail.")
  }
  return `${Sys.browser}/${Sys.ver}`;
}