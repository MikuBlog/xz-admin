<script>
export default {
  created() {
    const { query } = this.$route
    this.$router.replace({ path: `${query.path}${Object.keys(query)
		.filter(val => val !== 'path')
		.map(val => `&${val}=${query[val]}`)
		.join("")}` })
  },
  render(h) {
    return h()
  },
}
</script>