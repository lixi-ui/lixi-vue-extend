<template>
  <div class="zoom-image">
    <div class="zoom-image-container">
      <div class="zoom-image-close" @click="closeZoom">
        <img src="src/asset/images/wap/close-1@3x.png" alt="" />
      </div>
      <div class="zoom-thumbnail">
        <ul class="thumbnail-list">
          <li
            class="thumbnail-item"
            v-for="(image, index) in imageList"
            :key="index"
            @click="chooseImage(index)"
            :class="{ show: index === showImageIndex }"
          >
            <img class="thumbnail-img" :src="image.imageUrl" alt="" />
          </li>
        </ul>
      </div>
      <van-swipe
        ref="zoomSwipe"
        :loop="true"
        :show-indicators="true"
        @change="touchChange"
      >
        <van-swipe-item
          v-for="(image, index) in imageList"
          :key="index"
          :class="{ zoom: index === showImageIndex && zoomState === true }"
        >
          <img
            :src="image.imageUrl"
            :style="
              zoomState && offsetPercent
                ? `transform: translate3d(0px, ${offsetPercent}%, 0px); cursor: move;`
                : ''
            "
            alt=""
            @click="zoomImage"
            @mousemove="move"
          />
        </van-swipe-item>
      </van-swipe>
      <div class="swipe-btns" v-show="!zoomState">
        <div class="swipe-btn btn-left" @click="changeIndex('left')">
          <img src="src/asset/images/right_normal.png" alt="" />
        </div>
        <div class="swipe-btn btn-right" @click="changeIndex('right')">
          <img src="src/asset/images/right_normal.png" alt="" />
        </div>
      </div>
      <div class="zoom-mobile" v-if="zoomMobile">
        <img :src="showImg" alt="" @click="zoomMobile = false" />
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
  name: "g-zoom-image",
  components: {
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
  },
  props: {
    imageList: {
      type: Array,
      required: true,
    },
    currentImage: {
      type: [String, Number],
      default: 0,
    },
    showZoom: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showImageIndex: 0,
      zoomState: false,
      offsetPercent: null,
      moving: false,
      showImg: null,
      zoomMobile: false,
    };
  },
  beforeMount() {
    this.showImageIndex = this.currentImage;
    console.log(this.currentImage);
  },
  mounted() {
    this.hiddenScroll();
    this.$refs.zoomSwipe.swipeTo(this.showImageIndex);
  },
  methods: {
    hiddenScroll() {
      document.querySelector("html").style.width = "100%";
      document.querySelector("html").style.height = "100%";
      document.querySelector("html").style.position = "absolute";
      document.querySelector("body").style.width = "100%";
      document.querySelector("body").style.height = "100%";
      document.querySelector("body").style.overflow = "hidden";
      document.querySelector("body").style.position = "absolute";
    },
    showScroll() {
      document.querySelector("html").style.width = "auto";
      document.querySelector("html").style.height = "auto";
      document.querySelector("html").style.position = "static";
      document.querySelector("body").style.width = "auto";
      document.querySelector("body").style.height = "auto";
      document.querySelector("body").style.overflow = "auto";
      document.querySelector("body").style.position = "static";
    },
    move(event) {
      if (!this.zoomState) return false;
      const mouseY = event.clientY;
      const centerY = document.body.offsetHeight / 2;
      const offsetY = mouseY - centerY;
      let offsetPercent = null;
      if (offsetY <= 200 && offsetY >= -200) {
        offsetPercent = (17 / 200) * offsetY;
      } else if (offsetY > 200) {
        offsetPercent = 17;
      } else if (offsetY < -200) {
        offsetPercent = -17;
      }
      this.moveImage(event.target, offsetPercent);
    },
    moveImage(ele, num) {
      // ele.style.transform = `translate3d(0px, ${num}%, 0px)`
      this.offsetPercent = num;
    },
    chooseImage(index) {
      if (this.zoomState) {
        this.zoomState = false;
        this.offsetPercent = null;
      }
      this.showImageIndex = index;
      this.$refs.zoomSwipe.swipeTo(this.showImageIndex);
    },
    changeIndex(type) {
      if (type === "left") {
        if (this.showImageIndex === 0) {
          this.showImageIndex = this.imageList.length - 1;
        } else {
          this.showImageIndex--;
        }
      } else if (type === "right") {
        if (this.showImageIndex === this.imageList.length - 1) {
          this.showImageIndex = 0;
        } else {
          this.showImageIndex++;
        }
      }
      this.chooseImage(this.showImageIndex);
    },
    zoomImage() {
      if (this.zoomState) {
        this.zoomState = false;
        this.offsetPercent = null;
      } else {
        if (this.deviceType === true) {
          this.zoomMobile = true;
          this.showImg = this.imageList[this.showImageIndex].imageUrl;
        } else {
          this.zoomState = true;
        }
      }
    },
    closeZoom() {
      this.showScroll();
      this.zoomState = false;
      this.offsetPercent = null;
      this.$emit("close", true);
    },
    touchChange(index) {
      this.showImageIndex = index;
    },
  },
  computed: {
    deviceType() {
      return navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i)
        ? true
        : false;
    },
  },
  watch: {
    zoomState(newVal, oldVal) {
      if (newVal) {
        // this.move()
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.zoom-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  max-height: 100vh;
  z-index: 3001;
  background-color: #ffffff;
  .zoom-image-container {
    position: relative;
    overflow: auto;
    width: 100%;
    max-width: 100vw;
    height: 100%;
    max-height: 100vh;
  }
  .zoom-image-close {
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 3100;
    width: 40px;
    height: 40px;
    border: 1px solid #dddddd;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      width: 14px;
      height: 14px;
      display: block;
    }
  }
  .van-swipe {
    position: relative;
    width: auto;
    height: 100%;
    max-height: 100vh;
    .van-swipe__track {
      transition-duration: 500ms !important;
    }
  }
  .van-swipe-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    transition: all 0.3 !important;
    img {
      position: relative;
      z-index: 3003;
      max-height: 100%;
      max-width: 96%;
      cursor: zoom-in;
      transition: all 0.3s linear;
      transform-origin: center;
    }
    &.zoom {
      transform: scale(1.34) !important;
    }
  }
  .zoom-thumbnail {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3002;
    display: none;
  }
  .thumbnail-list {
    height: 100%;
    max-height: 100vh;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 28px;
    box-sizing: border-box;
    .thumbnail-item {
      margin-bottom: 28px;
      opacity: 0.6;
      cursor: pointer;
      transition: all 0.3s;
      transform: scale(0.9);
      &:hover {
        opacity: 1;
        transform: scale(1);
      }
      &.show {
        transform: scale(1);
        opacity: 1;
      }
    }
    .thumbnail-img {
      width: 80px;
      height: auto;
      display: block;
    }
  }
  .zoom-mobile {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3050;
    width: 100vw;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    background-color: #ffffff;
    img {
      width: 1000px;
      max-width: none;
      height: auto;
      display: block;
    }
  }
  .swipe-btns {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    display: none;
    .swipe-btn {
      position: absolute;
      top: 0;
      z-index: inherit;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      border-radius: 50%;
      box-sizing: border-box;
      &:hover {
        border: 1px solid #dddddd;
        cursor: pointer;
      }
      img {
        user-select: none;
      }
      &.btn-left {
        float: left;
        left: calc(50% - 30vw);
        img {
          transform-origin: center;
          transform: rotateZ(180deg);
        }
      }
      &.btn-right {
        float: right;
        right: calc(50% - 30vw);
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  ::v-deep .van-swipe__track {
    transition-duration: 0ms !important;
  }
  .zoom-image {
    .zoom-thumbnail {
      display: block;
    }
    .van-swipe-item {
      img {
        max-width: 700px;
      }
    }
    .van-swipe__indicators {
      display: none !important;
      opacity: 0;
    }
    .swipe-btns {
      display: block;
    }
  }
}
</style>
