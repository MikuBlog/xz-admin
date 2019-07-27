<template>
    <div class="welcome">
        <el-row>
            <el-col :span="24">
                <el-card class="box-card">
                    待开发
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            detail: ""
        }
    },
    methods: {
        goto() {
            this.$router.push({path: "/home/add_article"})
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>
