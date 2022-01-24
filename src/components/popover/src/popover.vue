<template>
  <div class="popover-container">
    <i class="icon-popover" @click.stop="showPopup"></i>
    <div class="popover-content" v-show="visiblePopup || !isMobile">
      <slot></slot>
      <div class="tips-triangle"><span></span></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'g-popover',
    props: ['isMobile'],
    data() {
      return {
        visiblePopup: false,
        isBind: false
      };
    },
    methods: {
      showPopup() {
        if (this.isMobile) {
          this.visiblePopup = true;
          if (!this.isBind) {
            this.isBind = true;
            window.addEventListener('click', () => {
              this.visiblePopup = false;
            });
          }
        }
      }
    }
  };
</script>
