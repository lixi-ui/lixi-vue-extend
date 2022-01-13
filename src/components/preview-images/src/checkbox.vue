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
<style lang="scss" scoped>
  @import "g-ui/src/style/src/base1.scss";
  @media only screen and (max-width: 1023px) {
    input[type=checkbox] {
      width: r(12);
      height: r(12);
      -webkit-appearance: none;
      background-color: transparent;
      border: 0;
      outline: 0 !important;
      position: relative;
      cursor: pointer;
    }

    input[type=checkbox]:before {
      content: "";
      display: block;
      width: r(12);
      height: r(12);
      border: 1px solid #979797;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 2px;
      position: absolute;
    }

    input[type=checkbox]:disabled:before {
      content: "";
      display: block;
      width: r(12);
      height: r(12);
      border: 1px solid #979797;
      background-color: #333;
      box-sizing: border-box;
      border-radius: 2px;
      position: absolute;
    }

    input[type=checkbox]:checked:before {
      content: "";
      display: block;
      width: r(12);
      height: r(12);
      border-color: $mainColor;
      background-color: $mainColor;
      box-sizing: border-box;
      border-radius: 2px;
      position: absolute;
    }

    input[type=checkbox]:checked:after {
      content: "";
      display: block;
      width: r(5);
      height: r(9);
      border-left: 2px solid #fff;
      border-top: 2px solid #fff;
      border-radius: 2px;
      box-sizing: border-box;
      position: absolute;
      left: r(4);
      top: r(1);
      transform: rotate(-135deg);
    }
  }

  @media only screen and (min-width: 1024px) {
    input[type=checkbox] {
      width: 16px;
      height: 16px;
      -webkit-appearance: none;
      background-color: transparent;
      border: 0;
      outline: 0 !important;
      position: relative;
      cursor: pointer;
    }

    input[type=checkbox]:before {
      content: "";
      display: block;
      width: 16px;
      height: 16px;
      border: 1px solid #979797;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 2px;
      position: absolute;
    }

    input[type=checkbox]:disabled:before {
      content: "";
      display: block;
      width: 16px;
      height: 16px;
      border: 1px solid rgba(0, 0, 0, .1);
      background-color: rgba(0, 0, 0, .05);
      box-sizing: border-box;
      border-radius: 2px;
      position: absolute;
      cursor: not-allowed;
    }

    input[type=checkbox]:checked:before {
      content: "";
      display: block;
      width: 16px;
      height: 16px;
      border-color: $mainColor;
      background-color: $mainColor;
      box-sizing: border-box;
      border-radius: 2px;
      position: absolute;
    }

    input[type=checkbox]:checked:after {
      content: "";
      display: block;
      width: 6px;
      height: 10px;
      border-left: 2px solid #fff;
      border-top: 2px solid #fff;
      border-radius: 2px;
      box-sizing: border-box;
      position: absolute;
      left: 5px;
      top: 2px;
      transform: rotate(-135deg);
    }
  }
</style>