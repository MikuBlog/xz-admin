<template>
  <div id="app">
		<router-view/>
  </div>
</template>

<!-- <script>
export default {
	created() {
		document.addEventListener('keypress', (e) => {
			if(e.keyCode === 13) {
				
			}
		})
	}
}
</script> -->

<style lang="scss">
  #app {
    position: relative;
    height: 100%;
    overflow-y: auto;
  }
</style>
