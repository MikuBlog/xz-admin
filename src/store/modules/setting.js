import storage from '@/api/storage/storage'
const
  state = {
    showLogo: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').showLogo)
      ? storage.getMemoryPmt('setting').showLogo
      : true,
    showTags: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').showTags)
      ? storage.getMemoryPmt('setting').showTags
      : true,
    showBreadcrumb: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').showBreadcrumb)
      ? storage.getMemoryPmt('setting').showBreadcrumb
      : true,
    isVerticleMenu: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').isVerticleMenu)
      ? storage.getMemoryPmt('setting').isVerticleMenu
      : true,
    menuStyle: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').menuStyle)
      ? storage.getMemoryPmt('setting').menuStyle
      : 'light',
    background: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').background)
      ? storage.getMemoryPmt('setting').background
      : {
        url: "",
        blur: 0,
        mask: 0,
        opacity: 100
      },
    theme: "#409eff",
  }
export default {
  state
}