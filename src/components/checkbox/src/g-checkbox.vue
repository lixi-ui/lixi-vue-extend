<template>
  <label
    class="g-checkbox-component"
    :class="[
      `g-checkbox-${size}`,
      { 'is-checked': isChecked },
      { 'is-disabled': disabled },
    ]">
    <span class="g-checkbox-box">
      <span class="g-checkbox-select"></span>
      <input
        class="g-checkbox-input"
        type="checkbox"
        v-model="nativeIsChecked"
        @change="handleChange"
        :disabled="disabled">
    </span>
    <span class="g-checkbox-label" v-if="$slots.default">
      <slot></slot>
    </span>
  </label>
</template>

<script>
  export default {
    name: 'g-checkbox',
    model: {
      prop: 'isChecked',
      event: 'handleChecked'
    },
    props: {
      isChecked: Boolean,
      disabled: Boolean,
      size: {
        type: String,
        default: 'medium'
      }
    },
    computed: {
      nativeIsChecked: {
        get() {
          return this.isChecked;
        },
        set(val) {
          this.$emit('handleChecked', val);
        }
      }
    },
    methods: {
      // checkbox change事件
      handleChange(event) {
        const value = event.target.checked;
        this.$emit('change', value);
        // this.$emit('handleChecked', value);
      }
    }
  }
</script>
