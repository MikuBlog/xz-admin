<template>
    <div class="welcome">
        <el-row>
            <el-col :span="24">
                <el-card class="box-card">
                    <div class="header">
                        欢迎使用XZ-ADMIN
                    </div>
                    <div class="content">
                        <el-row>
                            <el-col :span="6">
                                <div class="content-header">
                                    页面功能
                                </div>
                                <div class="list">
                                    <ul>
                                        <li>动态菜单</li>
                                        <li>动态面包屑</li>
                                        <li>动态标签</li>
                                        <li>个性化登录界面</li>
                                        <li>...</li>
                                    </ul>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="content-header">
                                    对接功能
                                </div>
                                <div class="list">
                                    <ul>
                                        <li>RBAC模型</li>
                                        <li>日志系统</li>
                                        <li>监控系统</li>
                                        <li>个性化需求</li>
                                        <li>...</li>
                                    </ul>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="content-header">
                                    页面布局
                                </div>
                                <div class="list">
                                    <ul>
                                        <li>弹性模型</li>
                                        <li>响应式布局</li>
                                        <li>响应式菜单</li>
                                        <li>可滚动标签页</li>
                                        <li>...</li>
                                    </ul>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="content-header">
                                    技术栈
                                </div>
                                <div class="list">
                                    <ul>
                                        <li>主流框架vue</li>
                                        <li>UI框架elementUI</li>
                                        <li>UI框架Iview</li>
                                        <li>...</li>
                                    </ul>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <div class="content-header">
                                    使用插件
                                </div>
                                <div class="list">
                                    <ul>
                                        <li>富文本编辑器：UEditor</li>
                                        <li>图表：VCharts</li>
                                        <li>数字滚动：vue-number-scroll</li>
                                        <li>树状选择器：vue-treeselect</li>
                                        <li>动态菜单折叠插件：vue-fragment</li>
                                        <li>...</li>
                                    </ul>
                                </div>
                            </el-col>
                            <el-col :span="18">
                                <div class="content-header">
                                    已知问题
                                </div>
                                <div class="list">
                                    <ul>
                                        <li>有些图标不能正常显示
                                            <div style="margin-top: .5rem;">
                                            原因：因为在vue.config.js中加了svg处理器，用于处理添加菜单时svg图片的显示，所以导致了有些svg图标被处理了两次，不能正常显示。</div>
                                            <div style="margin-top: .5rem;">
                                            解决方案：node_modules --> iview --> dist --> styles --> iview.css --> 删除svg处理代码（ctrl + F 查删）
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </el-col>
                        </el-row>
                    </div>  
                    <div class="detail right">
                        <a href="https://github.com/MikuBlog/xz-admin">项目地址</a>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            detail: "欢迎使用XZ-ADMIN"
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
    .home {
        position: relative;
        height: 1000px;
    }
    .header {
        position: relative;
        font-size: 2rem;
        text-align: center;
    }
    .right {
        text-align: right;
        font-size: 1rem;
    }
    .content {
        position: relative;
        font-size: 1rem;
        margin: 1rem 3rem;
    }
    .content-header {
        position: relative;
        margin: 1rem 0;
        font-size: 1.5rem;
    }
    .list {
        margin-left: 2rem;
    }
</style>
