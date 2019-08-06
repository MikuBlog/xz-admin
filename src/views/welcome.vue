<template>
    <div class="welcome">
        <el-row>
            <el-col :span="24">
                <div class="background-box" ref="background"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    mounted() {
        this.initialStyle()
        this.initialListener()
    },
    methods: {
        initialStyle() {
            const 
                ele = document.querySelector('#top'),
                background = this.$refs.background
            this.$setStyle(background, 'height', `${ele.clientHeight + 5}px`)
            this.$setStyle(background, 'width', `${ele.clientWidth + 5}px`)
        },
        initialListener() {
            window.addEventListener('resize', () => {
                this.initialStyle()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .background-box {
        position: absolute;
        top: -15px;
        left: -15px;
        background-image: url(../assets/welcome/welcome.gif);
        background-size: cover;
        background-position: center;
        box-shadow: 0 0 3px 3px silver;
    }
</style>
