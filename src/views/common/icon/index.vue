<template>
    <div class="icon-box">
        <el-row>
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header">
                        <span style="font-size: 1rem">图标库</span>
                    </div>
                    <div class="icon-list">
                        <div 
                        class="box"
                        v-for="items in iconList" 
                        :key="items.key"
                        @click="copy(items.tag)">
                            <el-tooltip 
                            class="item" 
                            effect="dark" 
                            :content="items.tag" 
                            placement="top">
                                <div>
                                    <svg-icon :icon-class="items.name" />
                                    <div class="icon-name">
                                        {{items.name}}
                                    </div>
                                </div>
                            </el-tooltip>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Icon from '@/components/icon_select/requireIcons'
export default {
    data() {
        return {
            iconList: []
        }
    },
    created() {
        this.initialIconList()
    },
    methods: {
        initialIconList() {
            Icon.forEach((val, ind) => {
                this.iconList.push({
                    key: ind,
                    name: val,
                    tag: `<svg-icon icon-class="${val}"/>`
                })
            })
        },
        copy(str) {
            this
                .$copyText(str)
                .then(() => {
                    this.$successMsg("复制成功")
                })
        }
    }
}
</script>

<style lang="scss" scoped>
    .box {
        position: relative;
        display: inline-block;
        width: 100px;
        height: 60px;
        margin: 2rem 1rem;
        text-align: center;
    }
    .svg-icon {
        position: relative;
        width: 40px;
        height: 40px;
    }
    .icon-name {
        margin: .5rem 0;
        font-size: 1rem;
        white-space: nowrap;
    }
</style>
