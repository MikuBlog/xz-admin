<template>
  <div class="operation-box" v-show="options.length">
    <el-row>
      <el-col>
        <el-card>
          <div class="button-box" v-for="items in options">
            <el-button
              :type="items.type || 'primary'"
              :icon="items.icons || 'el-icon-question'"
              :circle="!items.name"
              :title="items.title"
              :disabled="items.disabled"
              @click="items.method ? $emit(items.method) : () => {}"
            >{{ items.name }}</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/**
 * @author xuanzai
 * @description 悬浮操作窗口（用于列表过长不方便操作的页面）
 */
import { isMobile } from "@/utils/agent";
export default {
  name: "operation-box",
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  beforeDestroy() {
    if (!isMobile()) {
      document.querySelector(".os-viewport").removeEventListener("scroll", this.getScrollTop);
    } else {
      document.querySelector("#top").removeEventListener("scroll", this.getScrollTop);
    }
  },
  mounted() {
    setTimeout(() => {
      this.initialListener();
    }, 500);
  },
  methods: {
    getScrollTop(e) {
      const backtop = document.querySelector(".operation-box");
      e.target.scrollTop >= 100
        ? this.$setStyle(backtop, "transform", "translateY(-50%) scale(1)")
        : this.$setStyle(backtop, "transform", "translateY(-50%) scale(0)");
    },
    initialListener() {
      const _this = this;
      if (!isMobile()) {
        document
          .querySelector(".os-viewport")
          .addEventListener("scroll", this.getScrollTop);
      } else {
        document.querySelector("#top").addEventListener("scroll", this.getScrollTop);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.operation-box {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%) scale(0);
  background: #fefefe;
  transition: 0.3s;
}
.el-card {
  /deep/ {
    .el-card__body {
      padding: 3px 8px;
    }
  }
}
.button-box {
  position: relative;
  margin: 0.5rem 0;
}
.el-button {
  /deep/ {
    span {
      margin-left: 0;
    }
  }
}
</style>