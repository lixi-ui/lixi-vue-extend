<template>
  <input type="checkbox"
    class="input_check"
    :disabled="disabled"
    :checked="checked"
    @change="change"/>
</template>
<script>
  export default {
    name: 'g-checkbox',
    data() {
      return {
        // checked: false
      };
    },
    model: {
      prop: 'checked',
      event: 'change'
    },
    methods: {
      change(event) {
        this.$emit('change', event.target);
      }
    },
    props: {
      checked: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    }
  };
</script>
