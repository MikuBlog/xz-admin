function getTxt() {
	return new Promise((resolve, reject) => {
	    let
	        reader = new FileReader(),
	        fileEle = document.createElement('input'),
	        event = new MouseEvent('click'),
					pattern = new RegExp(/txt$/g),
	        data = {}
	    fileEle.type = "file"
	    fileEle.accept = "text/plain"
			fileEle.style.display = 'none'
	    fileEle.addEventListener('change', () => {
	        const files = fileEle.files[0]
	        reader.readAsText(files, 'gb2312')
					document.body.removeChild(fileEle)
	    })
	    reader.addEventListener('load', () => {
	        resolve(reader.result)
	    })
	    fileEle.dispatchEvent(event)
			document.body.appendChild(fileEle)
	})
}

export default getTxt