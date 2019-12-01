import storage from '@/api/storage/storage'
const 
  state = {
    showLogo: storage.getMemoryPmt('setting') 
    ? storage.getMemoryPmt('setting').showLogo 
    : true,
    showTags: storage.getMemoryPmt('setting') 
    ? storage.getMemoryPmt('setting').showTags 
    : true,
    showBreadcrumb: storage.getMemoryPmt('setting') 
    ? storage.getMemoryPmt('setting').showBreadcrumb 
    : true,
    isVerticleMenu: storage.getMemoryPmt('setting') 
    ? storage.getMemoryPmt('setting').isVerticleMenu 
    : true,
    menuStyle: storage.getMemoryPmt('setting') 
    ? storage.getMemoryPmt('setting').menuStyle 
    : 'light',
    background: {
      url: storage.getMemoryPmt('setting') 
      ? storage.getMemoryPmt('setting').background.url 
      : '',
      blur: storage.getMemoryPmt('setting') 
      ? storage.getMemoryPmt('setting').background.blur 
      : 0,
      mask: storage.getMemoryPmt('setting') 
      ? storage.getMemoryPmt('setting').background.mask 
      : 0,
      opacity: storage.getMemoryPmt('setting') 
      ? storage.getMemoryPmt('setting').background.opacity 
      : 100,
    },
    theme: "#409eff",
  }

export default {
  state
}