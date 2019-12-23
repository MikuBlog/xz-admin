import Vue from 'vue'
import store from '@/store'

Vue.config.errorHandler = function (err, vm, info) {
  store.commit("SET_ERROR_LOG", {
    err,
    info,
    url: window.location.href
  })
}
