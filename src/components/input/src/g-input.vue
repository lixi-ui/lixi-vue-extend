<template>
  <div :class="[
    'g-input-components',
    {'input-focus': isFocus},
    {'input-position': isFocus || nativeInputValue},
    ]">
    <div class="g-input-box">
      <input ref="input"
        class="g-input-control"
        v-bind="$attrs"
        :type="type"
        :value="nativeInputValue"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur">
    </div>
    <span class="g-placeholder">{{ placeholder }}</span>
  </div>
</template>

<script>
  export default {
    name: 'g-input',
    props: {
      value: [String, Number],
      disabled: Boolean,
      readonly: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      placeholder: String,
      size: String,
      autocomplete: {
        type: String,
        default: 'off'
      },
    },
    data() {
      return {
        isFocus: false,
      };
    },
    computed: {
      nativeInputValue() {
        if ((this.value === null || this.value === undefined)) return '';
        return String(this.value);
      },
    },
    watch: {
      nativeInputValue() {
        this.setNativeInputValue();
      },
    },
    mounted() {
      this.setNativeInputValue();
    },
    methods: {
      getInput() {
        return this.$refs.input;
      },
      setNativeInputValue() {
        const input = this.getInput();
        if (!input) return;
        if (input.value === this.nativeInputValue) return;
        input.value = this.nativeInputValue;
      },
      handleInput(event) {
        this.$emit('input', event.target.value);
        this.$nextTick(this.setNativeInputValue);
      },
      handleFocus(event) {
        this.isFocus = true;
        this.$emit('focus', event);
      },
      handleBlur(event) {
        this.isFocus = false;
        this.$emit('blur', event);
      },
    },
  };
</script>
