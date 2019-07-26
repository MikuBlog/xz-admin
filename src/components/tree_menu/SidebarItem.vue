<template>
  <fragment>
    <template v-for="navMenu in navMenus">
      <el-menu-item v-if="navMenu.children==null"
                    :key="navMenu.name" 
                    :index="navMenu.name" 
                    @click="clickMenuItem(navMenu)"
                    >
        <svg-icon :icon-class="navMenu.meta.icon" class="el-icon-location menu-icon" />
        <span slot="title" class="menu-title">{{navMenu.name}}</span>
      </el-menu-item>

      <el-submenu v-if="navMenu.children"
                  :key="navMenu.name" 
                  :index="navMenu.name"
                  >
        <template slot="title">
          <svg-icon :icon-class="navMenu.meta.icon" class="el-icon-location menu-icon"/>
          <span slot="title" class="menu-title">{{navMenu.name}}</span>
        </template>
        <el-menu-item-group>
          <NavMenu 
          :navMenus="navMenu.children"
          @getMenuItem="clickMenuItem"></NavMenu>
        </el-menu-item-group>
      </el-submenu>
    </template>
  </fragment>
</template>

<script>
  export default {
    name: 'NavMenu',
    props: ['navMenus'],
    data() {
      return {}
    },
    methods: {
      // 点击菜单项
      clickMenuItem(item) {
        this.$emit("getMenuItem", item)
      },
    }
  }
</script>

