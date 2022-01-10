<template>
  <img src="~asset/images/default.png" v-lazy="nativeSrc">
</template>

<script>
export default {
  name: 'gImage',
  props: {
    src: String,
  },
  data() {
    return {
      defaultImg: require('asset/images/default.png'),
    }
  },
  computed: {
    nativeSrc() {
      if (EASY_ENV_IS_BROWSER) {
        return this.src;
      } else {
        return this.defaultImg;
      }
    }
  }
}
</script>