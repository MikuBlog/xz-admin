import store from '@/store/store'
export default function(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.user && store.user.roles
    const permissionRoles = value
    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}