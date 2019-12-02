<script>
export default {
  created() {
    const { query } = this.$route
    this.$router.replace({ path: query.path })
  },
  render(h) {
    return h()
  },
}
</script>