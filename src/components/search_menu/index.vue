<template>
  <div :class="{'show':show}" class="header-search">
    <svg-icon class-name="search-icon" icon-class="search" @click.native.stop="click" />
    <Select
      v-model="search"
      :remote-method="querySearch"
      class="header-search-select"
      placeholder="搜索"
      filterable
      clearable
      remote
      @on-change="change"
      ref="headerSearchSelect"
      transfer
    >
      <Option
        v-for="item in options"
        :key="item.path"
        :value="item.path"
      >{{ item.title.join(' > ') }}</Option>
    </Select>
  </div>
</template>

<script>
import path from "path";
export default {
  name: "search",
  data() {
    return {
      search: "",
      options: [],
      searchPool: [],
      show: false,
      fuse: undefined,
      regexp: new RegExp(/^http/g)
    };
  },
  computed: {
    routes() {
      return this.$store.state.menu.menuList;
    }
  },
  watch: {
    // 当路由发生变化的时候重新生成路由
    routes() {
      this.searchPool = this.generateRoutes(this.routes);
    },
    // 当路由列表发生变化时，重新初始化fuse列表
    searchPool(list) {
      this.initFuse(list);
    },
    show(value) {
      if (value) {
        document.body.addEventListener("click", this.close);
      } else {
        document.body.removeEventListener("click", this.close);
      }
    }
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes);
  },
  methods: {
    // 弹出下拉选择框
    click(e) {
      this.show = !this.show;
      if (this.show) {
        this.$refs.headerSearchSelect &&
          document.querySelector(".ivu-select-input").focus();
      }
    },
    // 关闭下拉选择框
    close() {
      this.$refs.headerSearchSelect &&
        document.querySelector(".ivu-select-input").blur();
      this.options = [];
      this.show = false;
    },
    // 输入框值改变时调用
    change(path) {
      if (!path) {
        return;
      }
      this.regexp.test(path) ? window.open(path) : this.$router.push({ path });
      this.search = "";
      this.options = [];
      this.$refs.headerSearchSelect.clearSingleSelect();
      this.$nextTick(() => {
        this.show = false;
      });
    },
    // 初始化fuse规则
    initFuse(list) {
      this.fuse = new Fuse(list, {
        keys: ["title", "path"]
      });
    },
    // 生成一维扁平化路由数组，方便使用fuse进行筛选
    generateRoutes(routes, basePath = "/", prefixTitle = []) {
      let res = [];
      /**
       * 遍历所有路由，并进行扁平化处理
       */
      for (const router of routes) {
        // 如果为隐藏的菜单项，跳过循环
        if (!router.enabled) {
          continue;
        }
        // 为每个路由创建一个简单的对象
        const data = {
          path: router.path || "/",
          title: [...prefixTitle]
        };
        if (router.meta && router.meta.title) {
          // 如果存在菜单标题，则添加菜单标题
          data.title.push(router.meta.title);
          if (router.redirect !== "noredirect") {
            // 如果不为父级菜单（重定向菜单），则添加菜单项
            res.push(data);
          }
        }
        if (router.children) {
          // 如果含有子菜单，则继续递归遍历
          const tempRoutes = this.generateRoutes(
            router.children,
            data.path,
            data.title
          );
          if (tempRoutes.length >= 1) {
            // 如果子菜单数量不为0，则添加所有子菜单项
            res.push(...tempRoutes);
          }
        }
      }
      return res;
    },
    // 输入时调用
    querySearch(query) {
      if (query !== "") {
        this.options = this.fuse.search(query);
      } else {
        this.options = [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    /deep/ {
      .ivu-select-selection {
        border: 0;
      }
      .ivu-select-input {
        border-radius: 0;
        padding-left: 0;
        padding-right: 0;
        outline: none;
        box-shadow: none !important;
        border-bottom: 1px solid #d9d9d9;
        vertical-align: middle;
      }
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>