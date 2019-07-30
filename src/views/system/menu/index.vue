<template>
    <div class="menu-manage">
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
                                <el-button 
                                icon="el-icon-search"
                                class="button-left-circle" 
                                @click="search"
                                circle></el-button>
                                <el-button 
                                type="primary"
                                icon="el-icon-plus" 
                                @click="showAddMenu()"
                                circle
                                ></el-button>
                                <el-button 
                                type="warning" icon="el-icon-star-off" 
                                title="全部展开或收起"
                                @click="isExpandAll"
                                circle></el-button>
                        </el-row>
                    </div>
                    <tree-table 
                    :data="menuList" 
                    :expand-all="expand" 
                    :columns="columns" 
                    size="small">
                        <el-table-column prop="icon" label="图标" align="center">
                            <template slot-scope="scope">
                            <svg-icon :icon-class="scope.row.icon" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="sort" align="center" label="排序">
                            <template slot-scope="scope">
                            <el-tag>{{ scope.row.sort }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="path" label="链接地址"/>
                        <el-table-column :show-overflow-tooltip="true" prop="component" label="组件路径"/>
                        <el-table-column prop="iframe" label="内部菜单">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.iframe">是</span>
                                <span v-else>否</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="enabled" label="是否显示">
                            <template slot-scope="scope">
                                <span v-if="scope.row.enabled">是</span>
                                <span v-else>否</span>
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
                        fixed="right"
                        align="center">
                            <template slot-scope="scope">
                                <el-button 
                                type="primary" 
                                icon="el-icon-edit" 
                                @click="editMenuItem(scope.row)"
                                size="small" 
                                />
                                <el-button 
                                slot="reference" 
                                type="danger" 
                                @click="deleteMenuItem(scope.row)"
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
        @updateMenu="getMenuList"/>
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
            searchVal: "",
            isAdd: true,
            menuList: [],
            columns: [
                {
                    text: '名称',
                    value: 'name'
                }
            ],
        }
    },
    created() {
        // 初始化获取菜单列表
        this.getMenuList()
    },
    methods: {
        // 是否展开全部
        isExpandAll() {
            this.expand = !this.expand
            this.getMenuList()
        },
        // 删除菜单
        deleteMenuItem(item) {
            this
                .$showMsgBox({ msg: `<p>是否删除${item.name}菜单?</p><p>如果菜单包含子菜单，则会一并删除！</p>`, isHTML: true })
                .then(() => {
                    this.$http_json({
                        url: `/api/menu/del/${item.id}`,
                        method: "post"
                    }).then(() => {
                        this.$successMsg('删除成功')
                        this.getMenuList()
                    })
                })
        },
        // 显示添加菜单窗口
        showAddMenu() {
            this.isAdd = true
            this.$refs.form.dialog = true
            this.$refs.form.resetForm()
        },
        // 显示编辑菜单窗口
        showEditMenu() {
            this.isAdd = false
            this.$refs.form.dialog = true
        },
        // 编辑菜单项
        editMenuItem(item) {
            const menuItem = this.$refs.form.menuForm
            this.$refs.form.menuId = item.id
            menuItem.name = item.name
            menuItem.sort = item.sort
            menuItem.path = item.path
            menuItem.component = item.component
            menuItem.iframe = item.iframe.toString()
            menuItem.roles = item.roles
            menuItem.enabled = item.enabled.toString()
            menuItem.parentId = item.parentId
            menuItem.icon = item.icon
            this.showEditMenu()
        },
        // 点击搜索
        search() {
            this.getMenuList()
        },
        // 回车搜索
        searchEnter(e) {
            e.keyCode === 13
            && this.getMenuList()
        },
        // 初始化菜单列表
        initialMenuList(list) {
            this.menuList.splice(0, this.menuList.length)
            list.forEach(value => {
                this.menuList.push(value)
            })
        },
        // 获取菜单列表
        getMenuList() {
            this.$http_json({
                url: `/api/menu/get?sort=createTime,desc${this.searchVal ? `&name=${this.searchVal}` : ""}`,
                method: "get"
            }).then(result => {
                this.initialMenuList(result.data.content)
            })
        },
    }
}
</script>

<style>

</style>
