<template>
  <div>
    <h2 style="margin: 2rem 0">系统Logo设置</h2>
    <el-image style="width: 100%; height: 159px" :src="logo" fit="scale-down" ref="image"></el-image>
    <div class="button" v-permission="['ADMIN']">
      <el-button type="primary" style="width: 100%" @click="selectLogo">选择Logo</el-button>
    </div>
    <div class="button" v-permission="['ADMIN']">
      <el-button type="warning" style="width: 100%" @click="uploadLogo">上传Logo</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      logo: ""
    }
  },
  computed: {
    ...mapState({
      settings: state => state.setting
    })
  },
  created() {
    this.getLogo()
  },
  methods: {
    // 获取logo
    getLogo() {
      this.$http_json({
        url: "/api/showConfig/getByName/logo",
        method: "get"
      }).then(result => {
        this.logo = result.data.value
      })
    },
    // 选择Logo
    selectLogo() {
      this.$getImgFile()
        .then(({ raw, url }) => {
          this.logo = url;
          this.logoBlob = raw;
        })
        .catch(e => {
          this.$warnMsg(e);
        });
    },
    // 上传logo
    uploadLogo() {
      const regexp = new RegExp(/^http/g);
      if (!this.logo || regexp.test(this.logo)) {
        this.$warnMsg("请选择Logo");
      } else {
        this.$http_file({
          url: "/api/showConfig/uploadlogo",
          method: "post",
          data: {
            file: this.logoBlob
          }
        }).then(result => {
          this.$parent.logoUrl = convertHttp(result.data.value);
          this.$successMsg("上传成功");
        });
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  margin: 0.5rem 0;
}
</style>