import store from '@/store'
export default function(value) {
	if (value && value instanceof Array && value.length > 0) {
		const roles = store.state.user && store.state.user.roles
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
