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

