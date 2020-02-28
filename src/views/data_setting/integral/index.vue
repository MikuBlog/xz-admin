<template>
  <div class="article-list">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
            <el-form-item label="积分抵用比例" prop="day">
              <el-input @input="format('scale')" type="number" v-model="form.scale" style="width: 350px;" />
            </el-form-item>
            <el-form-item>
              <span style="color: red">积分抵用比例(1积分抵多少金额)</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="doSubmit">确认</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Operation from "./js/operation";
import Property from "./js/property";
export default {
  mixins: [Operation, Property]
};
</script>
