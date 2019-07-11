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
                                <el-select 
                                v-model="selectVal" 
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
                                <el-button 
                                circle
                                type="primary"
                                icon="el-icon-plus" 
                                @click="showBox('添加菜单')"></el-button>
                        </el-row>
                    </div>
                    <tree-table 
                    :data="data" 
                    :expand-all="expand" 
                    :columns="columns" 
                    size="small">
                        <el-table-column prop="icon" label="别名" align="center">
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
                             @click="edit(scope.row)"
                             size="small" />
                            <el-popover
                                :ref="scope.row.id"
                                placement="top"
                                width="200">
                                <p>确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！</p>
                                <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" 
                                >取消</el-button>
                                <el-button type="primary" size="small" 
                                >确定</el-button>
                                </div>
                                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
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
            selectVal: "",
            isAdd: true,
            options: [{
                value: '选项1',
                label: '黄金糕'
            },{
                value: '选项2',
                label: '黄金糕'
            }],
            columns: [
                {
                    text: '名称',
                    value: 'name'
                }
            ],
            data: [
                
            ]
        }
    },
    methods: {
        showBox(name) {
            this.$refs.form.dialog = true
        }
    }
}
</script>

<style>

</style>
