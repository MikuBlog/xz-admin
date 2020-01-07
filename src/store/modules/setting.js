import storage from '@/api/storage'
import defaultConfig from '@/global/js/config'
const
  state = {
    showLogo: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').showLogo !== undefined)
      ? storage.getMemoryPmt('setting').showLogo
      : defaultConfig.default.showLogo,
    showTags: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').showTags !== undefined)
      ? storage.getMemoryPmt('setting').showTags
      : defaultConfig.default.showTags,
    showBreadcrumb: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').showBreadcrumb !== undefined)
      ? storage.getMemoryPmt('setting').showBreadcrumb
      : defaultConfig.default.showBreadcrumb,
    showFooter: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').showFooter !== undefined)
    ? storage.getMemoryPmt('setting').showFooter
    : defaultConfig.default.showFooter,
    isVerticleMenu: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').isVerticleMenu !== undefined)
      ? storage.getMemoryPmt('setting').isVerticleMenu
      : defaultConfig.default.menuLayout,
    menuStyle: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').menuStyle)
      ? storage.getMemoryPmt('setting').menuStyle
      : defaultConfig.default.menuStyleType,
    background: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').background)
      ? {
        url: storage.getMemoryPmt('setting').background.url ? storage.getMemoryPmt('setting').background.url : "",
        color: storage.getMemoryPmt('setting').background.color ? storage.getMemoryPmt('setting').background.color : "",
        mask: storage.getMemoryPmt('setting').background.mask ? storage.getMemoryPmt('setting').background.mask : 0,
        opacity: storage.getMemoryPmt('setting').background.opacity ? storage.getMemoryPmt('setting').background.opacity : 100,
        cardOpacity: storage.getMemoryPmt('setting').background.cardOpacity ? storage.getMemoryPmt('setting').background.cardOpacity : 90
      }
      : {
        url: "",
        color: "",
        mask: 0,
        opacity: 100,
        cardOpacity: 90
      },
      layoutSize: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').layoutSize !== undefined)
    ? storage.getMemoryPmt('setting').layoutSize
    : defaultConfig.default.layoutSize,
    themeColor: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').themeColor !== undefined)
    ? storage.getMemoryPmt('setting').themeColor
    : defaultConfig.default.themeColor,
    themeStyle: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').themeStyle !== undefined)
    ? storage.getMemoryPmt('setting').themeStyle
    : defaultConfig.default.themeStyle,
    brightness: (storage.getMemoryPmt('setting') && storage.getMemoryPmt('setting').brightness !== undefined)
    ? storage.getMemoryPmt('setting').brightness
    : defaultConfig.default.brightness
  }
export default {
  state
}