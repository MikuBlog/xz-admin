<template>
  <fragment>
    <template v-for="navMenu in navMenus">
      <el-menu-item 
                    v-show="navMenu.enabled"
                    v-if="navMenu.children==null"
                    :key="navMenu.name" 
                    :index="navMenu.path" 
                    @click="navigateTo(navMenu)"
                    >
        <svg-icon :icon-class="navMenu.meta.icon" class="el-icon-location menu-icon" />
        <span slot="title" class="menu-title">{{navMenu.name}}</span>
      </el-menu-item>

      <el-submenu 
                  v-show="navMenu.enabled"
                  v-if="navMenu.children"
                  :key="navMenu.name" 
                  :index="navMenu.name"
                  :class="[navMenu.parentId != 0 ? 'black' : '']"
                  >
        <template slot="title">
          <svg-icon :icon-class="navMenu.meta.icon" class="el-icon-location menu-icon"/>
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
    },
    mounted() {
      document
        .querySelectorAll('.black .el-submenu__title')
        .forEach(value => {
          this.$setStyle(value, 'background', '#1e2c3c')
          value.addEventListener('mouseenter', () => {
            this.$setStyle(value, 'background', '#263344')
          })
          value.addEventListener('mouseleave', () => {
            this.$setStyle(value, 'background', '#1e2c3c')
          })
        })
    },
  }
</script>

