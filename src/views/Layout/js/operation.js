import { isMobile, isSafari } from '@/utils/agent'
import { mapMutations } from 'vuex'
import convertHttp from '@/utils/convertHttp'
export default {
	beforeDestroy() {
		clearInterval(this.interval)
	},
  methods: {
    ...mapMutations([
      "SET_USER_INFO",
      "REMOVE_ALL_TAGS"
    ]),
    isMobile,
    isSafari,
    // 获取用户信息
    getUserInfo() {
      this.$http_json({
        url: "/api/auth/info",
        method: "get"
      }).then(result => {
        result.data.avatar = result.data.avatar
        ? convertHttp(result.data.avatar)
        : ''
        this.SET_USER_INFO(result.data)
        this.user = this.$store.state.user
        this.$refs.dropDown.squareUrl = this.user.avatar
      })
    },
    // 设置表格大小
    setTableSize(size) {
      this.$store.state.setting.layoutSize = size
      this.$setMemoryPmt('setting', this.$store.state.setting)
      this.initialSize()
      this.refreshPage()
    },
    // 刷新页面
    refreshPage() {
      this.$router.replace({
        path: `/home/redirect?path=${this.$route.fullPath}`
      })
    },
    // 显示菜单
    showMenu() {
      this.isSmall
        ? this.isMenuCollapse = !this.isMenuCollapse
        : this.isCollapse = !this.isCollapse
      // 重渲染展开菜单项
      this.interval = setInterval(() => {
        if (window.getComputedStyle(document.querySelector('.collapse-menu .el-menu-item-group'))['background-color'] === 'rgba(0, 0, 0, 0)') {
          this.initialStyle()
          clearInterval(this.interval)
        }
      }, 40)
    }
  }
}