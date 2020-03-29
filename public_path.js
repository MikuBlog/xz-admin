module.exports = {
  environment: process.env.NODE_ENV === 'production' ? '/admin' : '/',
  editor: process.env.NODE_ENV === 'production' ? '/admin/' : '/',
}