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
                                <el-input v-model="searchVal_1" placeholder="搜索内容"
                                @keyup.native="searchEnter_1($event)"></el-input>
                            </el-col>
                                <el-select 
                                v-model="selectType_1" 
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
                                @click="search_1"
                                circle></el-button>
                        </el-row>
                    </div>
                    <el-table
                        :data="dictionaryList"
                        style="width: 100%;"
                        @row-click="getDictName">
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
                                {{ scope.row.remark }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        label="操作"
                        width="150"
                        fixed="right">
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
                        @size-change="handleSizeChange_1"
                        @current-change="handleCurrentChange_1"
                        :page-sizes="[10, 25, 50, 100]"
                        :page-size="nowSize_1"
                        :pager-count="5"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalElements_1">
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
                            <el-col :span="12">
                                <el-input
                                v-model="searchVal_2" 
                                placeholder="按字典标签内容搜索"
                                @keyup.native="searchEnter_2($event)"></el-input>
                            </el-col>
                            <el-button 
                                icon="el-icon-search" 
                                @click="search_2"
                                circle></el-button>
                        </el-row>
                    </div>
                    <el-table
                        :data="detailList"
                        style="width: 100%">
                        <el-table-column
                        label="所属字典"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ dictName }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="字典标签"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.label }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="字典值"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.value }}
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
                        width="150"
                        fixed="right"
                        >
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
                        @size-change="handleSizeChange_2"
                        @current-change="handleCurrentChange_2"
                        :page-sizes="[10, 25, 50, 100]"
                        :page-size="nowSize_2"
                        :pager-count="5"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalElements_2">
                        </el-pagination>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <Form-Add 
        ref="formAdd" 
        :isAdd="isAdd_1" 
        @updateDictionaryList="updateDictionaryList">
        </Form-Add>
        <Form-Edit 
        ref="formEdit" 
        :isAdd="isAdd_2"
        @updateDetailList="updateDetailList">
        </Form-Edit>
    </div>
</template>

<script>
import FormAdd from './add'
import FormEdit from './edit'
export default {
    components: { FormAdd, FormEdit },
    data() {
        return {
            searchVal_1: "",
            selectType_1: "",
            searchVal_2: "",
            dictName: "",
            isAdd_1: true,
            isAdd_2: true,
            // 当前页数
            nowPage_1: 1,
            // 当前页条数
            nowSize_1: 10,
            // 总条数
            totalElements_1: 1,
            // 当前页数
            nowPage_2: 1,
            // 当前页条数
            nowSize_2: 10,
            // 总条数
            totalElements_2: 1,
            isShowAddBox: false,
            isShowDetailBox: false,
            dictionaryList: [],
            detailList: [{
                belong: "xz_test",
                tag: "正常",
                val: "true",
                sort: 1
            }],
            options: [{
                value: 'name',
                label: '名称'
            },{
                value: 'remark',
                label: '描述'
            }],
        }
    },
    created() {
        // 初始化页面数据
        this.getDictionaryList()
        this.getDetailList()
    },
    methods: {
        // 更新字典列表
        updateDictionaryList() {
            this.getDictionaryList()
        },
        // 更新字典详情列表
        updateDetailList() {
            this.getDetailList()
        },
        addDictionary() {
            this.isAdd_1 = true
            this.$refs.formAdd.isShowAddBox = true
        },
        addDetail() {
            this.isAdd_2 = true
            this.$refs.formEdit.isShowDetailBox = true
        },
        // 点击搜索
        search_1() {
            this.selectType_1
            ? this.getDictionaryList()
            : this.$warnMsg('请选择搜索类型')
        },
        // 回车搜索
        searchEnter_1(e) {
            e.keyCode === 13
            && (this.selectType_1
            ? this.getDictionaryList()
            : this.$warnMsg('请选择搜索类型'))
        },
        // 点击搜索
        search_2() {
            this.getDetailList()
        },
        // 回车搜索
        searchEnter_2(e) {
            e.keyCode === 13
            && this.getDetailList()
        },
        // 条数变化
        handleSizeChange_1(size) {
            this.nowSize_1 = size
            this.getDictionaryList()
        },
        // 页数变化
        handleCurrentChange_1(page) {
            this.nowPage_1 = page
            this.getDictionaryList()
        },
        // 条数变化
        handleSizeChange_2(size) {
            this.nowSize_2 = size
            this.getDetailList()
        },
        // 页数变化
        handleCurrentChange_2(page) {
            this.nowPage_2 = page
            this.getDetailList()
        },
        // 分页处理
        initialPage(key, val) {
            this[key] = val
        },
        // 初始化字典列表
        initialDictionaryList(list) {
            this.dictionaryList.splice(0, this.dictionaryList.length)
            list.forEach(value => {
                this.dictionaryList.push(value)
            })
        },
        // 获取字典信息
        getDictionaryList() {
            this.$http_normal({
                url: `/api/dict/page?page=${this.nowPage_1 - 1}&size=${this.nowSize_1}${this.selectType_1 ? `&${this.selectType_1}=${this.searchVal_1}` : ""}`,
                method: "get"
            }).then(result => {
                const data = result.data
                this.initialPage('totalElements_1', data.totalElements)
                this.initialDictionaryList(data.content)
            })
        },
        // 初始化字典详情列表
        initialDetailList(list) {
            this.detailList.splice(0, this.detailList.length)
            list.forEach(value => {
                this.detailList.push(value)
            })
        },
        // 获取字典详情信息
        getDetailList() {
            this.$http_normal({
                url: `/api/dictDetail/page?page=${this.nowPage_2 - 1}&size=${this.nowSize_2}&dictName=${this.dictName}&label=${this.searchVal_2}`,
                method: "get"
            }).then(result => {
                const data = result.data
                this.initialPage('totalElements_2', data.totalElements)
                this.initialDetailList(data.content)
            })
        },
        // 获取字典列表当行的信息
        getDictName(row) {
            this.dictName = row.name
            this.getDetailList()
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
