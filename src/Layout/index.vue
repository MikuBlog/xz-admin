<template>
    <div>
        <transition name="xz-animation">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .xz-animation-enter-active {
        transition: all .6s .6s;
    }
    .xz-animation-leave-active {
        transition: all .6s;
    }
    .xz-animation-enter, .xz-animation-leave-to {
        transform: translateX(-50px);
        opacity: 0;
    }
</style>
