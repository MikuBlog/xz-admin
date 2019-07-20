<template>
    <div class="authority-manage">
        <el-row :gutter="20">
            <el-col :span=24>
                <el-card class="box-card">
                    <div class="search">
                        <el-row :gutter="10">
                            <el-input 
                            v-model="searchVal" 
                            placeholder="搜索内容"
                            class="search-input "></el-input>
                                <el-button 
                                icon="el-icon-search" 
                                class="button-left-circle"
                                circle></el-button>
                                <el-button 
                                circle
                                type="primary"
                                icon="el-icon-plus" 
                                @click="showAddAuthority()"></el-button>
                        </el-row>
                    </div>
                    <tree-table 
                    :data="authorityList" 
                    :expand-all="expand" 
                    :columns="columns" 
                    size="small">
                        <el-table-column prop="icon" label="别名">
                            <template slot-scope="scope">
                            <svg-icon :icon-class="scope.row.icon" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="创建日期" width="150">
                            <template slot-scope="scope">
                            <span>{{ scope.row.createTime }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column 
                        label="操作" 
                        width="150" 
                        align="center"
                        fixed="right">
                            <template slot-scope="scope">
                                <el-button 
                                type="primary" 
                                icon="el-icon-edit" 
                                @click="editAuthorityItem(scope.row)"
                                size="small" 
                                />
                                <el-button 
                                slot="reference" 
                                type="danger" 
                                @click="deleteAuthorityItem(scope.row)"
                                icon="el-icon-delete" size="small"
                                />
                            </template>
                        </el-table-column>
                        </tree-table>
                </el-card>
            </el-col>
        </el-row>
        <eForm ref="form" :is-add="isAdd"/>
    </div>
</template>

<script>
import treeTable from "@/components/tree_table/tree_table"
import eForm from "./form.vue"
export default {
    components: { treeTable, eForm },
    data() {
        return {
            expand: true,
            delLoading: false,
            searchVal: "",
            selectVal: "",
            isAdd: true,
            columns: [
                {
                    text: '名称',
                    value: 'name'
                }
            ],
            authorityList: []
        }
    },
    created() {
        this.getAuthorityList()
    },
    methods: {
        // 获取权限列表
        // 初始化菜单列表
        initialAuthorityList(list) {
            this.authorityList.splice(0, this.authorityList.length)
            list.forEach(value => {
                this.authorityList.push(value)
            })
        },
        // 获取菜单列表
        getAuthorityList() {
            this.$http_json({
                url: `/api/permission/get?sort=createTime,desc${this.searchVal ? `&name=${this.searchVal}` : ""}`,
                method: "get"
            }).then(result => {
                // console.log(result.data)
                this.initialAuthorityList(result.data.content)
            })
        },
    }
}
</script>

<style>

</style>
