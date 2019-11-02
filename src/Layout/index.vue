<template>
  <div>
    <transition name="xz-animation">
      <router-view class="router"></router-view>
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.xz-animation-enter-active {
  transition: all .5s .6s;
}
.xz-animation-leave-active {
  transition: all .5s;
}
.xz-animation-enter {
  opacity: 0;
  transform: translateX(-25px);
}
.xz-animation-leave-to {
  opacity: 0;
  transform: translateX(25px);
}
</style>
