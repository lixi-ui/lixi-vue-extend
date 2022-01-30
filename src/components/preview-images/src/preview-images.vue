<template>
  <div class="preview-images-container">
    <div class="preview-image-pc">
      <div class="images-box" v-if="images.length > 0">
        <img :src="currentImage" alt="">
      </div>
      <div class="preview-images-mask"></div>
      <div class="viewer-btn prev" @click="handleImage('prev')">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="viewer-btn next" @click="handleImage('next')">
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="viewer-btn close" @click="handleImage()">
        <i class="el-icon-close"></i>
      </div>
    </div>
    <div class="preview-image-mobile">
      <van-image-preview
        v-model="visiblePreviewImages"
        ref="previewImage"
        :start-position="index"
        :images="images">
      </van-image-preview>
    </div>
  </div>
</template>

<script>
  import { ImagePreview } from 'vant';
  export default {
    name: 'g-preview-images',
    components: {
      VanImagePreview: ImagePreview
    },
    props: {
      images: {
        type: Array,
        default: () => []
      },
      index: {
        type: Number,
        default: () => 0
      },
    },
    computed: {
      currentImage() {
        return this.images[this.currentIndex];
      },
    },
    watch: {
      index: {
        handler(newVal) {
          this.currentIndex = newVal;
        },
        immediate: true
      },
      visiblePreviewImages(newVal) {
        if (!newVal) {
          this.handleImage();
        }
      },
    },
    data() {
      return {
        currentIndex: 0,
        visiblePreviewImages: true,
      };
    },
    methods: {
      handleImage(type) {
        switch (type) {
          case 'prev': {
            this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : --this.currentIndex;
            break;
          }
          case 'next': {
            this.currentIndex = this.currentIndex === this.images.length - 1 ? 0 : ++this.currentIndex;
            break;
          }
          default: {
            this.$emit('togglePreviewImages');
            break;
          }
        }
      }
    }
  };
</script>
