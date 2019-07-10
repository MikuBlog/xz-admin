<template>
    <div class="station-manage">
        <el-row>
            <el-col :span="24">
                <el-card class="box-card">
                    <div class="search">
                        <el-input 
                        v-model="searchVal" 
                        placeholder="搜索内容"
                        class="search-input"></el-input>
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
                        <el-button 
                        icon="el-icon-search" 
                        circle></el-button>
                        <el-button 
                        type="primary"
                        icon="el-icon-plus" 
                        circle></el-button>
                    </div>
                    <el-table
                        :data="managementList"
                        style="width: 100%">
                        <el-table-column
                        label="名称"
                        >
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="所属部门"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.department }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="排序"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.sort }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="状态"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <el-tag>
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
                        fixed="right"
                        width="150">
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
            managementList: [{
                name: "xuanzai",
                department: "网维",
                sort: "1",
                status: "正常",
                createTime: "2019-07-10 12:00"
            }],
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
        }
    }
}
</script>

<style>

</style>
