<template>
    <div class="authority-log">
        <el-row>
            <el-col :span="24">
                <el-card class="box-card">
                    <div class="search">
                        <el-input 
                        v-model="searchVal" 
                        placeholder="搜索内容"
                        class="search-input margin-box"
                        @keyup.native="searchEnter"></el-input>
                        <el-select 
                        v-model="selectType_1" 
                        placeholder="类型"
                        class="select-input margin-box">
                            <el-option
                            v-for="item in options_1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select 
                        clearable
                        v-model="selectType_2" 
                        @change="getOperationType"
                        placeholder="操作类型"
                        class="select-input margin-box"
                        style="width: 7rem">
                            <el-option
                            v-for="item in options_2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-date-picker
                        v-model="date"
                        class="select-input margin-box"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="getDate">
                        </el-date-picker>
                        <el-button 
                        icon="el-icon-search" 
                        class="margin-box"
                        @click="search"
                        circle></el-button>
                    </div>
                    <el-table
                        :data="authorityLogList"
                        style="width: 100%">
                        <el-table-column
                        label="操作者"
                        >
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.creatorName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="IP"
                        >
                        <template slot-scope="scope">
                            <div slot="reference">
                                {{ scope.row.creatorIp }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="描述"
                        :show-overflow-tooltip="true"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.name }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="是否恢复"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <el-tag :type="scope.row.recovery ? '' : 'info'">
                                    {{ scope.row.recovery 
                                    ? "是"
                                    : "否"}}
                                </el-tag>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="操作类型"
                        :show-overflow-tooltip="true"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.type }}
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
                        <el-table-column
                        label="操作值"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        label="操作"
                        fixed="right"
                        width="150">
                        <template slot-scope="scope">
                            <el-button 
                            type="success" 
                            icon="el-icon-refresh-left"
                            @click="recoverAuthority(scope.row)"
                            size="small"></el-button>
                            <el-button 
                            type="danger" 
                            icon="el-icon-delete"
                            @click="deleteAuthority(scope.row)"
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
        :fullscreen="true"
        >
            <el-row :gutter=20>
                <el-col :sm="24" :md="12">
                    <h3>操作前的值</h3>
                    <pre>{{authorityOldDetail}}</pre>
                </el-col>
                <el-col :sm="24" :md="12">
                    <h3>操作后的值</h3>
                    <pre>{{authorityNewDetail}}</pre>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchVal: "",
            selectType_1: "",
            selectType_2: "",
            title: "",
            date: "",
            dateArray: [],
            authorityOldDetail: "",
            authorityNewDetail: "",
            dialogVisible: false,
            authorityLogList: [],
            // 当前页数
            nowPage: 1,
            // 当前页条数
            nowSize: 10,
            // 总条数
            totalElements: 0,
            options_1: [{
                value: 'creatorName',
                label: '操作者'
            },{
                value: 'name',
                label: '描述'
            }],
            options_2: [{
                value: '1',
                label: '用户'
            },{
                value: '2',
                label: '角色'
            },{
                value: '3',
                label: '权限'
            },{
                value: '4',
                label: '部门'
            },{
                value: '5',
                label: '岗位'
            },{
                value: '6',
                label: '菜单'
            },],
        }
    },
    created() {
        // 初始化权限日志列表
        this.getAuthorityLogList()
    },
    methods: {
        // 还原操作日志
        recoverAuthority(item) {
            this
                .$showMsgBox({ msg: `是否恢复${item.name}操作日志?` })
                .then(() => {
                    this.$http_json({
                        url: `/api/authLog/recover/${item.id}`,
                        method: "post"
                    }).then(() => {
                        this.$successMsg('恢复成功')
                        this.getAuthorityLogList()
                    })
                })
        },
        // 删除操作日志
        deleteAuthority(item) {
            this
                .$showMsgBox({ msg: `是否删除${item.name}操作日志?` })
                .then(() => {
                    this.$http_json({
                        url: `/api/authLog/del/${item.id}`,
                        method: "post"
                    }).then(() => {
                        this.$successMsg('删除成功')
                        this.getAuthorityLogList()
                    })
                })
        },
        // 展示当前值
        showDetail (item) {
            this.dialogVisible = true
            this.authorityOldDetail = this.$jsonPretty(item.oldValue, 1)
            this.authorityNewDetail = this.$jsonPretty(item.newValue, 1)
        },
        // 点击搜索
        search() {
            this.selectType_1
            ? this.getAuthorityLogList()
            : this.$warnMsg('请选择搜索类型')
        },
        // 回车搜索
        searchEnter(e) {
            e.keyCode === 13
            && (this.selectType_1
            ? this.getAuthorityLogList()
            : this.$warnMsg('请选择搜索类型'))
        },
        // 条数变化
        handleSizeChange(size) {
            this.nowSize = size
            this.getAuthorityLogList()
        },
        // 页数变化
        handleCurrentChange(page) {
            this.nowPage = page
            this.getAuthorityLogList()
        },
        // 日期格式化
        initialDate() {
            this.dateArray.splice(0, this.dateArray.length)
            this.date
            && this.dateArray.push(
            this.$formDate(this.date[0], true),
            this.$formDate(this.date[1], true))
        },
        // 分页处理
        initialPage(totalElements) {
            this.totalElements = totalElements
        },
        // 初始化操作类型 
        initialOperationType(type) {
            switch(type) {
                case 1: 
                    return "用户"
                case 2: 
                    return "角色"
                case 3: 
                    return "权限"
                case 4: 
                    return "部门"
                case 5: 
                    return "岗位"
                case 6: 
                    return "菜单"
            }
        },
        // 初始化权限日志列表
        initialAuthorityLogList(list) {
            this.authorityLogList.splice(0, this.authorityLogList.length)
            list.forEach(value => {
                value.type = this.initialOperationType(value.type)
                this.authorityLogList.push(value)
            })
        },
        // 获取日期
        getDate() {
            this.initialDate()
            this.getAuthorityLogList()
        },
        // 获取操作类型
        getOperationType() {
            this.getAuthorityLogList()
        },
        // 获取权限日志信息
        getAuthorityLogList() {
            this.$http_normal({
                url: `/api/authLog/page?page=${this.nowPage - 1}&size=${this.nowSize}&sort=createTime,desc${this.selectType_1 ? `&${this.selectType_1}=${this.searchVal}` : ""}${this.date ? `&greatTime=${this.dateArray[0]}&lessTime=${this.dateArray[1]}` : ""}${this.selectType_2 ? `&type=${this.selectType_2}` : ""}`,
                method: "get"
            }).then(result => {
                const data = result.data
                this.initialPage(data.totalElements)
                this.initialAuthorityLogList(data.content)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .el-table {
        white-space: nowrap;
    }
    h3 {
        line-height: 3rem;
    }
</style>
