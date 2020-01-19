<template>
  <div class="sticky" ref="sticky">
    <slot />
  </div>
</template>

<script>
/**
 * @author xuanzai
 * @description 固定元素到底部（废弃）
 */
export default {
  name: "sticky",
  props: {
    // 滚动元素的css选择器
    scrollTarget: String,
    // 从距离顶部位置多少开始固定
    distance: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      fixedEle: "",
      scrollBox: "",
      position: "",
      width: "",
      height: "",
      offsetTop: "",
    };
  },
  mounted() {
    this.fixedEle = this.$refs.sticky;
    setTimeout(() => {
      this.scrollBox = document.querySelector(this.scrollTarget);
      this.getMessage();
      this.getTop();
      this.initialListener();
    });
  },
  beforeDestroy() {
    this.scrollBox.removeEventListener("scroll", this.getTop);
    window.removeEventListener("resize", this.getMessage);
  },
  methods: {
    getTop() {
      if (this.scrollBox.scrollTop <= this.offsetTop - (105 + this.distance)) {
        this.$setStyle(this.fixedEle, {
          position: this.position,
          zIndex: 1,
          top: 0,
          width: "auto"
        });
      } else if (this.fixedEle.getBoundingClientRect().top < 105 + this.distance) {
        this.$setStyle(this.fixedEle, { 
          position: "fixed",
          zIndex: 1,
          top: `${this.distance + 85}px`,
          width: this.width,
          height: this.height
        });
      }
    },
    getMessage() {
      this.position = window.getComputedStyle(this.fixedEle).position;
      this.width = window.getComputedStyle(this.fixedEle).width;
      this.height = window.getComputedStyle(this.fixedEle).height;
      this.offsetTop = $(this.fixedEle).offset().top
    },
    initialListener() {
      this.scrollBox.addEventListener("scroll", this.getTop);
      window.addEventListener("resize", this.getMessage);
    }
  }
};
</script>