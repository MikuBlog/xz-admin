<template>
    <div class="article-list">
        <el-row>
            <el-col :span="24">
                <el-card class="box-card">
                    <div class="search">
                        <el-input 
                        v-model="searchVal" 
                        placeholder="搜索内容"
                        class="search-input margin-box"></el-input>
                        <el-button 
                        icon="el-icon-search" 
                        class="margin-box"
                        circle></el-button>
                    </div>
                    <el-table
                        :data="articleList"
                        style="width: 100%">
                        <el-table-column
                        label="创建日期"
                        width="180"
                        >
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.date }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="文章标题"
                        :show-overflow-tooltip="true"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.title }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="文章作者"
                        :show-overflow-tooltip="true"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.author }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="文章分类"
                        :show-overflow-tooltip="true"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <el-tag 
                                size="medium"
                                type="info"> 
                                    {{ scope.row.type }}
                                </el-tag>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        label="操作"
                        fixed="right"
                        width="150">
                        <template slot-scope="scope">
                            <el-button 
                            type="primary" 
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                            size="small"></el-button>
                            <el-button 
                            type="danger" 
                            icon="el-icon-delete"
                            @click="handleDelete(scope.$index, scope.row)"
                            size="small"
                            ></el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                     <div class="pagination">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        :pager-count="5"
                        layout="total, prev, pager, next, jumper"
                        :total="400">
                        </el-pagination>
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
            searchVal: "",
            articleList: [{
                date: "2019-07-08 12:00",
                title: "旋仔牛B",
                author: "匿名",
                type: "旋仔牛B系列",
            }, {
                date: "2019-07-08 12:00",
                title: "旋仔牛B",
                author: "匿名",
                type: "旋仔牛B系列",
            }, {
                date: "2019-07-08 12:00",
                title: "旋仔牛B",
                author: "匿名",
                type: "旋仔牛B系列",
            }, {
                date: "2019-07-08 12:00",
                title: "旋仔牛B",
                author: "匿名",
                type: "旋仔牛B系列",
            }, {
                date: "2019-07-08 12:00",
                title: "旋仔牛B",
                author: "匿名",
                type: "旋仔牛B系列",
            }, {
                date: "2019-07-08 12:00",
                title: "旋仔牛B",
                author: "匿名",
                type: "旋仔牛B系列",
            }, {
                date: "2019-07-08 12:00",
                title: "旋仔牛B",
                author: "匿名",
                type: "旋仔牛B系列",
            }, {
                date: "2019-07-08 12:00",
                title: "旋仔牛B",
                author: "匿名",
                type: "旋仔牛B系列",
            }, {
                date: "2019-07-08 12:00",
                title: "旋仔牛B",
                author: "匿名",
                type: "旋仔牛B系列",
            }, {
                date: "2019-07-08 12:00",
                title: "旋仔牛B",
                author: "匿名",
                type: "旋仔牛B系列",
            }]
        }
    },
    methods: {
        // 查找当前菜单目录
        findIndex() {

        },
        handleEdit() {

        },
        handleDelete() {

        }
    }
}
</script>

<style lang="scss" scoped>
    .el-pagination{
        position: relative;
        text-align: right;
        margin: 2rem 0 1rem 0;
    }
</style>
