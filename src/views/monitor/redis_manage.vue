import { MessageBox } from 'mint-ui';
<template>
    <div class="redis-manage">
        <el-row>
            <el-col :span="24">
                <el-card class="box-card">
                    <div class="search">
                        <el-input 
                        v-model="searchVal" 
                        placeholder="搜索缓存KEY"
                        class="search-input margin-box"
                        @keyup.native="searchEnter"></el-input>
                        <el-button 
                        icon="el-icon-search" 
                        class="margin-box"
                        @click="search"
                        circle></el-button>
                        <el-button 
                        type="danger" 
                        class="margin-box"
                        icon="el-icon-delete" 
                        @click="deleteAll"
                        circle></el-button>
                    </div>
                    <el-table
                        :data="redisList"
                        :highlight-current-row="true"
                        style="width: 100%">
                        <el-table-column
                        :show-overflow-tooltip="true"
                        label="KEY"
                        >
                        <template slot-scope="scope">
                            <div slot="reference"  class="name-wrapper">
                                {{ scope.row.key }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="VALUE"
                        width="100"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <el-button @click="showDetail(scope.row.value)" type="text" size="small">查看详情</el-button>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        label="操作"
                        width="100"
                        fixed="right"
                        >
                        <template slot-scope="scope">
                            <el-button 
                            type="danger" 
                            icon="el-icon-delete"
                            @click="deleteRedis(scope.row)"
                            size="small"
                            ></el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10, 25, 50, 100]"
                        :page-size.sync="nowSize"
                        :pager-count="5"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalElements">
                        </el-pagination>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog
        title="详情信息"
        :visible.sync="dialogVisible"
        width="30%"
        >
            <span>{{redisDetail}}</span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchVal: "",
            redisList: [],
            // 当前页数
            nowPage: 1,
            // 当前页条数
            nowSize: 10,
            // 总条数
            totalElements: 0,
            dialogVisible: false,
            redisDetail: "",
        }
    },
    created() {
        // 初始化页面数据
        this.getRedisList()
    },
    methods: {
        // 删除所有缓存
        deleteAll() {
            this
                .$showMsgBox({ msg: `是否删除所有缓存?` })
                .then(() => {
                    this.$http_json({
                        url: "/api/redis/delAll",
                        method: "post"
                    }).then(() => {
                        this.$successMsg('删除成功')
                        this.getRedisList()
                    })  
                })
        },
        // 删除缓存
        deleteRedis(item) {
            this
                .$showMsgBox({ msg: `是否删除当前缓存?` })
                .then(() => {
                    this.$http_json({
                        url: "/api/redis/del",
                        method: "post",
                        data: item
                    }).then(() => {
                        this.$successMsg('删除成功')
                        this.getRedisList()
                    })  
                })
        },
        // 显示弹窗
        showDetail(detail) {
            this.redisDetail = detail
            this.dialogVisible = true
        },
        // 点击搜索
        search() {
            this.getRedisList()
        },
        // 回车搜索
        searchEnter(e) {
            e.keyCode === 13
            && this.getRedisList()
        },
        // 条数变化
        handleSizeChange(size) {
            this.nowSize = size
            this.getRedisList()
        },
        // 页数变化
        handleCurrentChange(page) {
            this.nowPage = page
            this.getRedisList()
        },
        // 分页处理
        initialPage(totalElements) {
            this.totalElements = totalElements
        },
        // 初始化错误日志列表
        initialRedisList(list) {
            this.redisList.splice(0)
            list.forEach(value => {
                this.redisList.push(value)
            })
        },
        // 获取图片列表
        getRedisList() {
            this.$http_normal({
                url: `/api/redis/page?page=${this.nowPage - 1}&size=${this.nowSize}&key=${this.searchVal || "*"}`,
                method: "get"
            }).then(result => {
                const data = result.data
                this.initialPage(data.totalElements)
                this.initialRedisList(data.content)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
