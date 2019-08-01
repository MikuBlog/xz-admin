<template>
    <div class="operation-log">
        <el-row>
            <el-col :span="24">
                <el-card class="box-card">
                    <div class="search">
                        <el-input 
                        v-model="searchVal" 
                        placeholder="请选择类型进行搜索"
                        class="search-input margin-box"
                        @keyup.native="searchEnter"></el-input>
                        <el-select 
                        v-model="selectType" 
                        placeholder="类型"
                        class="select-input margin-box">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button 
                        icon="el-icon-search" 
                        class="margin-box"
                        @click="search"
                        circle
                        ></el-button>
                    </div>
                    <el-table
                        :data="operationLogList"
                        style="width: 100%">
                        <el-table-column
                        label="用户名"
                        >
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.username }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="IP"
                        >
                        <template slot-scope="scope">
                            <div slot="reference">
                                {{ scope.row.requestIp }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="描述"
                        >
                        <template slot-scope="scope">
                            <div slot="reference">
                                {{ scope.row.description }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="方法名称"
                        >
                        <template slot-scope="scope">
                            <el-tooltip 
                            slot="reference" 
                            class="item" 
                            effect="dark" 
                            :content="scope.row.method" 
                            placement="top">
                                <div class="name-wrapper">
                                    {{ scope.row.method }}
                                </div>
                            </el-tooltip>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="参数"
                        >
                        <template slot-scope="scope">
                            <el-tooltip 
                            slot="reference" 
                            class="item" 
                            effect="dark" 
                            :content="scope.row.params" 
                            placement="top">
                                <div class="name-wrapper">
                                    {{ scope.row.params }}
                                </div>
                            </el-tooltip>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="请求耗时"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <el-tag>
                                    {{ scope.row.time }}ms      
                                </el-tag>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="创建日期"
                        width="180"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.createTime }}        
                            </div>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchVal: "",
            selectType: "",
            operationLogList: [],
            // 当前页数
            nowPage: 1,
            // 当前页条数
            nowSize: 10,
            // 总条数
            totalElements: 0,
            options: [{
                value: 'username',
                label: '用户名'
            },{
                value: 'description',
                label: '描述'
            }],
        }
    },
    created() {
        // 初始化页面数据
        this.getOpertionLogList()
    },
    methods: {
         // 点击搜索
        search() {
            this.selectType
            ? this.getOpertionLogList()
            : this.$warnMsg('请选择搜索类型')
        },
        // 回车搜索
        searchEnter(e) {
            e.keyCode === 13
            && (this.selectType
            ? this.getOpertionLogList()
            : this.$warnMsg('请选择搜索类型'))
        },
        // 条数变化
        handleSizeChange(size) {
            this.nowSize = size
            this.getOpertionLogList()
        },
        // 页数变化
        handleCurrentChange(page) {
            this.nowPage = page
            this.getOpertionLogList()
        },
        // 分页处理
        initialPage(totalElements) {
            this.totalElements = totalElements
        },
        // 初始化操作日志列表
        initialOpertionLogList(list) {
            this.operationLogList.splice(0, this.operationLogList.length)
            list.forEach(value => {
                this.operationLogList.push(value)
            })
        },
        // 获取操作日志信息
        getOpertionLogList() {
            this.$http_normal({
                url: `/log/page?page=${this.nowPage - 1}&size=${this.nowSize}&sort=createTime,desc${this.selectType ? `&${this.selectType}=${this.searchVal}` : ""}`,
                method: "get"
            }).then(result => {
                const data = result.data
                this.initialPage(data.totalElements)
                this.initialOpertionLogList(data.content)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
</style>
