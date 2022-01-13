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

<style scoped lang="scss">
  @import '/src/asset/scss/common.scss';
  @media only screen and (max-width: 1023px) {
    .g-input-components {
      position: relative;
      width: r(200);
      .g-input-box{
        display: flex;
        align-items: center;
        height: r(40);
        overflow: hidden;
        .g-input-control{
          width: 100%;
          height: r(40);
          line-height: r(40);
          padding: 0 r(12);
          font-size: r(14);
          color: #999;
          border-radius: r(4);
          border: 1px solid #DCDEE6;
          box-sizing: border-box;
          transition: all .2s cubic-bezier(.645,.045,.355,1);
        }
      }
      .g-placeholder{
        position: absolute;
        top: 50%;
        left: r(12);
        transform: translateY(-50%);
        font-size: r(12);
        color: #999999;
        transition: all .2s cubic-bezier(.645,.045,.355,1);
      }
      &.input-position{
        .g-placeholder{
          top: 28%;
        }
        .g-input-control{
          padding-top: r(14);
          line-height: 1;
        }
      }
      &.input-focus{
        .g-input-control{
          border-color: rgba(0,0,0,.85);
        }
      }
    }
  }
  @media only screen and (min-width: 1024px) {
    .g-input-components {
      position: relative;
      width: 200px;
      .g-input-box{
        display: flex;
        align-items: center;
        height: 40px;
        overflow: hidden;
        .g-input-control{
          width: 100%;
          height: 40px;
          line-height: 40px;
          padding: 0 12px;
          font-size: 14px;
          color: #999;
          border-radius: 4px;
          border: 1px solid #DCDEE6;
          box-sizing: border-box;
          transition: all .2s cubic-bezier(.645,.045,.355,1);
        }
      }
      .g-placeholder{
        position: absolute;
        top: 50%;
        left: 12px;
        transform: translateY(-50%);
        font-size: 12px;
        color: #999999;
        transition: all .2s cubic-bezier(.645,.045,.355,1);
      }
      &.input-position{
        .g-placeholder{
          top: 28%;
        }
        .g-input-control{
          padding-top: 14px;
          line-height: 1;
        }
      }
      &.input-focus{
        .g-input-control{
          border-color: rgba(0,0,0,.85);
        }
      }
    }
  }
</style>