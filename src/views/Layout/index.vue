<template>
  <div class="home" ref="home" id="home">
    <el-container>
      <el-scrollbar style="height:100%" class="menu-scrollbar" v-show="!isSmall && isVerticleMenu">
        <el-menu
          :default-active="$route.path"
          :collapse="isCollapse"
          class="el-menu-vertical-demo collapse-menu"
          :background-color="menuBackgroundColor"
          :active-text-color="activeTextColor"
          :text-color="menuTextColor"
          :unique-opened="true"
        >
          <div class="logo-verticle" v-show="showLogo" v-if="!isCollapse">
            <img :src="logoUrl" alt="logo.png" />
          </div>
          <el-divider v-if="menuStyle !== 'dark' && isCollapse === false && showLogo"></el-divider>
          <NavMenu :navMenus="menuList"></NavMenu>
        </el-menu>
      </el-scrollbar>
      <Drawer
        class="drawer-menu"
        v-show="isSmall"
        v-model="isMenuCollapse"
        width="200"
        placement="left"
      >
        <el-scrollbar style="height:100%">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo menu-list"
            :background-color="menuBackgroundColor"
            :active-text-color="activeTextColor"
            :text-color="menuTextColor"
            width="200px"
            :unique-opened="true"
            @select="isMenuCollapse = false"
          >
            <div class="logo-verticle" v-show="showLogo">
              <img :src="logoUrl" alt="logo.png" />
            </div>
            <el-divider v-if="menuStyle !== 'dark' && showLogo"></el-divider>
            <NavMenu :navMenus="menuList"></NavMenu>
          </el-menu>
        </el-scrollbar>
      </Drawer>
      <el-container>
        <div class="menu" v-show="!isVerticleMenu">
          <el-scrollbar style="height:60px; width: 100%;">
            <el-menu
              :default-active="$route.path"
              class="el-menu-demo menu-horizontal"
              :background-color="menuBackgroundColor"
              :active-text-color="activeTextColor"
              :text-color="menuTextColor"
              mode="horizontal"
              style="width: 100%"
            >
              <div class="logo-horizontal" v-show="showLogo">
                <img :src="logoUrl" alt="logo.png" />
              </div>
              <NavMenu class="menu-horizontal-item" :navMenus="menuList"></NavMenu>
            </el-menu>
          </el-scrollbar>
        </div>
        <el-header style="height: 50px;">
          <div class="navbar">
            <el-dropdown trigger="click">
              <div class="avatar-box">
                <div class="block">
                  <el-avatar shape="square" :size="45" :src="squareUrl">
                    <img src="https://myinterface.xuanzai.top/getPicture?type=error" />
                  </el-avatar>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="navigateTo('/home/welcome')">首页</el-dropdown-item>
                  <el-dropdown-item @click.native="navigateTo('/home/person')">个人中心</el-dropdown-item>
                  <el-dropdown-item @click.native="openNewPage()">项目地址</el-dropdown-item>
                  <div class="line"></div>
                  <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </div>
            </el-dropdown>
            <div class="icon-box">
              <el-tooltip class="item" effect="dark" content="查看帮助" placement="bottom" v-show="defaultConfig.helpPage">
                <i class="el-icon-question" @click="toHelp"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="样式设置" placement="bottom" v-show="defaultConfig.systemSetting">
                <i class="el-icon-s-tools" @click="showSetting"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="全屏" placement="bottom" v-show="defaultConfig.fullScreen">
                <svg-icon
                  icon-class="全屏"
                  style="width: 24px; height: 24px; top: 1px"
                  @click.native="fullScreen"
                />
              </el-tooltip>
            </div>
            <div class="menu-button">
              <el-tooltip
                class="item"
                effect="dark"
                content="展开菜单"
                placement="bottom"
                v-if="isVerticleMenu"
              >
                <i class="el-icon-s-unfold" @click="showMenu"></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除所有标签页"
                placement="bottom"
                v-show="$store.state.setting.showTags"
              >
                <i class="el-icon-circle-close" @click="removeTags" title="删除所有标签页"></i>
              </el-tooltip>
            </div>
            <div class="breadcrumb" v-show="showBreadcrumb">
              <Breadcrumb></Breadcrumb>
            </div>
          </div>
          <div class="border" style="border-color: #f0f0f0"></div>
        </el-header>
        <div class="tabs" v-show="showTags">
          <Tag :tagsList="tagsList" />
        </div>
        <el-main class="top" id="top">
          <transition name="xz-animation">
            <router-view @updateUserInfo="getUserInfo" class="router" />
          </transition>
          <div class="back-top">
            <el-button
              type="primary"
              icon="el-icon-top"
              circle
              class="to-top"
              @click="backTop"
              v-show="isShowBackTop"
            ></el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <settingDrawer ref="setting" />
  </div>
</template>
<script>
import Main from "./index";
export default Main;
</script>
<style scoped src="./index.scss" lang="scss"></style>