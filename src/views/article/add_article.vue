<template>
    <div class="add-article">
        <div>
            我写文章
        </div>
        <div @click="goto">
            点我跳转
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goto() {
            this.$router.push({path: "/home/welcome"})
        }
    }
}
</script>

<style>

</style>
