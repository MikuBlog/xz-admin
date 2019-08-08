<template>
    <div class="home" ref="home" id="home">
        <el-container>
            <el-scrollbar 
            style="height:100%" 
            v-show="!isSmall">
                <el-menu 
                :default-active="$store.state.menuIndex" 
                :collapse="isCollapse"
                class="el-menu-vertical-demo" 
                background-color="#2f4055"
                active-text-color="#429ee2"
                text-color="#becad8"
                :unique-opened="true"
                >
                    <div class="logo" v-show="$store.state.setting.showLogo" v-if="!isCollapse">
                        <img src="../assets/logo/catjoker.png" alt="logo.png">
                    </div>
                    <NavMenu 
                    :navMenus="$store.state.menuList"
                    ></NavMenu>
                </el-menu>
            </el-scrollbar>
            <Drawer 
            v-show="isSmall" 
            v-model="isMenuCollapse"
            width="200"
            placement="left">
                <el-scrollbar style="height:100%">
                    <el-menu 
                    :default-active="$store.state.menuIndex" 
                    class="el-menu-vertical-demo menu-list" 
                    background-color="#2f4055"
                    active-text-color="#429ee2"
                    text-color="#becad8"
                    width="200px"
                    :unique-opened="true"
                    @select="clickMenuItem"
                    >
                        <div class="logo" 
                        v-show="$store.state.setting.showLogo" 
                        >
                            <img src="../assets/logo/catjoker.png" alt="logo.png">
                        </div>
                        <NavMenu 
                        :navMenus="$store.state.menuList"
                        ></NavMenu>
                    </el-menu>
                </el-scrollbar>
            </Drawer>
            <el-container>
                <el-header style="height: 50px;">
                    <div class="navbar">
                        <div class="menu-button">
                            <el-tooltip 
                            class="item" 
                            effect="dark" 
                            content="展开菜单" 
                            placement="bottom">
                                <i 
                                class="el-icon-s-unfold" 
                                @click="showMenu"></i>
                            </el-tooltip>
                            <el-tooltip 
                            class="item" 
                            effect="dark" 
                            content="删除所有标签页" 
                            placement="bottom">
                                <i 
                                class="el-icon-circle-close" 
                                @click="removeAllTags"
                                title="删除所有标签页"></i>
                            </el-tooltip>
                        </div>
                        <div class="breadcrumb" v-show="$store.state.setting.showBreadcrumb">
                            <Breadcrumb></Breadcrumb>
                        </div>
                        <div class="icon-box">
                            <el-tooltip 
                            class="item" 
                            effect="dark" 
                            content="样式设置" 
                            placement="bottom">
                                <i 
                                class="el-icon-s-tools"
                                @click="showSetting"></i>
                            </el-tooltip>
                            <el-tooltip 
                            class="item" 
                            effect="dark" 
                            content="全屏" 
                            placement="bottom">
                                <span class="el-icon-full-screen" @click="fullScreen"
                                ref="icon"
                                ></span>
                            </el-tooltip>
                        </div>
                        <el-dropdown trigger="click">
                            <div class="avatar-box">
                                <div class="block">
                                    <el-avatar 
                                    shape="square" 
                                    :size="45" 
                                    :src="squareUrl">
                                        <img src="https://myinterface.xuanzai.top/getPicture?type=error"/>
                                    </el-avatar>
                                </div>
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item
                                    @click.native="navigateTo('/home/welcome')"
                                    >首页
                                    </el-dropdown-item>
                                    <el-dropdown-item @click.native="navigateTo('/home/person')">
                                        个人中心
                                    </el-dropdown-item>
                                    <el-dropdown-item @click.native="openNewPage()">
                                        项目地址
                                    </el-dropdown-item>
                                    <div class="line"></div>
                                    <el-dropdown-item
                                    @click.native="logout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </div>
                        </el-dropdown>
                    </div>
                    <div class="border" style="border-color: #f0f0f0"></div>
                </el-header>
                <div class="tabs" v-show="$store.state.setting.showTags">
                    <Tag :tagsList="$store.state.tagsList" />
                </div>
                <el-main class="top" id="top">
                    <transition name="xz-animation">
                        <router-view 
                        @updateUserInfo="getUserInfo"
                        class="router"/>
                    </transition>
                    <div class="back-top">
                        <el-button 
                        type="primary" 
                        icon="el-icon-top" 
                        circle
                        class="to-top"
                        @click="backTop"
                        v-show="isShowBackTop"></el-button>
                    </div>
                </el-main>
            </el-container>
        </el-container>
        <Drawer 
        v-model="isSetting"
        width="350px">
            <h2 style="margin-top: 1rem">系统布局设置</h2>
            <el-divider></el-divider>
            <div class="switch-box">
                <div class="box">
                    <span class="tips">显示Logo</span>
                    <el-switch v-model="$store.state.setting.showLogo">
                    </el-switch>
                </div>
                <div class="box">
                    <span class="tips">显示标签页</span>
                    <el-switch v-model="$store.state.setting.showTags">
                    </el-switch>
                </div>
                <div class="box">
                    <span class="tips">显示面包屑</span>
                    <el-switch v-model="$store.state.setting.showBreadcrumb">
                    </el-switch>
                </div>
            </div>
            <el-image
            style="width: 100%; height: 159px"
            :src="logoUrl"
            fit="cover"
            ref="image"></el-image>
            <div class="button">
                <el-button 
                type="primary" 
                style="width: 100%"
                @click="selectPic"
                >选择图片</el-button>
            </div>
            <div class="button">
                <el-button 
                type="success" 
                style="width: 100%"
                >上传Logo</el-button>
            </div>
        </Drawer>
    </div>
