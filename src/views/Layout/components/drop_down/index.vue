<template>
  <el-dropdown trigger="click" size="large" class="avatar-dropdown">
    <div class="avatar-box">
      <div class="block">
        <el-avatar shape="square" :size="45" :src="squareUrl">
          <img src="https://myinterface.xuanzai.top/getPicture?type=error" />
        </el-avatar>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="$router.push('/home/welcome')">
          <i class="el-icon-s-home" />首页
        </el-dropdown-item>
        <el-dropdown-item @click.native="$router.push('/home/person')">
          <i class="el-icon-s-custom" />个人中心
        </el-dropdown-item>
        <el-dropdown-item
          v-show="defaultConfig.systemSetting"
          @click.native="$emit('showSetting')"
        >
          <i class="el-icon-setting" />系统设置
        </el-dropdown-item>
        <el-dropdown-item @click.native="openNewPage">
          <i class="fa fa-github-alt" />项目地址
        </el-dropdown-item>
        <div class="line"></div>
        <el-dropdown-item @click.native="logout">
          <i class="fa fa-paper-plane" />退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </div>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
      squareUrl: ""
    };
  },
  methods: {
    // 退出登录
    logout() {
      this.$showMsgBox({
        msg: `是否注销当前账号?`,
        iconClass: "el-icon-question"
      }).then(result => {
        this.$http_normal({
          url: "/auth/logout",
          method: "post"
        }).then(() => {
          this.$setMemoryPmt("token", "");
					this.$setMemorySes("redirect", "")
          this.$router.push({ path: "/login" });
        })
      });
    },
    // 前往项目地址
    openNewPage() {
      window.open("https://github.com/MikuBlog/xz-admin");
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar-box {
  position: relative;
  float: right;
  margin-right: 5px;
}
.avatar-box-horizontal {
  position: relative;
}
.avatar-dropdown {
  position: relative;
  height: 40px;
}
.line {
  position: relative;
  height: 0;
  border: 1px solid #eee;
}
.el-avatar {
	img {
		width: 100%;
	}
}
</style>