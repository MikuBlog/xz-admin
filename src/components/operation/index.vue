<template>
  <div :class="[onlyKey, 'operation-box']" v-show="options.length">
    <el-row>
      <el-col>
        <el-card>
          <div class="button-box" v-for="items in options">
            <el-button
              :type="items.type || ''"
              :icon="items.icons || ''"
              :circle="!items.name"
              :title="items.title"
              :disabled="items.disabled"
              @click="items.method ? $emit(items.method) : () => {}"
            ><span v-if="items.name">{{ items.name }}</span></el-button>
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
import { isMobile, isSafari } from "@/utils/agent";
export default {
  name: "operation-box",
  props: {
    options: {
      type: Array,
      default: () => []
    },
    visibility: {
      type: Number,
      default: 100
    },
		onlyKey: {
			type: String,
			default: ""
		}
  },
  beforeDestroy() {
    if (!isMobile() && !isSafari()) {
      document.querySelector(".os-viewport").removeEventListener("scroll", this.getScrollTop);
    } else {
      document.querySelector("#top").removeEventListener("scroll", this.getScrollTop);
    }
  },
  deactivated() {
    if (!isMobile() && !isSafari()) {
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
      const backtop = document.querySelector(`.${this.onlyKey || 'operation-box'}`);
      e.target.scrollTop >= this.visibility
        ? this.$setStyle(backtop, "transform", "translateY(-50%) scale(1)")
        : this.$setStyle(backtop, "transform", "translateY(-50%) scale(0)");
    },
    initialListener() {
      const _this = this;
      if (!isMobile() && !isSafari()) {
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
  z-index: 999;
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
/* 格式化卡片样式 */
.el-card {
  border: 1px solid transparent!important;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)!important;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)!important;
}
</style>