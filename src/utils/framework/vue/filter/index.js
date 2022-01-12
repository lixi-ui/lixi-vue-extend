import Vue from 'vue';
import { currencyPriceReplace, currencyPriceSort } from '../../utils/utils';
/**
 * 去掉HTML标签
 */
Vue.filter('removeHtml', input => {
  return input && input.replace(/<(?:.|\n)*?>/gm, '')
    .replace(/(&rdquo;)/g, '\"')
    .replace(/&ldquo;/g, '\"')
    .replace(/&mdash;/g, '-')
    .replace(/&nbsp;/g, '')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/<[\w\s"':=\/]*/, '');
});

Vue.filter('money', (val, currency) => {
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
});

Vue.filter('moneyPrice', (val, currency) => {
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
  return price;
});

Vue.filter('priceSplit', (val, type) => {
  // if (type === 'int') {
  //   return val.split('.')[0];
  // } else if (type === 'dot') {
  //   return val.split('.')[1];
  // }
  return type === 'int' ? val.split('.')[0] : type === 'dot' ? val.split('.')[1] || '00' : '';
});

Vue.filter('moneyToUp', (val, currency, up) => {
  if (val === '' || val === null || val === undefined) return '';
  if (typeof val === 'string') {
    val = Number(val);
  }
  let price = null;
  if (currency === 'KRW') {
    val = Math.ceil(val);
    price = val.toFixed(0);
  } else {
    price = val.toFixed(2);
  }
  return price.toString().replace(/\d+/, function(n) {
    return n.replace(/(\d)(?=(\d{3})+$)/g, function($1) {
      return $1 + ',';
    });
  });
});
Vue.filter('thousand', val => {
  if (!val) return 0
  val = String(val);
  if (val.length > 3) {
    const temp = val.split('').reverse().join('')
      .match(/(\d{1,3})/g)
      .join(',')
      .split('')
      .reverse()
      .join('');
    return temp;
  }
  return val;
});


// 时间戳格式化
Vue.filter('parseTime', (time, cFormat) => {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}/{m}/{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
});

// 商品属性格式化
Vue.filter('formatSkuAttr', (val) => {
  if (val === '') return;
  if (!val) {
    return '未知';
  }
  const arr = val.split(';').filter(item => item);
  const newArr = arr.map(item => {
    const arr = item.split(':');
    return arr[1];
  });
  if (newArr.length === 1) {
    return newArr[0];
  } else {
    return newArr.join('/');
  }
});
