<template>
  <Layout ref="layout" />
</template>

<script>
import Layout from './Layout/index'
export default {
  components: { Layout },
  created() {
    document.title = "404"
  },
  mounted() {
    const ele = this.$refs.layout
    ele.title = "404"
    ele.content = "That Page has gone missing."
  },
}
</script>