<template>
  <div class="welcome">
    <el-row>
      <el-col :span="24">
        <div class="background-box" ref="backgroundBox">
          <div class="background" ref="background"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  mounted() {
    this.initialStyle();
    this.initialImage();
    this.initialListener();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initialStyle)
  },
  methods: {
    initialStyle() {
      const ele = document.querySelector("#top"),
        backgroundBox = this.$refs.backgroundBox;
      this.$setStyle(backgroundBox, "height", `${ele.clientHeight}px`);
    },
    initialImage() {
      const image = new Image(),
        background = this.$refs.background;
      image.src = require('@/assets/welcome/homepage.gif'); // 可使用require("")代替
      image.onload = () => {
        this.$setStyle(background, "display", "block");
        this.$setStyle(background, "background-image", `url(${image.src})`);
      };
    },
    initialListener() {
      window.addEventListener("resize", this.initialStyle);
    }
  }
};
</script>

<style lang="scss" scoped>
.background-box {
  position: relative;
  background-color: rgb(199, 199, 199);
}
.background {
  position: relative;
  display: none;
  height: 100%;
  background-image: url(../../assets/welcome/homepage.gif);
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 3px 3px silver;
  animation: show 1s;
}
@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
