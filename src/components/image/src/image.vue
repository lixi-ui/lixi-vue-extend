<template>
  <img src="src/asset/images/default.png" v-lazy="nativeSrc">
</template>

<script>
export default {
  name: 'g-image',
  props: {
    src: String,
  },
  data() {
    return {
      defaultImg: require('src/asset/images/default.png'),
    }
  },
  computed: {
    nativeSrc() {
      return this.src;
      // if (EASY_ENV_IS_BROWSER) {
      // } else {
      //   return this.defaultImg;
      // }
    }
  }
}
</script>