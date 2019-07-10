<template>
    <div class="user-manage">
        <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="6">
                <el-card class="box-card">
                    <div class="search">
                        <el-row>
                            <el-col :span="20">
                                <el-input 
                                v-model="searchVal" 
                                placeholder="搜索内容"></el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-button 
                                icon="el-icon-search" 
                                circle></el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="tree-box">
                        <el-tree 
                        :data="departmentList" 
                        :props="defaultProps" 
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
                                placeholder="类型"
                                class="select-input">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                            </el-select>
                             <el-select 
                             v-model="selectStatus" 
                             placeholder="类型"
                             class="select-input">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                            </el-select>
                            <el-button 
                                icon="el-icon-search" 
                                circle></el-button>
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
            selectType: "",
            selectStatus: "",
            departmentList: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                    label: '三级 1-1-1'
                    }]
                }]
                }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                    label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                    label: '三级 2-2-1'
                    }]
                }]
                }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                    label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                    label: '三级 3-2-1'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            options: [{
                value: '选项1',
                label: '黄金糕'
            },{
                value: '选项2',
                label: '黄金糕'
            },{
                value: '选项3',
                label: '黄金糕'
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
    methods: {
        handleNodeClick(val) {
            console.log(val)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
