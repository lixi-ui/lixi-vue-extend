<template>
  <button
    class="g-button-components"
    @click="handleClick"
    type="button"
    :disabled="disabled"
    :class="[
      'g-button-' + size,
      'g-button-' + theme,
      {'g-button-disabled': disabled},
    ]">
    <slot name="icon"></slot>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
  export default {
    name: 'g-button',
    props: {
      // @size small medium large
      size: {
        type: String,
        default: 'small'
      },
      // @theme default light plain
      theme: {
        type: String,
        default: 'default'
      },
      disabled: Boolean,
    },
    mounted() {
      console.log(this)
    },
    methods: {
      handleClick(event) {
        this.$emit('click', event);
      }
    }
  };
</script>
