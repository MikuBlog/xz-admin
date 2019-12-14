<template>
  <Layout ref="layout" />
</template>

<script>
import Layout from './Layout/index'
export default {
  components: { Layout },
  created() {
    document.title = "500"
  },
  mounted() {
    const ele = this.$refs.layout
    ele.title = "500"
    ele.content = "Server Error."
  },
}
</script>