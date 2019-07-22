<template>
    <div class="user-manage">
        <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="6">
                <el-card class="box-card">
                    <div class="search">
                        <el-row>
                            <el-col :span="19">
                                <el-input 
                                v-model="searchVal" 
                                placeholder="搜索内容"></el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-button 
                                icon="el-icon-search" 
                                class="button-left-circle"
                                circle></el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="tree-box">
                        <el-tree 
                        :data="departmentList" 
                        :props="defaultProps" 
                        default-expand-all
                        @node-click="handleNodeClick"></el-tree>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="16" :sm="16" :md="18">
                <el-card class="box-card">
                    <div class="search">
                        <el-row :gutter="10">
                            <el-col :span="8">
                                <el-input
                                v-model="searchVal" 
                                placeholder="搜索内容"></el-input>
                            </el-col>
                            <el-select 
                                v-model="selectType" 
                                clearable
                                placeholder="类型"
                                class="select-input">
                                    <el-option
                                    v-for="item in options_1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                            </el-select>
                             <el-select 
                             v-model="selectStatus" 
                             clearable
                             placeholder="类型"
                             class="select-input">
                                    <el-option
                                    v-for="item in options_2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                            </el-select>
                            <el-button 
                                icon="el-icon-search" 
                                class="button-left-circle"
                                circle></el-button>
                            <el-button 
                                type="primary"
                                icon="el-icon-plus" 
                                circle
                                ></el-button>
                        </el-row>
                    </div>
                    <el-table
                        :data="userList"
                        style="width: 100%;">
                        <el-table-column
                        label="用户名"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="电话"
                        width="150"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.phone }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="邮箱"
                        width="180"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.email }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="部门/岗位"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.department }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="状态"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <el-tag type="warning">
                                    {{ scope.row.status }}
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
                        <el-table-column 
                        label="操作"
                        width="150"
                        fixed="right">
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
            selectStatus: "",
            // 当前页数
            nowPage: 1,
            // 当前页条数
            nowSize: 10,
            // 总条数
            totalElements: 1,
            // 部门编号
            deptId: 1,
            departmentList: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            options_1: [{
                value: '选项1',
                label: '用户名'
            },{
                value: '选项2',
                label: '邮箱'
            }],
            options_2: [{
                value: '选项1',
                label: '激活'
            },{
                value: '选项2',
                label: '锁定'
            }],
            userList: [{
                userName: "xuanzai",
                phone: "18024900423",
                email: "1814899864@qq.com",
                department: "网维",
                status: "贼强",
                createTime: "2019-07-10 12:00"
            }]
        }
    },
    created() {
        // 初始化获取部门列表
        this.getDepartmentList()
    },
    methods: {
        handleNodeClick(val) {
            this.deptId = val.id
            this.getUserList()
        },
        // 条数变化
        handleSizeChange(size) {
            this.nowSize = size
            this.getExceptionLogList()
        },
        // 分页处理
        initialPage(totalElements) {
            this.totalElements = totalElements
        },
        // 页数变化
        handleCurrentChange(page) {
            this.nowPage = page
            this.getExceptionLogList()
        },
        // 获取用户列表
        // 初始化错误日志列表
        initialUserList(list) {
            this.userList.splice(0, this.userList.length)
            list.forEach(value => {
                this.userList.push(value)
            })
        },
        // 获取错误日志信息
        getUserList() {
            this.$http_normal({
                url: `/api/user/page?page=${this.nowPage - 1}&size=${this.nowSize}&sort=createTime,desc&deptId=${this.deptId}`,
                method: "get"
            }).then(result => {
                const data = result.data
                this.initialPage(data.totalElements)
                this.initialExceptionLogList(data.content)
            })
        },
        // 初始化错误日志列表
        initialDepartmentList(list) {
            this.departmentList.splice(0, this.departmentList.length)
            list.forEach(value => {
                this.departmentList.push(value)
            })
        },
        // 获取错误日志信息
        getDepartmentList() {
            this.$http_json({
                url: `/api/dept/get`,
                method: "get"
            }).then(result => {
                this.initialDepartmentList(result.data.content)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