</template>

<script>
import NavMenu from '@/components/tree_menu/SidebarItem'
import Breadcrumb from '@/components/breadcrumb'
import Tag from '@/components/tag'
import store from '@/store/store'
export default {
    components: { NavMenu, Breadcrumb, Tag },
    data() {
        return {
            isCollapse: false,
            isFullScreen: false,
            isSmall: false,
            isMenuCollapse: false,
            isSetting: false,
            isShowBackTop: false,
            logoUrl: "",
            tagsList: this.$store.state.tagsList,
            user: {},
            squareUrl: "",
            menuList:[{
                meta: {
                    title: "首页"
                },
                iframe: false,
                icon: "主页",
                path: "/home/welcome"
            }]
        }
    },
    created() {
        // 获取用户信息
        this.getUserInfo()
    },
    mounted() {
        this.initialStyle()
        this.initialListener()
        // 获取视窗大小
        this.getWindowWidth()
    },
    methods: {
        // 获取用户信息
        getUserInfo() {       
            this.$http_json({
                url: "/auth/info",
                method: "get"
            }).then(result => {
                this.$store.commit("setUserInfo", result.data)
                this.user = this.$store.state.user
                this.squareUrl = this.user.avatar
            })
        },
        // 返回顶部
        backTop(delay = 500) {
            this.$$('.top').animate({scrollTop: 0}, delay)
        },
        // 前往项目地址
        openNewPage() {
            window.open('https://github.com/MikuBlog/xz-admin')
        },
        // 退出登录
        logout() {
            // 退出前先清空用户访问记录
            this.$setMemoryPmt('token', '')
            this.$router.push({ path: '/login' })
        },
        // 选择图片
        selectPic() {
            this
                .$getImgFile()
                .then(({raw, url}) => {
                    this.logoUrl = url
                })
                .catch(e => {
                    this.$warnMsg(e)
                })
        },
        // 打开设置抽屉
        showSetting() {
            this.isSetting = true
        },
        // 移除所有标签
        removeAllTags() {
            this.tagsList.splice(1)
            this.navigateTo('/home/welcome')
        },
        // 点击隐藏左侧抽屉菜单
        clickMenuItem() {
            this.isMenuCollapse = false
        },
        // 跳转路由
        navigateTo(path) {
            this.$router.push({ path })
        },
        // 设置全屏与取消全屏
        fullScreen() {
            const ele = this.$refs.icon
            this.isFullScreen 
            ? this.$cancelFullScreen()
            : this.$setFullScreen()
            this.isFullScreen = !this.isFullScreen
        },
        // 初始化样式
        initialStyle() {
            const 
                eles = document.querySelectorAll('.el-scrollbar__wrap'),
                drawer = document.querySelector('.ivu-drawer-body'),
                menuList = document.querySelector('.el-menu-vertical-demo'),
                drawerContent = document.querySelector('.ivu-drawer-content'),
                scrollContainer = document.querySelector('.el-scrollbar'),
                scrollBar = document.querySelectorAll('.el-scrollbar__thumb')[1]
            this.$setStyle(drawer, 'padding', 0)
            this.$setStyle(drawerContent, 'background', '#2e3f54')
            this.$setStyle(scrollContainer, 'background', '#2d3e53')
            eles.forEach((value, index) => {
                this.$setStyle(value, 'overflow-x', 'hidden')
            })
            this.isMenuCollapse = false
        },
        // 显示菜单
        showMenu() {
            this.isSmall
            ? this.isMenuCollapse = !this.isMenuCollapse
            : (this.isCollapse = !this.isCollapse)
        },
        // 获取屏幕宽度
        getWindowWidth() {
            window.innerWidth < 1100
            ? (this.isSmall = true, this.isCollapse = true)
            : this.isSmall = false
        },
        // 获取滚动高度
        getScrollTop(obj) {
            obj.scrollTop >= 100
            ? this.isShowBackTop = true
            : this.isShowBackTop = false
            this.$setMemorySes('scrollTop', obj.scrollTop)
        },
        // 事件监听
        initialListener() {
            const _this = this
            window.addEventListener('resize', () => {
                this.getWindowWidth()
            })
            document.querySelector('.top').addEventListener('scroll', function() {
                _this.getScrollTop(this)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .home {
        position: relative;
        height: 100%;
        background: #eef0f3;
    }
    .el-container {
        position: relative;
        height: 100%;
    }
    .el-header {
        position: relative;
        background: #fefefe;
        padding: 0;
    }
    .navbar {
        position: relative;
        line-height: 50px;
        box-shadow: 0 2px 2px rgb(230, 230, 230);
    }
    .menu-button {
        position: relative;
        display: inline-block;
        margin-left: 1rem;
        height: 50px;
        line-height: 50px;
        font-size: 1.5rem;
        color: #686868;
        transition: .3s;
        cursor: pointer;
    }
    .el-icon-s-unfold, .el-icon-circle-close {
        transition: .3s;
    }
    .el-icon-s-unfold:active {
        color: rgb(19, 180, 255);
    }
    .el-menu {
      width: 200px;
    }
    .el-menu--collapse {
      width: 60px;
    }
    .el-menu-item {
        position: relative;
    }
    .el-icon-circle-close {
        position: relative;
        margin-left: .8rem;
    }
    .el-icon-circle-close:active {
        color: rgb(19, 180, 255);
    }
    .el-breadcrumb {
        position: absolute;
        left: 100px;
        top: 21px;
    }
    .el-dropdown {
        position: absolute;
        top: 0;
        right: 0;
        width: 60px;
        height: 50px;
    }
    .image {
        height: 100%;
        border-radius: 1rem;
    }
    .line {
        position: relative;
        height: 0;
        border: 1px solid #eee;
    }
    .tabs {
        position: relative;
        background: #ffffff;
    }
    .el-icon-caret-bottom {
        position: absolute;
        right: 0;
        bottom: 3px;
    }
    .icon-box {
        position: absolute;
        top:3px;
        right: 60px;
        padding: 0 1rem;
        height: 50px;
        line-height: 50px;
        color: #676767;
        text-align: center;
        transition: .3s;
    }
    .el-icon-s-tools {
        position: relative;
        top: 1px;
        margin-right: .8rem;
        font-size: 25px;
    }
    .el-icon-full-screen, .el-icon-s-tools, .iconfullscreenexit {
        transition: .3s;
    }
    .el-icon-full-screen:active {
        color: rgb(19, 180, 255);
    }
    .el-icon-s-tools:active {
        color: rgb(19, 180, 255);
    }
    .iconfullscreenexit:active {
        color: rgb(19, 180, 255);
    }
    .el-icon-full-screen {
        font-size: 22px;
    }
    .logo {
        position: relative;
        margin: 2rem 0 1rem 0;
        width: 13rem;
        text-align: center;
    }
    .logo > img {
        position: relative;
        left: -5px;
        width: 80%;
    }
    .switch-box {
        position: relative;
        margin: 1rem 0;
        text-align: right;
    }
    .box {
        position: relative;
        margin: .5rem;
    }
    .tips {
        position: absolute;
        top: -3px;
        left: 0;
        font-size: 1rem;
    }
    .button {
        position: relative;
        margin: .5rem 0;
    }
    .back-top {
        position: fixed;
        z-index: 1500;
        right: 50px;
        bottom: 100px;
    }
    .xz-animation-enter-active {
        transition: all .6s .7s;
    }
    .xz-animation-leave-active {
        transition: all .6s;
    }
    .xz-animation-enter, .xz-animation-leave-to {
        transform: translateX(-50px);
        opacity: 0;
    }
</style>
