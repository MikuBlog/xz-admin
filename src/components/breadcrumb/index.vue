<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="bread-list">
      <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
        <span
          v-if="item.redirect==='noredirect'||index==levelList.length-1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from "path-to-regexp";
export default {
  name: "Breadcrumb",
  data() {
    return {
      levelList: null
    };
  },
  created() {
    this.getBreadcrumb();
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => {
        if (item.name) {
          return true;
        }
      });
      const first = matched[1];
      if (first && first.name !== "首页") {
        matched = [{ path: "/home/welcome", meta: { title: "首页" } }].concat(
          matched
        );
      }
      this.levelList = matched;
    },
    pathCompile(path) {
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$emit("clickMenuItem", item);
      this.$router.push(this.pathCompile(path));
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
.el-breadcrumb__item {
  position: relative;
  top: -21px;
  left: -15px;
}
// .bread-list-enter-active {
//   transition: all 0.6s 0.7s;
// }
// .bread-list-leave-active {
//   transition: all 0.6s;
// }
// .bread-list-enter,
// .bread-list-leave-to {
//   transform: translateX(-25px);
//   opacity: 0;
// }
.bread-list-enter-active,
.bread-list-leave-active  {
  transition: all 0.5s;
}
.bread-list-leave-active {
  position: absolute;
}
.bread-list-enter,
.bread-list-leave-to {
  opacity: 0;
}
.bread-list-enter {
  transform: translateX(25px);
}
.bread-list-leave-to {
  transform: translateX(-25px);
}
.bread-list-move {
  transition: all .5s;
}
</style>