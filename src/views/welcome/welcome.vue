<template>
    <div class="welcome">
        <el-row>
            <el-col :span="24">
                <el-card class="box-card">
                    
                </el-card>
            </el-col>
        </el-row>
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
