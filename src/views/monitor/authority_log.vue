<template>
    <div class="authority-log">
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
                        class="button-left-circle"
                        circle></el-button>
                    </div>
                    <el-table
                        :data="exceptionLogList"
                        style="width: 100%">
                        <el-table-column
                        label="用户名"
                        >
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.userName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="IP"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.ip }}
                            </div>
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
                        label="方法名称"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.methodName }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="参数"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.param }}
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
                        label="异常详情"
                        >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>
                            </div>
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
            exceptionLogList: [{
                userName: "xuanzai",
                ip: "120.78.199.46",
                description: "xuanzainiub",
                methodName: "xuanzainiub",
                param: "none",
                consumeTime: "0",
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
    },
    methods: {
        showDetail() {
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .el-table {
        white-space: nowrap;
    }
</style>
