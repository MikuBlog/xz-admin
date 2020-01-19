<template>
  <div class="menu-button">
    <el-tooltip class="item" effect="dark" content="展开菜单" placement="bottom" v-if="isVerticleMenu">
      <i class="el-icon-s-unfold" @click="$emit('showMenu')"></i>
    </el-tooltip>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      isVerticleMenu: state => state.setting.isVerticleMenu
    })
  }
};
</script>

<style lang="scss" scoped>
.el-icon-circle-close:active {
  color: rgb(19, 180, 255);
}
</style>