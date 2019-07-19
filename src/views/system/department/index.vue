<template>
    <div class="department-manage">
        <el-row :gutter="20">
            <el-col :span=24>
                <el-card class="box-card">
                    <div class="search">
                        <el-row :gutter="10">
                            <el-input 
                            v-model="searchVal" 
                            placeholder="搜索内容"
                            class="search-input"
                            @keyup.native="searchEnter"></el-input>
                                <el-select 
                                v-model="selectType" 
                                @change="search"
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
                                @click="search"
                                circle></el-button>
                                <el-button 
                                circle
                                type="primary"
                                icon="el-icon-plus" 
                                ></el-button>
                        </el-row>
                    </div>
                    <tree-table 
                    :expand-all="expand" 
                    :data="departmentList" 
                    :columns="columns" 
                    size="small">
                        <el-table-column label="状态" align="center">
                            <template slot-scope="scope">
                                <el-tag :type="scope.row.enabled ? '' : 'info'">{{ scope.row.enabled ? "正常" : "停用" }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="创建日期">
                            <template slot-scope="scope">
                            <span>{{ scope.row.createTime }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="130px" align="center">
                            <template slot-scope="scope">
                            <el-button 
                            size="small"
                            type="primary" 
                            icon="el-icon-edit" 
                            class="button-right"
                            @click="edit(scope.row)"/>
                            <el-popover
                                :ref="scope.row.id"
                                placement="top"
                                width="180">
                                <p>确定删除本条数据吗？</p>
                                <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" >取消</el-button>
                                <el-button :loading="delLoading" type="primary" size="mini" >确定</el-button>
                                </div>
                                <el-button slot="reference" :disabled="scope.row.id === 1" type="danger" 
                                icon="el-icon-delete" 
                                class="button-left"
                                size="small"/>
                            </el-popover>
                            </template>
                        </el-table-column>
                        </tree-table>
                </el-card>
            </el-col>
        </el-row>
        <!-- <eForm ref="form" :is-add="isAdd"/> -->
    </div>
</template>

<script>
import treeTable from "@/components/tree_table/tree_table"
// import eForm from "./form.vue"
export default {
    components: { treeTable },
    data() {
        return {
            expand: true,
            delLoading: false,
            searchVal: "",
            selectType: "",
            isAdd: true,
            departmentList: [],
            options: [{
                value: true,
                label: '正常'
            },{
                value: false,
                label: '禁用'
            }],
            columns: [
                {
                    text: '名称',
                    value: 'name'
                }
            ],
        }
    },
    created() {
        // 初始化获取部门列表
        this.getDepartmentList()
    },
    methods: {
        showBox(name) {
            this.$refs.form.dialog = true
        },
        // 点击搜索
        search(val) {
            this.getDepartmentList()
        },
        // 回车搜索
        searchEnter(e) {
            e.keyCode === 13
            && this.getDepartmentList()
        },
        // 初始化部门列表
        initialDepartmentList(list) {
            this.departmentList.splice(0, this.departmentList.length)
            list.forEach(value => {
                this.departmentList.push(value)
            })
        },
        // 获取部门列表
        getDepartmentList() {
            this.$http_json({
                url: `/api/dept/get?sort=createTime,desc${this.searchVal ? `&name=${this.searchVal}` : ""}${this.selectType ? `&enabled=${this.selectType}` : ""}`,
                method: "get"
            }).then(result => {
                this.initialDepartmentList(result.data.content)
            })
        }
    }
}
</script>

<style>

</style>
