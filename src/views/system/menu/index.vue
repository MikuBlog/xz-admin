<template>
    <div class="menu-manage">
        <el-row :gutter="20">
            <el-col :span=24>
                <el-card class="box-card">
                    <tree-table 
                    :data="data" 
                    :expand-all="expand" 
                    :columns="columns" 
                    size="small">
                        <el-table-column prop="icon" label="图标" align="center" width="80px">
                            <template slot-scope="scope">
                            <svg-icon :icon-class="scope.row.icon" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="sort" align="center" width="100px" label="排序">
                            <template slot-scope="scope">
                            <el-tag>{{ scope.row.sort }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="path" label="链接地址"/>
                        <el-table-column :show-overflow-tooltip="true" prop="component" label="组件路径"/>
                        <el-table-column prop="iframe" width="100px" label="内部菜单">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.iframe">是</span>
                                <span v-else>否</span>
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
                             type="primary" 
                             icon="el-icon-edit" 
                             @click="edit(scope.row)"
                             size="mini" />
                            <el-popover
                                :ref="scope.row.id"
                                placement="top"
                                width="200">
                                <p>确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！</p>
                                <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" 
                                >取消</el-button>
                                <el-button :loading="delLoading" type="primary" size="mini" 
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
    </div>
</template>

<script>
import treeTable from "../../../components/tree_table/tree_table";
export default {
    components: { treeTable },
    data() {
        return {
            expand: true,
            delLoading: false,
            columns: [
                {
                    text: '名称',
                    value: 'name'
                }
            ],
            data: [
                
            ]
        }
    }
}
</script>

<style>

</style>
