<template>
    <div class="authority-manage">
        <el-row :gutter="20">
            <el-col :span=24>
                <el-card class="box-card">
                    <div class="search">
                        <el-row :gutter="10">
                            <el-input 
                            v-model="searchVal" 
                            placeholder="搜索权限名称"
                            class="search-input margin-box"
                            @keyup.native="searchEnter"></el-input>
                                <el-button 
                                icon="el-icon-search" 
                                class="margin-box"
                                @click="search" 
                                circle></el-button>
                                <el-button 
                                circle
                                type="primary"
                                icon="el-icon-plus"
                                class="margin-box" 
                                @click="showAddAuthority()"></el-button>
                                <el-button 
                                type="warning" 
                                :icon="expand ? 'el-icon-open' : 'el-icon-turn-off'" 
                                title="全部展开或收起"
                                class="margin-box"
                                @click="isExpandAll"
                                circle></el-button>
                        </el-row>
                    </div>
                    <tree-table 
                    :data="authorityList" 
                    :expand-all="expand" 
                    :columns="columns" 
                    size="small">
                        <el-table-column 
                        prop="alias" 
                        label="别名"
                        :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <span>{{scope.row.alias}}</span>
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
        <eForm 
        ref="form" 
        :is-add="isAdd" 
        @updateAuthorityList="getAuthorityList"/>
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
        // 是否展开全部
        isExpandAll() {
            this.expand = !this.expand
            this.getAuthorityList()
        },
        // 删除权限
        deleteAuthorityItem(item) {
            this
                .$showMsgBox({ msg: `<p>是否删除${item.name}权限?</p><p>如果权限中包含子权限，则会一并删除！</p>`, isHTML: true })
                .then(() => {
                    this.$http_json({
                        url: `/api/permission/del/${item.id}`,
                        method: "post"
                    }).then(() => {
                        this.$successMsg('删除成功')
                        this.getAuthorityList()
                    })
                })
        },
        // 显示添加权限窗口
        showAddAuthority() {
            this.isAdd = true
            this.$refs.form.dialog = true
            this.$refs.form.resetForm()
        },
        // 显示编辑权限窗口
        showEditAuthority() {
            this.isAdd = false
            this.$refs.form.dialog = true
        },
        // 编辑权限项
        editAuthorityItem(item) {
            const authorityItem = this.$refs.form.authorityForm
            this.$refs.form.authorityId = item.id
            authorityItem.name = item.name
            authorityItem.alias = item.alias
            authorityItem.parentId = item.parentId
            this.showEditAuthority()
        },
        // 点击搜索
        search() {
            this.getAuthorityList()
        },
        // 回车搜索
        searchEnter(e) {
            e.keyCode === 13
            && this.getAuthorityList()
        },
        // 初始化菜单列表
        initialAuthorityList(list) {
            this.authorityList.splice(0)
            list.forEach(value => {
                this.authorityList.push(value)
            })
        },
        // 获取菜单列表
        getAuthorityList() {
            this.$http_json({
                url: encodeURI(`/api/permission/get?sort=createTime,desc${this.searchVal ? `&name=${this.searchVal}` : ""}`),
                method: "get"
            }).then(result => {
                this.initialAuthorityList(result.data.content)
            })
        },
    }
}
</script>

<style>

</style>
