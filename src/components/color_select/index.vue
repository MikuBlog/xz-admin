<template>
  <div class="color-box">
    <div
      class="color"
      v-for="items in colorArray"
      @click="selectColor(items)"
      :style="{ background: items }"
    >
      <svg-icon
        class="tick"
        icon-class="勾"
        style="color: #666"
        v-show="nowColor === items"
      />
    </div>
  </div>
</template>

<script>
/**
 * @author xuanzai
 * @description 颜色选择器
 */
export default {
  name: "color-select",
  props: {
    nowColor: {
      type: String,
      default: ""
    },
    initial: {
      type: Function,
      default: () => {}
    },
    selectColor: {
      type: Function,
      default: () => {}
    },
    colorArray: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.initial()
  }
};
</script>

<style lang="scss" scoped>
.color-box {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(32px, 1fr));
  grid-row-gap: 12px;
}
.color {
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  cursor: pointer;
  transition: 0.3s;
}
.color:hover {
  opacity: 0.7;
}
.tick {
  left: 4px;
  top: 0;
  color: #fefefe;
}
</style>