<template>
    <div class="dictionary-manage">
        <el-row :gutter="20">
            <el-col  :sm="24" :md="12">
                <el-card 
                class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="title">字典列表</span>
                        <el-button 
                        style="float: right; margin-top: 5px;"
                        type="primary" 
                        icon="el-icon-plus"
                        size="small" 
                        @click="addDictionary">
                            新增
                        </el-button>
                    </div>
                    <div class="search">
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <el-input v-model="searchVal" placeholder="搜索内容"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-select v-model="selectVal" placeholder="类型">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="3">
                                <el-button 
                                icon="el-icon-search" 
                                circle></el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <el-table
                        :data="dictionaryList"
                        style="width: 100%">
                        <el-table-column
                        label="名称"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.name }}</span>
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
                        label="操作"
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
            <el-col  :sm="24" :md="12" class="card-gutter">
                <el-card 
                class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="title">字典详情</span>
                        <el-button 
                        style="float: right; margin-top: 5px;"
                        type="primary" 
                        icon="el-icon-plus"
                        size="small"
                        @click="addDetail">
                            新增
                        </el-button>
                    </div>
                    <div class="search">
                        <el-row :gutter="10">
                            <el-col :span="6">
                                <el-select v-model="selectVal" placeholder="字典标签">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="3">
                                <el-button 
                                icon="el-icon-search" 
                                circle></el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <el-table
                        :data="detailList"
                        style="width: 100%">
                        <el-table-column
                        label="所属字典"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.belong }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="字典标签"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.tag }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="字典值"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.val }}
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
                        label="操作"
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
        <Form-Add ref="formAdd"></Form-Add>
        <Form-Edit ref="formEdit"></Form-Edit>
    </div>
</template>

<script>
import FormAdd from './add'
import FormEdit from './edit'
export default {
    components: { FormAdd, FormEdit },
    data() {
        return {
            isShowAddBox: false,
            isShowDetailBox: false,
            searchVal: "",
            selectVal: "",
            dictionaryList: [{
                name: "xz_test",
                description: "旋仔牛B"
            }],
            detailList: [{
                belong: "xz_test",
                tag: "正常",
                val: "true",
                sort: 1
            }],
            options: [{
                value: '选项1',
                label: '黄金糕'
            },{
                value: '选项2',
                label: '黄金糕'
            }],
        }
    },
    methods: {
        addDictionary() {
            this.$refs.formAdd.isShowAddBox = true
        },
        addDetail() {
            this.$refs.formEdit.isShowDetailBox = true
        },
        handleEdit() {

        },
        handleDelete() {

        },
        handleSizeChange() {
            
        },
        handleCurrentChange() {

        }
    }
}
</script>

<style lang="scss" scoped>
    .title {
        position: relative;
        font-size: 1rem;
    }
    .pagination {
        margin-top: 1rem;
    }
</style>
