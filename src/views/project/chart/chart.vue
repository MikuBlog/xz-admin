<template>
    <div class="chart">
        <el-row>
            <el-card class="box-card">
                <FlowChart></FlowChart>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import FlowChart from '@/components/flow_chart/chart.vue'
export default {
    components: { FlowChart }
}
</script>

<style>

</style>
