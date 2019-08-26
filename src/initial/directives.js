import Permission from '@/utils/permission'
/**
 * @description 通过v-permission调用该指令
 */
const permission = (el, binding) => {
  Permission(binding.value)
  ? el.style.display = "block"
  : el.style.display = "none"
}

export default {
  permission
}

