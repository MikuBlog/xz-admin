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
	    fileEle.addEventListener('change', () => {
	        const files = fileEle.files[0]
	        reader.readAsText(files, 'gb2312')
	    })
	    reader.addEventListener('load', () => {
	        resolve(reader.result)
	    })
	    fileEle.dispatchEvent(event)
	})
}

export default getTxt