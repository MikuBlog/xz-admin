import Permission from '@/utils/permission'
/**
 * @author xuanzai
 * @description 通过v-permission调用该指令
 */
function permission (el, binding) {
  Permission(binding.value)
    ? el.style.display = "block"
    : el.style.display = "none"
}

export default {
  inserted: permission,
  componentUpdated: permission
}