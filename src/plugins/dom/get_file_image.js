// 选择文件获取图片url
function getImgFile() {
    return new Promise((resolve, reject) => {
        let
            reader = new FileReader(),
            pattern = new RegExp(/^image/),
            fileEle = document.createElement('input'),
            event = new MouseEvent('click')
        fileEle.type = "file"
        fileEle.accept = "image/jpeg, image/png"
        fileEle.dispatchEvent(event)
        fileEle.addEventListener('change', () => {
            const files = fileEle.files[0]
            files.size / (1024 ** 2) > 2
            ? reject('图片大小超过2MB!')
            : (pattern.test(files.type)
            ? reader.readAsDataURL(files)
            : reject('请选择图片!'))
        })
        reader.addEventListener('load', () => {
            resolve(reader.result)
        })
    })
}

export default {
    getImgFile
}