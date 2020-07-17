import http from '@/api/http'

function downloadTemplate(url, fileName) {
	http.http_normal({
		url,
		responseType: 'blob',
		method: "get"
	}).then(result => {
		if(window.navigator.msSaveBlob) {
			try {
				window.navigator.msSaveBlob(result.data, fileName || arr[arr.length - 1])
			} catch(e) {
				console.log(e)
			}
		}else {
			const a = document.createElement('a')
			a.download = fileName || new Date().getTime()
			a.href = window.URL.createObjectURL(result.data)
			a.click()
		}
	})
}

export default downloadTemplate
