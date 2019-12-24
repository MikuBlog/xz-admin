/**
 * @author xuanzai
 * @description 创建websocket实例
 * @param {Object} option 
 * @returns {WebSocket}
 */
export default ({
    url,
    onOpen,
    onMessage,
    onError,
    onClose
  }) => {
  if (!url) {
    throw new Error("请填写连接url")
  }
  const ws = new WebSocket(url)
  ws.addEventListener('open', e => {
    onOpen && onOpen(e)
  })
  ws.addEventListener('message', e => {
    onMessage && onMessage(e)
  })
  ws.addEventListener('error', e => {
    onError && onError(e)
  })
  ws.addEventListener('close', e => {
    onClose && onClose(e)
  })
  return ws
}