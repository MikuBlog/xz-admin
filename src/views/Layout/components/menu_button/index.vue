<template>
  <div class="menu-button">
    <el-tooltip class="item" effect="dark" content="展开菜单" placement="bottom" v-if="isVerticleMenu">
      <i class="el-icon-s-unfold" @click="$emit('showMenu')"></i>
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="dark"
      content="删除所有标签页"
      placement="bottom"
      v-show="$store.state.setting.showTags"
    >
      <i class="el-icon-circle-close" @click="removeTags"></i>
    </el-tooltip>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      isVerticleMenu: state => state.setting.isVerticleMenu
    })
  },
  methods: {
    ...mapMutations(["REMOVE_ALL_TAGS"]),
    // 移除所有标签
    removeTags() {
      this.REMOVE_ALL_TAGS();
      this.$router.push("/home/welcome");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-icon-circle-close {
  position: relative;
  margin-left: 0.8rem;
}
.el-icon-circle-close:active {
  color: rgb(19, 180, 255);
}
</style>