<template>
  <div class="float-contact-wrap">
    <div class="content-inner-wrap" @click="concactShopper">
      <p class="content-disc">
        <span>$lang.contactSeller</span>
      </p>
      <div class="detail-chat-icon"><i></i></div>
    </div>
  </div>
</template>

<script>
import bus from 'g-ui/src/utils/framework/utils/bus';

export default {
  name: 'g-float-contact-shopper',
  methods: {
    concactShopper() {
      bus.$emit('showContact')
    }
  }
};
</script>
