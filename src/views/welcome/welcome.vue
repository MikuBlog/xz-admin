<template>
    <div class="welcome">
        欢迎
        <div @click="goto">
            点我跳转
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goto() {
            this.$router.push({path: "/home/add_article"})
        }
    }
}
</script>

<style lang="scss" scoped>
    .home {
        position: relative;
        height: 1000px;
    }
</style>
