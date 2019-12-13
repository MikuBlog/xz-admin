<template>
  <fm-making-form preview generate-code generate-json></fm-making-form>
</template>

<script>
export default {
  mounted() {
    const ele = document.querySelector(".fm2-container"),
      main = document.querySelector(".top");
    this.$setStyle(ele, "height", `${main.offsetHeight - 30}px`);
  }
};
</script>

<style lang="scss" scoped>
.fm2-container {
  /deep/ {
    .icon {
      display: inline!important;
    }
    .center-container {
      min-width: 500px;
    }
  }
}
</style>