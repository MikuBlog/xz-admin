<template>
  <div class="home" ref="home" id="home">
    <el-container>
      <el-scrollbar
        style="height:100%"
        class="menu-scrollbar"
        v-show="!isSmall"
        v-if="isVerticleMenu"
      >
        <el-menu
          :default-active="$route.path"
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
          background-color="#2f4055"
          active-text-color="#429ee2"
          text-color="#becad8"
          :unique-opened="true"
        >
          <div class="logo-verticle" v-show="showLogo" v-if="!isCollapse">
            <img src="@/assets/logo/catjoker.png" alt="logo.png" />
          </div>
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
            background-color="#2f4055"
            active-text-color="#429ee2"
            text-color="#becad8"
            width="200px"
            :unique-opened="true"
            @select="isMenuCollapse = false"
          >
            <div class="logo-verticle" v-show="showLogo">
              <img src="@/assets/logo/catjoker.png" alt="logo.png" />
            </div>
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
              background-color="#2f4055"
              active-text-color="#429ee2"
              text-color="#becad8"
              mode="horizontal"
              style="width: 100%"
            >
              <div class="logo-horizontal" v-show="showLogo">
                <img src="@/assets/logo/catjoker.png" alt="logo.png" />
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
              <el-tooltip class="item" effect="dark" content="样式设置" placement="bottom">
                <i class="el-icon-s-tools" 
                @click="showSetting"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
                <svg-icon 
                icon-class="全屏" 
                style="width: 24px; height: 24px; top: 1px"
                @click.native="fullScreen"/>
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
    <Drawer v-model="isSetting" width="350px">
      <h2 style="margin-top: 1rem">系统布局设置</h2>
      <el-divider></el-divider>
      <div class="switch-box">
        <div class="box">
          <span class="tips">显示Logo</span>
          <el-switch v-model="$store.state.setting.showLogo"></el-switch>
        </div>
        <div class="box">
          <span class="tips">显示标签页</span>
          <el-switch v-model="$store.state.setting.showTags"></el-switch>
        </div>
        <div class="box">
          <span class="tips">显示面包屑</span>
          <el-switch v-model="$store.state.setting.showBreadcrumb"></el-switch>
        </div>
        <div class="box">
          <span class="tips">是否为垂直菜单</span>
          <el-switch
            v-model="$store.state.setting.isVerticleMenu"
            @change="$nextTick(() => { initialStyle() })"
          ></el-switch>
        </div>
      </div>
      <el-image style="width: 100%; height: 159px" :src="logoUrl" fit="cover" ref="image"></el-image>
      <div class="button">
        <el-button type="primary" style="width: 100%" @click="selectPic">选择Logo</el-button>
      </div>
      <div class="button">
        <el-button type="warning" style="width: 100%">上传Logo</el-button>
      </div>
      <div class="button button-bottom">
        <el-button type="success" style="width: 100%" @click="saveSetting">保存设置</el-button>
      </div>
    </Drawer>
  </div>
</template>
<script>
import Main from "./index";
export default Main;
</script>
<style scoped src="./index.scss" lang="scss"></style>