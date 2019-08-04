<template>
    <!-- 用于重定向的一个页面 -->
    <div class="redirect"></div>
</template>

<script>
import store from '@/store/store'
export default {
    beforeRouteEnter (to, from, next) {
        !from.name
        && next(store.state.tagsList[0].path)
        next()
    }
}
</script>

<style>

</style>
