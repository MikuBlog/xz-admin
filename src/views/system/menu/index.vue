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
                                circle
                                ></el-button>
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
                             @click="edit(scope.row)"
                             size="small" 
                             class="button-right"/>
                            <el-popover
                                :ref="scope.row.id"
                                placement="top"
                                width="200">
                                <p>确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！</p>
                                <div style="text-align: right; margin: 0">
                                <el-button size="small" type="text" 
                                >取消</el-button>
                                <el-button type="primary" size="small" 
                                >确定</el-button>
                                </div>
                                <el-button slot="reference" type="danger" icon="el-icon-delete" size="small"
                                class="button-left"/>
                            </el-popover>
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
        }
    }
}
</script>

<style>

</style>
