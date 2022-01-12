module.exports = {
  // 从cookie字符串中获token
  getLanguage(str) {
    return getCookieItem(str, 'language');
  },
  getItem(str, key) {
    return getCookieItem(str, key);
  },
  getCurrentLanguage(list = [], langCode, langKey = 'language') {
    const currentLanguageObj = list.find(item => item[langKey] === langCode);
    if (currentLanguageObj) {
      return currentLanguageObj;
    } else {
      return list.find(item => item[langKey] === 'N000920200');
    }
  },
  // 生成UUID
  uuid() {
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-';
    const uuid = s.join('');
    return uuid;
  },
  qsToobj(url) {
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
  },
  objToqs(obj) {
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
  }
};
function getCookieItem(cookie, key) {
  cookie = cookie || '';
  const list = cookie.split('; ');
  const cookieObj = list.reduce(function(res, item) {
    const data = item.split('=');
    const obj = {
      [data[0]]: data[1]
    };
    return Object.assign(res, obj);
  }, {});
  return cookieObj[key];
}
