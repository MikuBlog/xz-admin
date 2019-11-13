<template>
  <fragment>
    <template v-for="navMenu in navMenus">
      <el-menu-item 
                    v-show="navMenu.enabled"
                    v-if="navMenu.children == null || !navMenu.children.some(val => val.enabled)"
                    :key="navMenu.name" 
                    :index="navMenu.path" 
                    @click="navigateTo(navMenu)"
                    >
        <svg-icon v-if="navMenu.meta.icon" :icon-class="navMenu.meta.icon" class="el-icon-location menu-icon" />
        <span slot="title" class="menu-title">{{navMenu.name}}</span>
      </el-menu-item>

      <el-submenu 
                  v-show="navMenu.enabled"
                  v-if="navMenu.children && navMenu.children.some(val => val.enabled)"
                  :key="navMenu.name" 
                  :index="navMenu.name"
                  :class="[navMenu.parentId != 0 ? 'black' : '']"
                  >
        <template slot="title">
          <svg-icon v-if="navMenu.meta.icon" :icon-class="navMenu.meta.icon" class="el-icon-location menu-icon"/>
          <span slot="title" class="menu-title">{{navMenu.name}}</span>
        </template>
        <el-menu-item-group>
          <NavMenu 
          :navMenus="navMenu.children"
          ></NavMenu>
        </el-menu-item-group>
      </el-submenu>
    </template>
  </fragment>
</template>

<script>
  export default {
    name: 'NavMenu',
    props: ['navMenus'],
    methods: {
      // 点击菜单项
      navigateTo(item) {
        if(item.iframe) {
          window.open(item.path)
        }else {
          this.$router.push({ path: item.path })
        }
      },
    }
  }
</script>

