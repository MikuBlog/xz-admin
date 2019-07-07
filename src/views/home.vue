import { element } from 'protractor';
<template>
    <div class="home" ref="home">
        <el-container>
            <el-scrollbar 
            style="height:100%" 
            v-show="!isSmall">
                <el-menu 
                :default-active="activeIndex" 
                class="el-menu-vertical-demo menu-list" 
                :collapse="isCollapse"
                background-color="#2f4055"
                active-text-color="#429ee2"
                text-color="#becad8"
                width="200px"
                :unique-opened="true"
                @select="getMenu">
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
            height="auto"
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
                    @select="getMenu">
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
                            <i 
                            class="el-icon-s-unfold" @click="showMenu"></i>
                        </div>
                        <div class="icon-box">
                            <span class="iconfont iconfull_screen" @click="fullScreen"
                            ref="icon"
                            ></span>
                        </div>
                        <div class="avatar-box">
                            <el-dropdown trigger="click">
                                <img 
                                class="image"
                                src="http://myinterface.xuanzai.top/getPicture?type=头像&id=1" alt="avatar.png">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>首页</el-dropdown-item>
                                    <el-dropdown-item @click.native="clickMenuItem('/home/person', '个人中心', '2')"><span>个人中心</span></el-dropdown-item>
                                    <el-dropdown-item>项目地址</el-dropdown-item>
                                    <div class="line"></div>
                                    <el-dropdown-item>退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                </el-header>
                <el-header>
                    <div class="tabs">
                        <Tag 
                        color="primary"
                        type="dot"
                        closable
                        checkable
                        v-for="(items, index) in tagsList" 
                        :name="items.title"
                        @on-close="tabsRemove"
                        @on-change="tabsClick(items.path, index, items.index)"
                        >{{items.title}}</Tag>
                    </div>
                </el-header>
                <el-main>
                    <transition name="el-fade-in-linear">
                        <router-view/>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
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
            menuList: [{
                title: "首页",
                path: "/home/chart",
                index: "1",
                icon: "el-icon-menu"
            }, {
                title: "个人中心",
                path: "/home/person",
                index: "2",
                icon: "el-icon-user-solid"
            }, {
                title: "文章管理",
                index: "3",
                icon: "el-icon-edit",
                children: [{
                    title: "添加文章",
                    path: "/home/add_article",
                    index: "3-1",
                    icon: "el-icon-tickets"
                }]
            }],
            tagsList: [{
                title: "首页",
                path: "/home/chart",
                index: "1"
            }],
            nowIndex: this.$getMemory('nowIndex') || 0,
            activeIndex: "1"
        }
    },
    mounted() {
        // 样式初始化
        this.initialStyle()
        // 监听器初始化
        this.eventListener()
        // 获取视窗大小
        this.getWindowWidth()
        this.initialTags()
        this.navigateTo(this.tagsList[this.nowIndex].path)
        this.$nextTick(() => {
            this.changeTagStyle(this.nowIndex)
        })
        this.activeIndex = this.tagsList[this.nowIndex].index
    },
    methods: {
        // 初始化标签页
        initialTags() {
            let tagsList = this.$getMemory('tagsList', true)
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
                if(index == ind) {
                    this.$setStyle(value, 'display', 'inline-block')
                }else {
                    this.$setStyle(value, 'display', 'none')
                }
            })
            this.nowIndex = index
        },
        // 点击标签
        tabsClick(path, index, menuInd) {
            this.nowIndex = index
            this.activeIndex = menuInd
            this.$setMemory('menuInd', this.activeIndex)
            this.changeTagStyle(index)
            this.navigateTo(path)
        },
        // 移除标签
        tabsRemove(event, title) {
            for(let i = 0, len = this.tagsList.length; i < len; i ++) {
                if(title == this.tagsList[i].title) {
                    this.tagsList.splice(i, 1)
                    this.changeTagStyle(this.nowIndex)
                    i == this.nowIndex
                    && (this.$router.push({path: `${this.tagsList[i-1].path}`}), this.changeTagStyle(this.nowIndex - 1))
                    this.$setMemory('tagsList', this.tagsList)
                    this.$setMemory('nowIndex', this.nowIndex)
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
            this.$setMemory('tagsList', this.tagsList)
            this.$setMemory('nowIndex', this.nowIndex)
        },
        // 跳转路由
        navigateTo(path) {
            if(this.$route.path == path) return
            this.$Loading.finish()
            this.$router.push({path})
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
        // 路由跳转
        clickMenuItem(path, title, index) {
            this.addTag(path, title, index)
            this.navigateTo(path)
            this.findIndex(title)
            this.changeTagStyle(this.nowIndex)
            this.isMenuCollapse = false
        },
        // 菜单激活回调
        getMenu(index, indexPath) {
            this.activeIndex = '1-1'
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
            eles.forEach(value => {
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
            window.innerWidth < 900
            ? this.isSmall = true
            : this.isSmall = false
            this.initialStyle()
        },
        // 事件监听
        eventListener() {
            window.addEventListener('resize', () => {
                this.getWindowWidth()
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
        margin-left: 1rem;
        font-size: 1.5rem;
        color: #686868;
        cursor: pointer;
        transition: .3s;
    }
    .menu-button:active {
        color: rgb(19, 180, 255);
    }
    .el-menu-item {
        position: relative;
        padding-right: 5rem;
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
        right: 0;
        bottom: 10px;
    }
    .icon-box {
        position: absolute;
        top:0;
        right: 70px;
        width: 50px;
        height: 50px;
        line-height: 50px;
        color: #676767;
        text-align: center;
        transition: .3s;
    }
    .icon-box:hover {
        background: #f8f8f8;
    }
    .iconfont {
        font-size: 1.6rem;
    }
    .el-header:last-of-type {
        height: 41px!important;
    }
    .tabs {
        position: relative;
        margin-left: 10px;
    }
</style>
