<template>
    <div class="role-manage">
        <el-row :gutter="20">
            <el-col :xs="16" :sm="16" :md="16">
                <el-card class="box-card">
                    <div class="search">
                        <el-row :gutter="10">
                            <el-input
                            v-model="searchVal" 
                            placeholder="搜索内容"
                            class="search-input"></el-input>
                            <el-button 
                                icon="el-icon-search" 
                                circle></el-button>
                        </el-row>
                    </div>
                    <el-table
                        :data="userList"
                        style="width: 100%;">
                        <el-table-column
                        label="名称"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.name }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="数据权限"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.authority }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="角色级别"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.level }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="描述"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.description }}
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
            <el-col :xs="8" :sm="8" :md="8">
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
                        show-checkbox
                        @check-change="handleCheckChange"></el-tree>
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
                name: "xuanzai",
                authority: "18024900423",
                level: "1814899864@qq.com",
                description: "网维",
                createTime: "2019-07-10 12:00"
            }]
        }
    },
    methods: {
        handleCheckChange(val) {
            console.log(val)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
