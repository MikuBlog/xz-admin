import { element } from 'protractor';
<template>
    <div class="home" ref="home">
        <el-container>
            <el-scrollbar 
            style="height:100%" 
            v-show="!isSmall">
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse"
                background-color="#2f4055"
                active-text-color="#429ee2"
                text-color="#becad8">
                    <el-submenu index="1">
                            <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">导航一</span>
                            </template>
                            <el-menu-item-group>
                                <span slot="title">分组一</span>
                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group title="分组2">
                                <el-menu-item index="1-3">选项3</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                                <span slot="title">选项4</span>
                                <el-menu-item index="1-4-1">选项1</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
                        </el-menu-item>
                        <el-menu-item index="3" disabled>
                            <i class="el-icon-document"></i>
                            <span slot="title">导航三</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                        <el-menu-item index="5">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                        <el-menu-item index="6">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                        <el-menu-item index="7">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                        <el-menu-item index="8">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                        <el-menu-item index="9">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                        <el-menu-item index="10">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                        <el-menu-item index="11">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                        <el-menu-item index="12">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                        <el-menu-item index="13">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                        <el-menu-item index="14">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                        <el-menu-item index="15">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                        <el-menu-item index="16">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                </el-menu>
            </el-scrollbar>
            <Drawer 
            v-show="isSmall" 
            v-model="isMenuCollapse"
            placement="left">
                <el-scrollbar style="height:100%">
                    <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
                    background-color="#2f4055"
                    active-text-color="#429ee2"
                    text-color="#becad8">
                        <el-submenu index="1">
                                <template slot="title">
                                <i class="el-icon-location"></i>
                                <span slot="title">导航一</span>
                                </template>
                                <el-menu-item-group>
                                    <span slot="title">分组一</span>
                                    <el-menu-item index="1-1">选项1</el-menu-item>
                                    <el-menu-item index="1-2">选项2</el-menu-item>
                                    </el-menu-item-group>
                                    <el-menu-item-group title="分组2">
                                    <el-menu-item index="1-3">选项3</el-menu-item>
                                </el-menu-item-group>
                                <el-submenu index="1-4">
                                    <span slot="title">选项4</span>
                                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                                </el-submenu>
                            </el-submenu>
                            <el-menu-item index="2">
                                <i class="el-icon-menu"></i>
                                <span slot="title">导航二</span>
                            </el-menu-item>
                            <el-menu-item index="3" disabled>
                                <i class="el-icon-document"></i>
                                <span slot="title">导航三</span>
                            </el-menu-item>
                            <el-menu-item index="4">
                                <i class="el-icon-setting"></i>
                                <span slot="title">导航四</span>
                            </el-menu-item>
                            <el-menu-item index="5">
                                <i class="el-icon-setting"></i>
                                <span slot="title">导航四</span>
                            </el-menu-item>
                            <el-menu-item index="6">
                                <i class="el-icon-setting"></i>
                                <span slot="title">导航四</span>
                            </el-menu-item>
                            <el-menu-item index="7">
                                <i class="el-icon-setting"></i>
                                <span slot="title">导航四</span>
                            </el-menu-item>
                            <el-menu-item index="8">
                                <i class="el-icon-setting"></i>
                                <span slot="title">导航四</span>
                            </el-menu-item>
                            <el-menu-item index="9">
                                <i class="el-icon-setting"></i>
                                <span slot="title">导航四</span>
                            </el-menu-item>
                            <el-menu-item index="10">
                                <i class="el-icon-setting"></i>
                                <span slot="title">导航四</span>
                            </el-menu-item>
                            <el-menu-item index="11">
                                <i class="el-icon-setting"></i>
                                <span slot="title">导航四</span>
                            </el-menu-item>
                            <el-menu-item index="12">
                                <i class="el-icon-setting"></i>
                                <span slot="title">导航四</span>
                            </el-menu-item>
                            <el-menu-item index="13">
                                <i class="el-icon-setting"></i>
                                <span slot="title">导航四</span>
                            </el-menu-item>
                            <el-menu-item index="14">
                                <i class="el-icon-setting"></i>
                                <span slot="title">导航四</span>
                            </el-menu-item>
                            <el-menu-item index="15">
                                <i class="el-icon-setting"></i>
                                <span slot="title">导航四</span>
                            </el-menu-item>
                            <el-menu-item index="16">
                                <i class="el-icon-setting"></i>
                                <span slot="title">导航四</span>
                            </el-menu-item>
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
                            <span class="iconfont iconicon-" @click="fullScreen"
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
                                    <el-dropdown-item>个人中心</el-dropdown-item>
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
                        <el-tabs v-model="editableTabsValue" type="card"
                        :closable="true">
                            <el-tab-pane
                            :key="item.name"
                            v-for="(item, index) in editableTabs"
                            :label="item.title"
                            :name="item.name"
                        >
                        </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-header>
                <el-main>
                    <transition name="transitionRouter">
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
            editableTabsValue: "1",
            editableTabs: [{
                title: '首页',
                name: '1',
                content: 'Tab 1 content'
            },
            {
                title: 'Tab 1',
                name: '2',
                content: 'Tab 1 content'
            }]
        }
    },
    created() {

    },
    mounted() {
        // 样式初始化
        this.initialStyle()
        this.eventListen()
        this.getWindowWidth()
    },
    methods: {
        // 设置全屏与取消全屏
        fullScreen() {
            const ele = this.$refs.icon
            this.isFullScreen 
            ? (this.$cancelFullScreen(), this.$removeClass(ele, 'iconquxiaoquanping'),
            this.$addClass(ele, 'iconicon-'))
            : (this.$setFullScreen(), this.$addClass(ele, 'iconquxiaoquanping'),
            this.$removeClass(ele, 'iconicon-'))
            this.isFullScreen = !this.isFullScreen
        },
        initialStyle() {
            const 
                eles = document.querySelectorAll('.el-scrollbar__wrap'),
                drawer = document.querySelector('.ivu-drawer-body'),
                close = document.querySelector('.el-tabs__new-tab'),
                tabsCard = document.querySelector('.el-tabs--card .el-tabs__header'),
                tabsBorder = document.querySelectorAll('.el-tabs__item')
            eles.forEach(value => {
                this.$setStyle(value, 'overflow-x', 'hidden')
            })
            this.$setStyle(drawer, 'padding', 0)
            this.isMenuCollapse = false
        },
        // 显示菜单
        showMenu() {
            if(this.isSmall) {
                this.isMenuCollapse = !this.isMenuCollapse
            }else {
                this.isCollapse = !this.isCollapse
            }
        },
        getWindowWidth() {
            window.innerWidth < 900
            ? this.isSmall = true
            : this.isSmall = false
            this.initialStyle()
        },
        eventListen() {
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
    .transitionRouter-enter-active {
        animation: fold-in .3s ease-in .5s;
        opacity: 0;
    }
    .transitionRouter-leave-active {
        animation: fold-out .3s ease-in;
        opacity: 0;
    }
    .ivu-drawer-body {
        padding: 0!important;
    }
    @keyframes fold-in {
        0% {
            transform: translate3d(0, 100%, 0);
            opacity: 0;
        }
        50% {
            transform: translate3d(0, 50%, 0);
        }
        100% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
    }
    @keyframes fold-out {
        0% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
        50% {
            transform: translate3d(0, 50%, 0);
        }
        100% {
            transform: translate3d(0, 100%, 0);
            opacity: 0;
        }
    }
    .el-header:last-of-type {
        height: 41px!important;
    }
    .tabs {
        position: relative;
        margin-left: 10px;
    }
</style>
