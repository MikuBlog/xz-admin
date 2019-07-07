<template>
    <div class="chart">
        <el-row :gutter="20">
            <el-col :xs="12" :sm="12" :md="6" :xl="6">
                <el-card class="box-card">
                    <el-row>
                        <el-col :span="12">
                            <div class="iconfont-box">
                                <span class="iconfont iconpeoples"></span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="content-box">
                                <div class="header">
                                    流量
                                </div>
                                <div class="number">
                                    1024.13
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
                                <span class="iconfont iconmessage"></span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="content-box">
                                <div class="header">
                                    留言
                                </div>
                                <div class="number">
                                    1024.13
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
                                <span class="iconfont iconmoney"></span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="content-box">
                                <div class="header">
                                销售额
                                </div>
                                <div class="number">
                                    1024.13
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
                                <span class="iconfont iconcart"></span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="content-box">
                                <div class="header">
                                销售量
                                </div>
                                <div class="number">
                                    1024.13
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
                    <ve-line :data="lineData"></ve-line>
                </el-card>
            </el-col>
        </el-row>
        <el-row style="margin-top: 1rem" :gutter="20">
            <el-col :xs="24" :sm="24" :md="8">
                <el-card class="box-card">
                    <ve-ring :data="ringData" :settings="ringSettings"></ve-ring>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8">
                <el-card class="box-card">
                    <ve-funnel :data="funnelData" :settings="funnelSettings"></ve-funnel>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8">
                <el-card class="box-card">
                    <ve-histogram :data="histogramData" :settings="histogramSettings"></ve-histogram>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// 引入v-chart
import VeLine from 'v-charts/lib/line.common'
import VePie from 'v-charts/lib/pie.common'
import VeRing from 'v-charts/lib/ring.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VeFunnel from 'v-charts/lib/funnel.common'
export default {
    components: { VeLine, VePie, VeRing, VeHistogram, VeFunnel },
    data() {
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
            lineData: {
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
                columns: ['状态', '状态', '数值'],
                rows: [
                    { '状态': '展示', '状态': '展示', '数值': 900 },
                    { '状态': '访问', '状态': '访问', '数值': 600 },
                    { '状态': '点击', '状态': '点击', '数值': 300 },
                    { '状态': '订单', '状态': '订单', '数值': 100 }
                ]
            }
        }
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
    .iconfont {
        position: relative;
        width: 5rem;
        line-height: 5rem;
        font-size: 4rem;
        color: #3fc8c5;
        padding: 1rem;
        transition: .5s;
        border-radius: 1rem;
    }
    .iconpeoples:hover {
        color: #fefefe;
        background: #3fc8c5;
    }
    .iconmessage {
        color: #38a3f5;
    }
    .iconmessage:hover {
        color: #fefefe;
        background: #38a3f5;
    }
    .iconmoney {
        color: #f3516b;
    }
    .iconmoney:hover {
        color: #fefefe;
        background: #f3516b;
    }
    .iconcart {
        color: #32bea3;
    }
    .iconcart:hover {
        color: #fefefe;
        background: #32bea3;
    }
    .content-box {
        position: relative;
        top: 1rem;
        font-size: 1.1rem;
        color: #8b8b8b;
        text-align: right;
        padding-right: .5rem;
    }
    .number {
        font-weight: bold;
        color: #656565;
    }
</style>
