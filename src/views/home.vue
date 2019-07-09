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
                        @click="clickMenuItem(items.path, items.title, items.index)" 
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
                                @click="clickMenuItem(child.path, child.title, child.index)"
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
                            @click="clickMenuItem(items.path, items.title, items.index)" 
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
                                    @click="clickMenuItem(child.path, child.title, child.index)"
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
                                <span class="iconfont iconfull_screen" @click="fullScreen"
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
                                        <img src="http://myinterface.xuanzai.top/getPicture?type=error"/>
                                    </el-avatar>
                                </div>
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item
                                    @click.native="clickMenuItem('/home/chart', '首页', '1')">首页</el-dropdown-item>
                                    <el-dropdown-item @click.native="clickMenuItem('/home/person', '个人中心', '2')"><span>个人中心</span></el-dropdown-item>
                                    <el-dropdown-item>项目地址</el-dropdown-item>
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
                            @on-change="tabsClick(items.path, index, items.index, items.title)"
                            >{{items.title}}</Tag>
                        </el-scrollbar>
                    </div>
                </el-header>
                <el-main class="top">
                    <transition name="el-fade-in-linear">
                        <router-view/>
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
                    <span class="tips">显示菜单Logo</span>
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
            menuList: [],
            logoUrl: "",
            tagsList: [{
                title: "首页",
                path: "/home/chart",
                index: "1"
            }],
            nowIndex: this.$getMemorySes('nowIndex') || 0,
            activeIndex: "1",
            squareUrl: "http://myinterface.xuanzai.top/getPicture?type=头像&id=8",
        }
    },
    mounted() {
        this.initialStyle()
        this.initialListener()
        // 获取视窗大小
        this.getWindowWidth()
        this.initialTags()
        this.navigateTo(this.tagsList[this.nowIndex].path)
        this.$nextTick(() => {
            this.changeTagStyle(this.nowIndex)
        })
        // 是否显示Logo
        this.isShowLogo = this.$getMemoryPmt('isShowLogo') || true
        // 获取浏览器标签页标题
        document.title = this.$getMemorySes('tagTitle')
        // 获取菜单
        this.menuList = this.$store.state.menuList
        // 获取当前活动的标签页
        this.activeIndex = this.tagsList[this.nowIndex].index
    },
    methods: {
        // 返回顶部
        backTop() {
            this.$$('.top').animate({scrollTop: 0}, 500)
        },
        // 退出登录
        logout() {
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
        // 保存当前标签页、索引、标题
        saveTagsAndInd() {
            this.$setMemorySes('tagsList', this.tagsList)
            this.$setMemorySes('nowIndex', this.nowIndex)
            this.$setMemorySes('tagTitle', document.title)
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
        // 点击标签
        tabsClick(path, index, menuInd, title) {
            document.title = title
            this.nowIndex = index
            this.activeIndex = menuInd
            this.$setMemorySes('menuInd', this.activeIndex)
            this.changeTagStyle(index)
            this.saveTagsAndInd()
            this.navigateTo(path)
        },
        // 移除所有标签
        removeAllTags() {
            this.tagsList.splice(1, this.nowIndex - 1)
            this.nowIndex == 0
            ? (this.tagsList.splice(1), this.changeTagStyle(0))
            : (this.tagsList.splice(2), this.changeTagStyle(1))
            this.saveTagsAndInd()
        },
        // 移除标签
        tabsRemove(event, title) {
            for(let i = 0, len = this.tagsList.length; i < len; i ++) {
                if(title == this.tagsList[i].title) {
                    this.tagsList.splice(i, 1)
                    this.changeTagStyle(this.nowIndex)
                    i == this.nowIndex
                    && (this.$router.push({path: `${this.tagsList[i-1].path}`}), this.changeTagStyle(this.nowIndex - 1))
                    this.saveTagsAndInd()
                    return
                }    
            }
        },
        // 添加标签
        addTag(path, title, index) {
            let tabs = this.tagsList
            for(let i = 0, len = tabs.length; i < len; i ++) {
                if(tabs[i].title == title) return
            }
            this.tagsList.push({
                title: title,
                path: path,
                index: index
            })
            this.nowIndex = this.tagsList.length - 1
            this.saveTagsAndInd()
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
        clickMenuItem(path, title, index) {
            document.title = title
            this.addTag(path, title, index)
            this.navigateTo(path)
            this.findIndex(title)
            this.changeTagStyle(this.nowIndex)
            this.saveTagsAndInd()
            this.isMenuCollapse = false
        },
        // 设置全屏与取消全屏
        fullScreen() {
            const ele = this.$refs.icon
            this.isFullScreen 
            ? (this.$cancelFullScreen(), this.$removeClass(ele, 'iconfullscreenexit'),
            this.$addClass(ele, 'iconfull_screen'))
            : (this.$setFullScreen(), this.$addClass(ele, 'iconfullscreenexit'),
            this.$removeClass(ele, 'iconfull_screen'))
            this.isFullScreen = !this.isFullScreen
        },
        // 初始化样式
        initialStyle() {
            const 
                eles = document.querySelectorAll('.el-scrollbar__wrap'),
                drawer = document.querySelector('.ivu-drawer-body'),
                tag = document.querySelector('.ivu-tag'),
                menuList = document.querySelector('.el-menu-vertical-demo'),
                drawerContent = document.querySelector('.ivu-drawer-content')
            this.$setStyle(drawer, 'padding', 0)
            this.$setStyle(tag.lastElementChild, 'display', 'none')
            this.$setStyle(drawerContent, 'background', '#2e3f54')
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
    .el-menu-item, .el-submenu__title {
        width: 200px;
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
        top:0;
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
    .iconfull_screen, .el-icon-s-tools, .iconfullscreenexit {
        transition: .3s;
    }
    .iconfull_screen:active {
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
    .iconfont {
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
        z-index: 9999;
        right: 40px;
        bottom: 40px;
    }
</style>
