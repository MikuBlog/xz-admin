<template>
  <div class="home" ref="home" id="home">
    <el-container>
      <el-aside width="auto">
        <el-scrollbar
          style="height:100%"
          class="menu-scrollbar"
          v-show="!isSmall && isVerticleMenu"
        >
          <el-menu
            :default-active="$route.path"
            :collapse="isCollapse"
            class="el-menu-vertical-demo collapse-menu"
            :background-color="menuBackgroundColor"
            :active-text-color="activeTextColor"
            :text-color="menuTextColor"
            :unique-opened="true"
          >
            <el-image
              :src="logoUrl"
              fit="cover"
              class="logo-verticle"
              v-show="showLogo"
              v-if="!isCollapse"
              @click.native="$router.push({ path: '/home/welcome' })"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <el-divider v-if="menuStyle !== 'dark' && isCollapse === false && showLogo"></el-divider>
            <NavMenu :navMenus="menuList"></NavMenu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
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
            <el-image
              :src="logoUrl"
              fit="cover"
              class="logo-verticle"
              v-show="showLogo"
              @click.native="$router.push({ path: '/home/welcome' })"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <el-divider v-if="menuStyle !== 'dark' && showLogo"></el-divider>
            <NavMenu :navMenus="menuList"></NavMenu>
          </el-menu>
        </el-scrollbar>
      </Drawer>
      <el-container class="container-background">
        <div class="background" ref="background">
          <div class="mask" ref="mask"></div>
        </div>
        <div class="menu" v-show="!isVerticleMenu">
          <el-scrollbar style="height:60px; width: 100%;" class="menu-horizontal-scrollbar">
            <el-menu
              :default-active="$route.path"
              class="el-menu-demo menu-horizontal"
              :background-color="menuBackgroundColor"
              :active-text-color="activeTextColor"
              :text-color="menuTextColor"
              mode="horizontal"
              style="width: 100%"
            >
              <el-image
                :src="logoUrl"
                fit="contain"
                class="logo-horizontal"
                v-show="showLogo"
                @click.native="$router.push({ path: '/home/welcome' })"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <NavMenu class="menu-horizontal-item" :navMenus="menuList"></NavMenu>
            </el-menu>
          </el-scrollbar>
        </div>
        <el-header class="navbar-box" style="height: 50px;">
          <div class="navbar">
            <el-dropdown trigger="click" size="small" class="avatar-dropdown">
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
              <el-tooltip
                class="item"
                effect="dark"
                content="搜索菜单项"
                placement="bottom"
                v-show="defaultConfig.searchMenu && !isMini"
              >
                <search class="search-menu-input" />
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="查看帮助"
                placement="bottom"
                v-show="defaultConfig.helpPage"
              >
                <i class="el-icon-question" @click="$router.push({ path: '/home/docs' })"></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="布局大小"
                placement="bottom"
                v-show="defaultConfig.layoutSize"
              >
                <el-dropdown trigger="click" size="small">
                  <div>
                    <svg-icon icon-class="font-size" class="table-size" />
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        :disabled="layoutSize === ''"
                        @click.native="setTableSize('')"
                      >Default</el-dropdown-item>
                      <el-dropdown-item
                        :disabled="layoutSize === 'medium'"
                        @click.native="setTableSize('medium')"
                      >Medium</el-dropdown-item>
                      <el-dropdown-item
                        :disabled="layoutSize === 'small'"
                        @click.native="setTableSize('small')"
                      >Small</el-dropdown-item>
                      <el-dropdown-item
                        :disabled="layoutSize === 'mini'"
                        @click.native="setTableSize('mini')"
                      >Mini</el-dropdown-item>
                    </el-dropdown-menu>
                  </div>
                </el-dropdown>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="清除缓存"
                placement="bottom"
                v-show="defaultConfig.clearStorage"
              >
                <i class="el-icon-delete-solid" @click="clearStorage"></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="样式设置"
                placement="bottom"
                v-show="defaultConfig.systemSetting"
              >
                <i class="el-icon-s-tools" @click="showSetting"></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="全屏"
                placement="bottom"
                v-show="defaultConfig.fullScreen"
              >
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
                <i class="el-icon-circle-close" @click="removeTags"></i>
              </el-tooltip>
            </div>
            <div class="breadcrumb" v-show="showBreadcrumb && !isMini">
              <Breadcrumb></Breadcrumb>
            </div>
          </div>
          <div class="border" style="border-color: #f0f0f0"></div>
        </el-header>
        <div class="tabs" v-show="showTags">
          <div class="flex-box">
            <Tag :tagsList="tagsList" class="tag-list" />
            <el-button
              class="refresh-button"
              :round="false"
              icon="el-icon-refresh-left"
              @click="refreshPage()"
              size="small"
            ></el-button>
          </div>
        </div>
        <el-main class="top" id="top">
          <transition name="xz-animation" mode="out-in">
            <router-view @updateUserInfo="getUserInfo" class="router" />
          </transition>
          <div class="back-top">
            <el-button
              type="primary"
              icon="el-icon-top"
              circle
              class="to-top"
              @click="backTop"
              size="large"
            ></el-button>
          </div>
        </el-main>
        <el-footer class="footer" height="30px">
          <div class="coppy-right">
            <span>© 2019 xuanzai Wteam.All rights reserved.</span>
          </div>
        </el-footer>
      </el-container>
    </el-container>
    <settingDrawer ref="setting" />
  </div>
</template>
<script>
import Initial from "./mixins/initial";
import Operation from "./mixins/operation";
import Property from "./mixins/property";
import settingDrawer from "./components/setting_drawer";
export default {
  mixins: [Initial, Operation, Property],
  components: { settingDrawer }
};
</script>
<style lang="scss" scoped src="./style/index.scss"></style>