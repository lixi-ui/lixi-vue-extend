<template>
  <div class="stepsBox">
    <div class="step">
      <p>{{ step }} 1</p>
      <div class="circle"></div>
      <p>{{ addToCart }}</p>
    </div>
    <p class="line" :class="{'line-active': step >= 2 }"></p>
    <div class="step">
      <p>{{ step }} 2</p>
      <div :class="step >= 2 ? 'twoNoCircle' : 'noCircle'"></div>
      <p>{{ checkOut }}</p>
    </div>
    <p class="line" :class="{'line-active': step >= 3 }"></p>
    <div class="step">
      <p>{{ step }} 3</p>
      <div :class="step >= 3 ? 'twoNoCircle' : 'noCircle'"></div>
      <p>{{ palceOrder }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "g-step",
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  data(){
    return {
      step: '步骤',
      addToCart: '添加卡片',
      checkOut: '选择',
      palceOrder: '订单'
    }
  }
};
</script>

