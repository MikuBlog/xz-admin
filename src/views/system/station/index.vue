<template>
  <div class="station-manage">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <data-table 
            ref="dataTable"
            :tableConfig="tableConfig"
          >
            <template slot-scope="scope">
              <el-input
                v-model="tableConfig.requestParam.searchParam.name"
                placeholder="搜索岗位名称"
                class="search-input margin-box"
                @keyup.native.enter="scope.table.toFirstPage"
              ></el-input>
              <el-select
                v-model="tableConfig.requestParam.searchParam.enabled"
                @change="scope.table.toFirstPage"
                placeholder="类型"
                clearable
                class="select-input margin-box"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </data-table>
        </el-card>
      </el-col>
    </el-row>
    <stationForm ref="form" :is-add="isAdd" :dicts="dicts" />
  </div>
</template>

<script>
import Initial from "./js/initial";
import Operation from "./js/operation";
import Property from "./js/property";
import stationForm from "./components/form";
export default {
  mixins: [Initial, Operation, Property],
  components: { stationForm }
};
</script>

<style>
</style>
