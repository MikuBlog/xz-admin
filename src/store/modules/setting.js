import storage from '@/api/storage'
const
  state = {
    showLogo: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').showLogo !== undefined)
      ? storage.getMemoryPmt('setting').showLogo
      : true,
    showTags: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').showTags !== undefined)
      ? storage.getMemoryPmt('setting').showTags
      : true,
    showBreadcrumb: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').showBreadcrumb !== undefined)
      ? storage.getMemoryPmt('setting').showBreadcrumb
      : true,
    showFooter: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').showFooter !== undefined)
    ? storage.getMemoryPmt('setting').showFooter
    : true,
    isVerticleMenu: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').isVerticleMenu !== undefined)
      ? storage.getMemoryPmt('setting').isVerticleMenu
      : true,
    menuStyle: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').menuStyle)
      ? storage.getMemoryPmt('setting').menuStyle
      : 'light',
    background: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').background)
      ? {
        url: storage.getMemoryPmt('setting').background.url ? storage.getMemoryPmt('setting').background.url : "",
        blur: storage.getMemoryPmt('setting').background.blur ? storage.getMemoryPmt('setting').background.blur : 0,
        mask: storage.getMemoryPmt('setting').background.mask ? storage.getMemoryPmt('setting').background.mask : 0,
        opacity: storage.getMemoryPmt('setting').background.opacity ? storage.getMemoryPmt('setting').background.opacity : 100,
        cardOpacity: storage.getMemoryPmt('setting').background.cardOpacity ? storage.getMemoryPmt('setting').background.cardOpacity : 90
      }
      : {
        url: "",
        blur: 0,
        mask: 0,
        opacity: 100,
        cardOpacity: 90
      },
      layoutSize: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').layoutSize !== undefined)
    ? storage.getMemoryPmt('setting').layoutSize
    : 'medium',
    theme: "#409eff",
    colorRotate: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').colorRotate !== undefined)
    ? storage.getMemoryPmt('setting').colorRotate
    : false,
    brightness: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').brightness !== undefined)
    ? storage.getMemoryPmt('setting').brightness
    : 100,
  }
export default {
  state
}