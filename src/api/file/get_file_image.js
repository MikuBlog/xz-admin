/**
 * @author xuanzai
 * @description 选择文件获取图片url
 * @param {Number} limit 图片大小限制，默认为2MB
 * @param {Number} quality 图片大小限制，默认为0.7，范围为(0-1]
 * @returns {Promise}
 */
import lrz from "lrz";

function getImgFile(limit = 2, quality = 0.7) {
    return new Promise((resolve, reject) => {
        let
            reader = new FileReader(),
            pattern = new RegExp(/^image/),
            fileEle = document.createElement('input'),
            event = new MouseEvent('click'),
            data = {}
        fileEle.type = "file"
        fileEle.accept = "image/*"
        fileEle.style.display = 'none'
        fileEle.addEventListener('change', async () => {
            let files = fileEle.files[0]

            await compressImageFile(files, quality).then(res => {
                console.log(res)
                files = res
            })

            data.raw = files

            files.size / (1024 ** 2) > limit ?
                reject(`图片大小不能超过${limit}MB!`) :
                (pattern.test(files.type) ?
                    reader.readAsDataURL(files) :
                    reject('请选择图片!'))
            document.body.removeChild(fileEle)
        })
        reader.addEventListener('load', () => {
            data.url = reader.result
            resolve(data)
        })
        fileEle.dispatchEvent(event)
        document.body.appendChild(fileEle)
    })
}

/**
 * @author wenfeng
 * @description 压缩图片文件
 * @param {File} file 
 * @param {Number} quality 压缩质量 范围:(0-1]
 * @returns {Promise}
 */
function compressImageFile(file, quality = 0.7) {
    return new Promise((resolve, reject) => {
        lrz(file, {
                quality: quality
            }).then(function (rst) {
                // 处理成功会执行
                let newFile = new File([rst.file], rst.origin.name, {
                    type: rst.origin.type
                })
                resolve(newFile)
            })
            .catch(function (err) {
                // 处理失败会执行
                reject(err)
            })

    })
}

/**
 * @description 获取图片的base64
 * @param {DOM Object} image 
 * @returns {String}
 */
function getBase64Image(image) {
    const
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        width = image.width,
        height = image.height
    canvas.width = width
    canvas.height = height
    ctx.drawImage(image, 0, 0, width, height)
    return canvas.toDataURL(`image/${image.src.toLowerCase()}`)
}

/**
 * @description 从新的标签页打开base64图片
 * @param {String} base64 
 */
function openPictureBase64(base64) {
    const
        image = new Image(),
        newTag = window.open('', '_blank')
    image.src = base64
    newTag.document.body.style['textAlign'] = "center"
    newTag.document.body.appendChild(image)
}

export default {
    getImgFile,
    getBase64Image,
    openPictureBase64,
    compressImageFile
}