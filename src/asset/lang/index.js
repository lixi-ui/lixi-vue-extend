import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const messages = {
  N000920100: require('./zh.js'),
  N000920200: require('./en.js'),
  N000920300: require('./japanese.js'),
  N000920400: require('./korean.js'),
  N000920500: require('./fr.js'),
  N000920700: require('./hk.js'),
  N000920600: require('./de.js'),
  N000920800: require('./es.js'),
  N000920901: require('./it.js'),
}

export default function createI18n(locale) {
  return new VueI18n({
    locale: locale || 'N000920200',
    messages
  });
};