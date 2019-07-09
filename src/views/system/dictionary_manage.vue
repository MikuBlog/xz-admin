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
        <el-dialog 
        title="添加字典" 
        :visible.sync="isShowAddBox"
        width="450px">
            <el-form 
            :model="addForm"
            ref="addForm"
            :rules="addFormRules">
                <el-form-item 
                label="字典名称"
                prop="name">
                    <el-input 
                    placeholder="请输入字典名称"
                    v-model="addForm.name" 
                    autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item 
                label="描述"
                prop="description">
                    <el-input 
                    placeholder="请输入字典描述"
                    v-model="addForm.description" 
                    autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button 
                @click="isShowAddBox = false" 
                size="small">取 消</el-button>
                <el-button 
                type="primary" 
                @click="submitForm('addForm')"
                size="small">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog 
        title="添加字典详情" 
        :visible.sync="isShowDetailBox"
        width="450px">
            <el-form 
            :model="detailForm"
            ref="detailForm"
            :rules="detailFormRules">
                <el-form-item 
                label="字典标签"
                prop="tag">
                    <el-input 
                    placeholder="请输入字典标签"
                    v-model="detailForm.tag" 
                    autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item 
                label="字典值"
                prop="val">
                    <el-input 
                    placeholder="请输入字典值"
                    v-model="detailForm.val"
                    autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item 
                label="排序"
                prop="sort">
                    <el-input 
                    placeholder="请输入序号"
                    v-model="detailForm.sort" 
                    type="number"
                    autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button
                @click="isShowDetailBox = false"
                size="small">取 消</el-button>
                <el-button 
                type="primary" 
                size="small"
                @click="submitForm('detailForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShowAddBox: false,
            isShowDetailBox: false,
            searchVal: "",
            selectVal: "",
            addForm: {
                name: "",
                description: ""
            },
            detailForm: {
                name: "",
                val: "",
                sort: "",
            },
            addFormRules: {
                name: [
                    { required: true, message: '请输入字典名称', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入字典描述', trigger: 'blur' }
                ],
            },
            detailFormRules: {
                tag: [
                    { required: true, message: '请输入字典标签', trigger: 'blur' }
                ],
                val: [
                    { required: true, message: '请输入字典值', trigger: 'blur' }
                ],
                sort: [
                    { required: true, message: '请输入序号', trigger: 'blur' }
                ],
            },
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
            this.isShowAddBox = true
        },
        addDetail() {
            this.isShowDetailBox = true
        },
        // 添加字典
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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
