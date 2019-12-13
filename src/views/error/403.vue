<template>
  <Layout ref="layout" />
</template>

<script>
import Layout from './Layout/index'
export default {
  components: { Layout },
  created() {
    document.title = "403"
  },
  mounted() {
    const ele = this.$refs.layout
    ele.title = "403"
    ele.content = "This interface is forbidden."
  },
}
</script>