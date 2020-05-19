<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group :name="defaultConfig.diy.breadcrumbAnimation ? 'bread-list' : ''">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" v-if="item.meta.title" :key="item.meta.title">
        <span
          v-if="item.redirect === 'noredirect' || index == breadcrumbList.length - 1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Breadcrumb",
	methods: {
		handleLink(item) {
			this.$router.push(item.path)
		}
	},
	computed: {
		...mapState({
			breadcrumbList: state => state.breadcrumb.breadcrumbList
		})
	}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  white-space: nowrap;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>