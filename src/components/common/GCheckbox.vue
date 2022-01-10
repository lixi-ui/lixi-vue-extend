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
  name: 'GCheckbox',
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
      this.$emit('handleChecked', value);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~asset/scss/common';
  .g-checkbox-component {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    .g-checkbox-box {
      position: relative;
      z-index: 9;
      display: block;
    }
    .g-checkbox-select {
      position: relative;
      display: block;
      width: 14px;
      height: 14px;
      border-radius: 2px;
      background-color: #fff;
      border: 1px solid #BFBFBF;
      transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),
        background-color .25s cubic-bezier(.71,-.46,.29,1.46);
      &::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 5px;
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 7px;
        transform: rotate(45deg) scaleY(0);
        width: 3px;
        transition: transform .15s ease-in .05s;
        transform-origin: center;
      }
    }
    .g-checkbox-input {
      position: absolute;
      width: 0;
      height: 0;
      z-index: -1;
      margin: 0;
      opacity: 0;
      outline: none;
    }
    .g-checkbox-label {
      margin-left: 8px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
    }
    &.g-checkbox-small {
      .g-checkbox-select {
        width: 12px;
        height: 12px;
        &::after {
          top: 1px;
          left: 4px;
        }
      }
    }
    &.is-checked {
      .g-checkbox-select {
        border-color: $O1;
        background-color: $O1;
        &::after {
          transform: rotate(45deg) scaleY(1);
        }
      }
    }
    &.is-disabled {
      cursor: not-allowed;
      .g-checkbox-select {
        border-color: #EAEAEA;
        background-color: #EAEAEA;
      }
      .g-checkbox-label {
        color: #ccc;
      }
    }
    &:hover:not(.is-checked) {
      .g-checkbox-select {
        border-color: #666666;
      }
    }
  }
  @media only screen and (max-width: 1023px) {
    .g-checkbox-component {
      .g-checkbox-select {
        width: r(14);
        height: r(14);
        border-radius: r(2);
        &::after {
          top: r(2);
          left: r(5);
          height: r(7);
          width: r(3);
        }
      }
      .g-checkbox-label {
        margin-left: r(8);
        font-size: r(14);
      }
    }
  }
</style>