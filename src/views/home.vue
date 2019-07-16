import { element } from 'protractor';
<template>
    <div class="home" ref="home" id="home">
        <el-container>
            <el-scrollbar 
            style="height:100%" 
            v-show="!isSmall">
                <el-menu 
                :default-active="activeIndex" 
                :collapse="isCollapse"
                class="el-menu-vertical-demo menu-list" 
                background-color="#2f4055"
                active-text-color="#429ee2"
                text-color="#becad8"
                width="200px"
                :unique-opened="true"
                >
                    <div class="logo" v-show="isShowLogo" v-if="!isCollapse">
                        <img src="../assets/logo/catjoker.png" alt="logo.png">
                    </div>
                        <el-menu-item 
                        v-if="!items.children"
                        :index="items.index" 
                        @click="clickMenuItem(items.path, items.title, items.index, items.parent)" 
                        v-for="items in menuList"
                        >
                            <i :class="items.icon"></i>
                            <span slot="title">{{items.title}}</span>
                        </el-menu-item>
                        <el-submenu 
                        :index="items.index" 
                        v-if="items.children"
                        v-for="items in menuList">
                            <template slot="title">
                                <i :class="items.icon"></i>
                                <span>{{items.title}}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item 
                                :index="child.index" 
                                @click="clickMenuItem(child.path, child.title, child.index, child.parent)"
                                 v-for="child in items.children">
                                    <i :class="child.icon"></i>
                                    <span slot="title">{{child.title}}</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                </el-menu>
            </el-scrollbar>
            <Drawer 
            v-show="isSmall" 
            v-model="isMenuCollapse"
            placement="left">
                <el-scrollbar style="height:100%">
                    <el-menu 
                    :default-active="activeIndex" 
                    class="el-menu-vertical-demo menu-list" 
                    background-color="#2f4055"
                    active-text-color="#429ee2"
                    text-color="#becad8"
                    width="200px"
                    :unique-opened="true"
                    >
                            <el-menu-item 
                            v-if="!items.children"
                            :index="items.index" 
                            @click="clickMenuItem(items.path, items.title, items.index, items.parent)" 
                            v-for="items in menuList">
                                <i :class="items.icon"></i>
                                <span slot="title">{{items.title}}</span>
                            </el-menu-item>
                            <el-submenu 
                            :index="items.index" 
                            v-if="items.children"
                            v-for="items in menuList">
                                <template slot="title">
                                    <i :class="items.icon"></i>
                                    <span>{{items.title}}</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item 
                                    :index="child.index"
                                    @click="clickMenuItem(child.path, child.title, child.index, child.parent)"
                                    v-for="child in items.children">
                                        <i :class="child.icon"></i>
                                        <span slot="title">{{child.title}}</span>
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                    </el-menu>
                </el-scrollbar>
            </Drawer>
            <el-container>
                <el-header>
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
                        <div class="breadcrumb">
                            <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item 
                                :to="{ path: '/home/chart' }"
                                @click.native="addBreakcrumb()">首页</el-breadcrumb-item>
                                <el-breadcrumb-item 
                                v-for="items in breadcrumbList"
                                >{{items}}</el-breadcrumb-item>
                            </el-breadcrumb>
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
                        <div class="avatar-box">
                            <el-dropdown trigger="click">
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
                                    @click.native="clickMenuItem('/home/chart', '首页', '1')">首页</el-dropdown-item>
                                    <el-dropdown-item @click.native="clickMenuItem('/home/person', '个人中心', '2')"><span>个人中心</span></el-dropdown-item>
                                    <el-dropdown-item
                                    @click.native="openProject">
                                        项目地址
                                    </el-dropdown-item>
                                    <div class="line"></div>
                                    <el-dropdown-item
                                    @click.native="logout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                </el-header>
                <el-header>
                    <div class="tabs">
                        <el-scrollbar
                        style="height: 50px;" 
                        >
                            <Tag 
                            color="primary"
                            type="dot"
                            closable
                            checkable
                            v-for="(items, index) in tagsList" 
                            :name="items.title"
                            @on-close="tabsRemove"
                            @on-change="tabsClick(items.path, index, items.index, items.title, items.parent)"
                            >{{items.title}}</Tag>
                        </el-scrollbar>
                    </div>
                </el-header>
                <el-main class="top" id="top">
                    <transition name="xz-animation">
                        <router-view class="router"/>
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
                    <el-switch v-model="isShowLogo" @change="showLogo">
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
                @click="uploadLogo"
                >上传Logo</el-button>
            </div>
        </Drawer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: false,
            isFullScreen: false,
            isSmall: false,
            isMenuCollapse: false,
            isSetting: false,
            isShowLogo: true,
            isShowBackTop: false,
            logoUrl: "",
            menuList: [],
            breadcrumbList: [],
            tagsList: [{
                title: "首页",
                path: "/home/chart",
                index: "1"
            }],
            nowIndex: this.$getMemorySes('nowIndex') || 0,
            activeIndex: "1",
            squareUrl: "https://myinterface.xuanzai.top/getPicture?type=头像&id=8",
        }
    },
    mounted() {
        this.initialStyle()
        this.initialListener()
        // 获取视窗大小
        this.getWindowWidth()
        this.initialTags(),
        this.initialBreakcrumb(),
        this.initialScrollTop(true),
        this.navigateTo(this.tagsList[this.nowIndex].path),
        this.$nextTick(() => {
            this.changeTagStyle(this.nowIndex)
        })
        // 是否显示Logo
        this.isShowLogo = this.$getMemoryPmt('isShowLogo') || true
        // 获取浏览器标签页标题
        document.title = this.$getMemorySes('tagTitle') || "欢迎"
        // 获取菜单
        this.menuList = this.$store.state.menuList
        // 获取当前活动的标签页
        this.activeIndex = this.tagsList[this.nowIndex].index
    },
    methods: {
        // 跳转至项目地址
        openProject() {
            window.open('https://github.com/MikuBlog/xz-admin')
        },
        // 返回顶部
        backTop(delay = 500) {
            this.$$('.top').animate({scrollTop: 0}, delay)
        },
        // 退出登录
        logout() {
            // 退出前先清空用户访问记录
            this.deleteMsg()
            this.$router.push({path: '/login'})
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
        // 上传logo
        uploadLogo() {

        },
        // 全局设置显示菜单Logo
        showLogo(val) {
            this.$setMemoryPmt('isShowLogo', val)
        },
        // 打开设置抽屉
        showSetting() {
            this.isSetting = true
        },
        // 清空所有用户访问记录
        deleteMsg() {
            this.$setMemorySes('tagsList', '')
            this.$setMemorySes('nowIndex', '')
            this.$setMemorySes('tagTitle', '')
            this.$setMemorySes('breadcrumbList', '')
            localStorage.setItem('token', '')
        },
        // 保存当前用户访问记录
        saveMsg() {
            this.$setMemorySes('tagsList', this.tagsList)
            this.$setMemorySes('nowIndex', this.nowIndex)
            this.$setMemorySes('tagTitle', document.title)
            this.$setMemorySes('breadcrumbList', this.breadcrumbList)
        },
        // 初始化标签页
        initialTags() {
            let tagsList = this.$getMemorySes('tagsList')
            tagsList
            && (this.tagsList.splice(0, this.tagsList.length),
            tagsList.forEach(value => {
                this.tagsList.push(value)
            }))
        },
        // 初始化面包屑
        initialBreakcrumb() {
            let breadcrumbList = this.$getMemorySes('breadcrumbList')
            breadcrumbList
            && (this.breadcrumbList.splice(0, this.breadcrumbList.length),
            breadcrumbList.forEach(value => {
                this.breadcrumbList.push(value)
            }))
        },
        // 初始化当前滚动高度
        initialScrollTop(isIntial = false) {
            isIntial 
            ? document.querySelector('.top').scrollTop = this.$getMemorySes('scrollTop')
            : setTimeout(() => {
                document.querySelector('.top').scrollTop = 0
            }, 700)
        },
        // 改变标签样式
        changeTagStyle(index) {
            let dots = document.querySelectorAll('.ivu-tag-dot-inner')
            dots.forEach((value, ind) => {
                index == ind
                ? this.$setStyle(value, 'display', 'inline-block')
                : this.$setStyle(value, 'display', 'none')
            })
            this.nowIndex = index
        },
        // 添加面包屑
        addBreakcrumb(title, parent) {
            this.breadcrumbList.splice(0, this.breadcrumbList.length)
            parent
            && this.breadcrumbList.push(parent)
            title && title != "首页"
            && this.breadcrumbList.push(title)
            !parent && !title
            && (this.changeTagStyle(0), this.activeIndex = 1) 
        },
        // 点击标签
        tabsClick(path, index, menuInd, title, parent) {
            document.title = title
            this.nowIndex = index
            this.activeIndex = menuInd
            this.addBreakcrumb(title, parent)
            this.changeTagStyle(index)
            this.navigateTo(path)
            this.initialScrollTop()
            this.saveMsg()
        },
        // 移除所有标签
        removeAllTags() {
            this.tagsList.splice(1, this.nowIndex - 1)
            this.nowIndex == 0
            ? (this.tagsList.splice(1), this.changeTagStyle(0))
            : (this.tagsList.splice(2), this.changeTagStyle(1))
            this.saveMsg()
        },
        // 移除标签
        tabsRemove(event, title) {
            for(let i = 0, len = this.tagsList.length; i < len; i ++) {
                if(title == this.tagsList[i].title) {
                    this.tagsList.splice(i, 1)
                    this.changeTagStyle(this.nowIndex)
                    i == this.nowIndex
                    && (this.$router.push({path: `${this.tagsList[i-1].path}`}), this.changeTagStyle(this.nowIndex - 1))
                    this.saveMsg()
                    return
                }    
            }
        },
        // 添加标签
        addTag(path, title, index, parent) {
            let tabs = this.tagsList
            for(let i = 0, len = tabs.length; i < len; i ++) {
                if(tabs[i].title == title) return
            }
            this.tagsList.push({
                title: title,
                path: path,
                index: index,
                parent: parent
            })
            this.nowIndex = this.tagsList.length - 1
            this.saveMsg()
        },
        // 跳转路由
        navigateTo(path) {
            if(this.$route.path == path) return
            this.$Loading.finish()
            this.$router.push({ path })
        },
        // 判断当前点击的菜单在哪个标签
        findIndex(title) {
            let tags = this.tagsList
            for(let i = 0, len = tags.length; i < len; i ++) {
                if(tags[i].title == title) {
                    this.nowIndex = i
                }
            }
        },
        // 点击菜单项
        clickMenuItem(path, title, index, parent) {
            document.title = title
            this.isMenuCollapse = false
            this.addTag(path, title, index, parent)
            this.navigateTo(path)
            this.initialScrollTop()
            this.findIndex(title)
            this.changeTagStyle(this.nowIndex)
            this.addBreakcrumb(title, parent)
            this.saveMsg()
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
                tag = document.querySelector('.ivu-tag'),
                menuList = document.querySelector('.el-menu-vertical-demo'),
                drawerContent = document.querySelector('.ivu-drawer-content'),
                scrollContainer = document.querySelector('.el-scrollbar')
            this.$setStyle(drawer, 'padding', 0)
            this.$setStyle(tag.lastElementChild, 'display', 'none')
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
            : this.isCollapse = !this.isCollapse
        },
        getWindowWidth() {
            window.innerWidth < 1200
            && (this.isCollapse = true)
            window.innerWidth < 900
            ? this.isSmall = true
            : this.isSmall = false
            this.initialStyle()
        },
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
        overflow-y: auto;
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
        padding: 0 1rem;
        top:3px;
        font-size: 1.5rem;
        color: #686868;
        transition: .3s;
        cursor: pointer;
    }
    .menu-button:hover {
        background: #f8f8f8;
    }
    .el-icon-s-unfold, .el-icon-circle-close {
        transition: .3s;
    }
    .el-icon-s-unfold:active {
        color: rgb(19, 180, 255);
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
    .avatar-box {
        position: absolute;
        top: 0;
        right: 10px;
        width: 60px;
        height: 50px;
    }
    .el-dropdown {
        position: relative;
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
    .el-icon-caret-bottom {
        position: absolute;
        right: -2px;
        bottom: 5px;
    }
    .icon-box {
        position: absolute;
        top:3px;
        right: 75px;
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
    .icon-box:hover {
        background: #f8f8f8;
    }
    .el-icon-full-screen {
        font-size: 22px;
    }
    .el-header:last-of-type {
        height: 41px!important;
    }
    .tabs {
        position: relative;
        margin-left: 10px;
        white-space: nowrap;
        overflow: hidden;
    }
    .el-scrollbar__view {
        overflow: hidden!important;
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
        transition: all .6s .6s;
    }
    .xz-animation-leave-active {
        transition: all .6s;
    }
    .xz-animation-enter, .xz-animation-leave-to {
        transform: translateX(-50px);
        opacity: 0;
    }
</style>
