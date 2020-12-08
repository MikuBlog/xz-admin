const path = require('path')
module.exports = {
  environment: process.env.NODE_ENV === 'production' ? '/' : '/',
  editor: process.env.NODE_ENV === 'production' ? '/' : '/',
  electron: path.resolve(__dirname, './dist'),
  // 是否为桌面程序
  isExe: false
}