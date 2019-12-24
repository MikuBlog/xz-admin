<template>
  <div class="chart-resp">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <Curve />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 1rem">
      <el-col :xs="24" :sm="24" :md="24" :lg="8">
        <el-card class="box-card">
          <Ring />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8">
        <el-card class="box-card">
          <WaterFall />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8">
        <el-card class="box-card">
          <Radar />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 1rem">
      <el-col :sm="24" :md="12">
        <el-card class="box-card">
          <Tree />
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12">
        <el-card class="box-card">
          <China />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 1rem">
      <el-col :xs="24" :sm="24" :md="24" :lg="8">
        <el-card class="box-card">
          <Sankey />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8">
        <el-card class="box-card">
          <HeatMap />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8">
        <el-card class="box-card">
          <Scatter />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Curve from "./component/curve";
import China from "./component/china";
import Ring from "./component/ring";
import WaterFall from "./component/waterfall";
import Radar from "./component/radar";
import Tree from "./component/tree";
import Sankey from "./component/sankey";
import HeatMap from "./component/heatmap";
import Scatter from "./component/scatter";
export default {
  components: {
    Curve,
    China,
    Ring,
    WaterFall,
    Radar,
    Sankey,
    HeatMap,
    Scatter,
    Tree
  }
};
</script>

<style lang="scss" scoped>
</style>