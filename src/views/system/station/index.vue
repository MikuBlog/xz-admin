<template>
    <div class="station-manage">
        <el-row>
            <el-col :span="24">
                <el-card class="box-card">
                    <div class="search">
                        <el-input 
                        v-model="searchVal" 
                        placeholder="请选择类型进行搜索"
                        class="search-input margin-box"
                        @keyup.native="searchEnter"></el-input>
                        <el-select 
                        v-model="selectType" 
                        @change="search"
                        placeholder="类型"
                        clearable
                        class="select-input margin-box">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button 
                        icon="el-icon-search" 
                        class="margin-box"
                        @click="search"
                        circle></el-button>
                        <el-button 
                        type="primary"
                        class="margin-box"
                        icon="el-icon-plus" 
                        @click="showAddStation"
                        circle></el-button>
                    </div>
                    <el-table
                        :data="stationList"
                        style="width: 100%">
                        <el-table-column
                        label="名称"
                        :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="所属部门"
                        :show-overflow-tooltip="true"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.dept.name }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="排序"
                        :show-overflow-tooltip="true"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.sort }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="状态"
                        :show-overflow-tooltip="true"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <el-tag :type="scope.row.enabled ? '' : 'info'">
                                    {{ scope.row.enabled ? "正常" : "禁用"}}
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
                            @click="editStationItem(scope.row)"
                            class="margin-box"
                            size="small"></el-button>
                            <el-button 
                            type="danger" 
                            icon="el-icon-delete"
                            @click="deleteStation(scope.row)"
                            class="margin-box"
                            size="small"
                            ></el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10, 25, 50, 100]"
                        :page-size.sync="nowSize"
                        :pager-count="5"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalElements">
                        </el-pagination>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <stationForm 
        ref="form" 
        :is-add="isAdd" 
        :dicts="dicts"
        @updateStationList="getStationList"/>
    </div>
</template>

<script>
import stationForm from './form'
export default {
    components: { stationForm },
    data() {
        return {
            searchVal: "",
            selectType: "",
            stationList: [],
            dicts: [],
            isAdd: true,
            // 当前页数
            nowPage: 1,
            // 当前页条数
            nowSize: 10,
            // 总条数
            totalElements: 0,
            options: [{
                value: 'true',
                label: '正常'
            },{
                value: 'false',
                label: '禁用'
            }],
        }
    },
    created() {
        // 初始化页面数据
        this.getStationList()
        // 获取岗位字典
        this.getDictsList('job_status')
    },
    methods: {
        // 删除岗位
        deleteStation(item) {
            this
                .$showMsgBox({ msg: `是否删除${item.name}岗位?` })
                .then(() => {
                    this.$http_json({
                        url: `/api/job/del/${item.id}`,
                        method: "post"
                    }).then(() => {
                        this.$successMsg('删除成功')
                        this.getStationList()
                    })
                })
        },
        // 显示添加岗位窗口
        showAddStation() {
            this.isAdd = true
            this.$refs.form.dialog = true
            this.$refs.form.resetForm()
        },
        // 显示编辑岗位窗口
        showEditStation() {
            this.isAdd = false
            this.$refs.form.dialog = true
        },
        // 编辑岗位
        editStationItem(item) {
            const stationForm = this.$refs.form.stationForm
            this.$refs.form.stationId = item.id
            stationForm.name = item.name
            stationForm.sort = item.sort
            stationForm.enabled = item.enabled.toString()
            this.$refs.form.deptId = item.dept.id
            this.showEditStation()
        },
        // 点击搜索
        search(val) {
            this.getStationList()
        },
        // 回车搜索
        searchEnter(e) {
            e.keyCode === 13
            && this.getStationList()
        },
        // 条数变化
        handleSizeChange(size) {
            this.nowSize = size
            this.getStationList()
        },
        // 页数变化
        handleCurrentChange(page) {
            this.nowPage = page
            this.getStationList()
        },
        // 分页处理
        initialPage(totalElements) {
            this.totalElements = totalElements
        },
        // 初始化错误日志列表
        initialStationList(list) {
            this.stationList.splice(0, this.stationList.length)
            list.forEach(value => {
                this.stationList.push(value)
            })
        },
        // 获取错误日志信息
        getStationList() {
            this.$http_normal({
                url: `/api/job/page?page=${this.nowPage - 1}&size=${this.nowSize}&sort=sort,asc${this.searchVal ? `&name=${this.searchVal}` : ""}${this.selectType.length > 0 ? `&enabled=${this.selectType}` : ""}`,
                method: "get"
            }).then(result => {
                const data = result.data
                this.initialPage(data.totalElements)
                this.initialStationList(data.content)
            })
        },
        // 获取岗位字典
        getDictsList(dictName) {
            this.$http_json({
                url: `/api/dictDetail/page?page=0&size=9999&sort=sort,asc&dictName=${dictName}`
            }).then(result => {
                this.dicts = result.data.content
            })
        },
    }
}
</script>

<style>
</style>
