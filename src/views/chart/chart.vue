<template>
    <div class="chart">
        <el-row :gutter="20">
            <el-col :xs="12" :sm="12" :md="6" :xl="6">
                <el-card class="box-card">
                    <el-row>
                        <el-col :span="12">
                            <div class="iconfont-box">
                                <span class="el-icon-user-solid"></span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="content-box">
                                <div class="header">
                                    流量
                                </div>
                                <div class="number">
                                    <countTo :startVal="0" :endVal="peopleNum" :duration="5000"/>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :xs="12" :sm="12" :md="6" :xl="6">
                <el-card class="box-card">
                    <el-row>
                        <el-col :span="12">
                            <div class="iconfont-box">
                                <span class="el-icon-document"></span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="content-box">
                                <div class="header">
                                    留言
                                </div>
                                <div class="number">
                                  <countTo :startVal="0" :endVal="messageNum" :duration="8000"/>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :xs="12" :sm="12" :md="6" :xl="6">
                <el-card class="box-card">
                    <el-row>
                        <el-col :span="12">
                            <div class="iconfont-box">
                                <span class="el-icon-coin"></span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="content-box">
                                <div class="header">
                                销售额
                                </div>
                                <div class="number">
                                  <countTo :startVal="0" :endVal="money" :duration="6000"/>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :xs="12" :sm="12" :md="6" :xl="6">
                <el-card class="box-card">
                    <el-row>
                        <el-col :span="12">
                            <div class="iconfont-box">
                                <span class="el-icon-shopping-cart-1"></span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="content-box">
                                <div class="header">
                                销售量
                                </div>
                                <div class="number">
                                  <countTo :startVal="0" :endVal="sellNum" :duration="6000"/>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-row style="margin-top: 1rem">
            <el-col :span="24">
                <el-card class="box-card">
                    <ve-line :data="lineData" :settings="lineSettings"></ve-line>
                </el-card>
            </el-col>
        </el-row>
        <el-row style="margin-top: 1rem" :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="8">
                <el-card class="box-card">
                    <ve-ring :data="ringData" :settings="ringSettings"></ve-ring>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="8">
                <el-card class="box-card">
                    <ve-funnel :data="funnelData" :settings="funnelSettings"></ve-funnel>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="8">
                <el-card class="box-card">
                    <ve-histogram :data="histogramData" :settings="histogramSettings"></ve-histogram>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// 引入v-chart
import countTo from 'vue-count-to'
import VeLine from 'v-charts/lib/line.common'
import VePie from 'v-charts/lib/pie.common'
import VeRing from 'v-charts/lib/ring.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VeFunnel from 'v-charts/lib/funnel.common'
export default {
    components: { VeLine, VePie, VeRing, VeHistogram, VeFunnel, countTo },
    data() {
        this.lineSettings = {
            stack: { '用户': ['访问用户', '下单用户'] },
            area: true
        }
        this.ringSettings = {
            roseType: 'radius'
        }
        this.histogramSettings = {
            metrics: ['访问用户', '下单用户'],
            dimension: ['日期']
        }
        this.funnelSettings = {
            dimension: '状态',
            metrics: '数值'
        }
        return {
            peopleNum: 1023,
            money: 6783.5,
            sellNum: 573,
            messageNum: 79,
            speed: 40,
            lineData: {
                columns: ['日期', '访问用户', '下单用户', '下单率'],
                rows: [
                    { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
                    { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
                    { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
                    { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
                    { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
                    { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 },
                    { '日期': '1/7', '访问用户': 5634, '下单用户': 6837, '下单率': 0.78 },
                ]
            },
            ringData: {
                columns: ['日期', '访问用户'],
                rows: [
                    { '日期': '1/1', '访问用户': 1393 },
                    { '日期': '1/2', '访问用户': 3530 },
                    { '日期': '1/3', '访问用户': 2923 },
                    { '日期': '1/4', '访问用户': 1723 },
                    { '日期': '1/5', '访问用户': 3792 },
                    { '日期': '1/6', '访问用户': 4593 }
                ]
            },
            histogramData: {
                columns: ['日期', '访问用户', '下单用户', '下单率'],
                rows: [
                    { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
                    { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
                    { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
                    { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
                    { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
                    { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
                ]
            },
            funnelData: {
                columns: ['状态', '数值'],
                rows: [
                    { '状态': '展示', '状态': '展示', '数值': 900 },
                    { '状态': '访问', '状态': '访问', '数值': 600 },
                    { '状态': '点击', '状态': '点击', '数值': 300 },
                    { '状态': '订单', '状态': '订单', '数值': 100 }
                ]
            },
        }
    },
    mounted() {
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
    .chart {
        position: relative;
    }
    .box-card {
        position: relative;
        margin: .5rem 0;
    }
    .el-icon-user-solid, .el-icon-document, .el-icon-coin, .el-icon-shopping-cart-1 {
        position: relative;
        line-height: 5rem;
        font-size: 4rem;
        color: #3fc8c5;
        padding: 1rem;
        transition: .5s;
        border-radius: 1rem;
    }
    .el-icon-user-solid:hover {
        color: #fefefe;
        background: #3fc8c5;
    }
    .el-icon-document {
        color: #38a3f5;
    }
    .el-icon-document:hover {
        color: #fefefe;
        background: #38a3f5;
    }
    .el-icon-coin {
        color: #f3516b;
    }
    .el-icon-coin:hover {
        color: #fefefe;
        background: #f3516b;
    }
    .el-icon-shopping-cart-1 {
        color: #ffd900;
    }
    .el-icon-shopping-cart-1:hover {
        color: #fefefe;
        background: #ffd900;
    }
    .content-box {
        position: relative;
        top: 1.8rem;
        font-size: 1.1rem;
        color: #8b8b8b;
        text-align: right;
        padding-right: .5rem;
    }
    .number {
        font-weight: bolder;
        color: #656565;
        font-size: 1.2rem;
    }
</style>
