<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  created() {
    this.checkStatus()
  },
  methods: {
    // 验证是否登录过
    checkStatus() {
           
    },
  }
}
</script>
<style lang="scss">

</style>
