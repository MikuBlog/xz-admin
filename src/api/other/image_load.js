	// 图片加载
	function imageLoad(url = "") {
		const ele = document.querySelectorAll('.xz-image')
		ele.forEach(val => {
      const image = new Image()
			image.src = val.dataset.src
			val.src = url
			initialStyle(val, 'stop')
			initialListener(image, val)
		})
	}
	
	// 给图片加初始样式
	function initialStyle(val, param) {
		param === 'run'
		? val.style["animation-play-state"] = "running"
		: val.style["animation-play-state"] = "paused"
	}
	
	
	// 监听图片事件
	function initialListener(image, val) {
		image.addEventListener('load', () => {
			val.src = image.src
			initialStyle(val, 'run')
		})
  }
  
  export default imageLoad