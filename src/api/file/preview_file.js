/**
 * @author xuanzai
 * @description 在线预览文件
 * @param {String} url 
 */
function previewFile(url) {
    if(!url) {
        return
    }
    const 
        strArr = url.split('.'),
        len = strArr.length,
        type = strArr[len - 1].toLowerCase(),
        iframe = document.createElement('iframe')
        iframe.style.cssText = `
            width: 100%;
            height: 100%;
        `
    if(type == 'doc'|| type == 'docx'|| type == 'xls' || type == 'xlsx' || type == 'ppt' || type == 'pptx') {
        let newPage = window.open('', type)
        iframe.src = `https://view.officeapps.live.com/op/view.aspx?src=${url}`
		newPage.document.body.appendChild(iframe)
    }else {
        window.open(url)
    }	
}

export default {
    previewFile
}