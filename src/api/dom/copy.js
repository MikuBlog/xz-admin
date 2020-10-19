/**
 * @author xuanzai
 * @description 复制文本
 * @param {DOM | String} obj 
 * @returns {Promise}
 */
function copyText(obj) {
    return new Promise((resolve, reject) => {
        const 
            range = document.createRange(),
            selection = document.getSelection()
        if(typeof obj === "object") {
            // 将DOM元素中的文字添加到range对象中
            range.selectNodeContents(obj)
            // 清除已有选区
            selection.removeAllRanges()
            // 选中range对象中的所有文字
            selection.addRange(range)
            // 复制
            document.execCommand('Copy')
            // 清除已有选区
            selection.removeAllRanges()
        }
        if(typeof obj === "string") {
					// 动态创建 textarea 元素
					var aux = document.createElement("textarea");
					// 获得需要复制的内容
					aux.value = obj
					// 添加到 DOM 元素中
					document.body.appendChild(aux);
					// 执行选中
					// 注意: 只有 input 和 textarea 可以执行 select() 方法.
					aux.select();
					// 获得选中的内容
					var content = window.getSelection().toString();
					// 执行复制命令
					document.execCommand("copy");
        }
        resolve()
    })
}

export default copyText