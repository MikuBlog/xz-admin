<template>
  <iframe ref="iframe" src="https://xzadmin-docs.xuanzai.top" frameborder="0"></iframe>
</template>
<script>
export default {
  beforeDestroy() {
    window.removeEventListener('resize', this.initialStyle)
  },
  mounted() {
    this.initialStyle()
    this.initialStyleListener()
  },
  methods: {
    initialStyle() {
      this.$setStyle(this.$refs.iframe, 'height', `${document.querySelector("#top").offsetHeight}px`)
    },
    initialStyleListener() {
      window.addEventListener('resize', this.initialStyle)
    }
  },
}
</script>
<style lang="scss" scoped> 
  iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%; 
  }
</style>