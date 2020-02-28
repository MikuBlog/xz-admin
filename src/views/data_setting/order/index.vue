<template>
  <div class="article-list">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <el-form ref="form" :model="form" :rules="rules" size="small" label-width="130px">
            <el-form-item label="用户下单后超时" prop="orderUnpaid">
              <el-input @input="format('orderUnpaid')" type="number" v-model="form.orderUnpaid" style="width: 350px;">
                <template slot="append">分钟</template>
              </el-input>
              <span style="margin-left: 1rem">用户未付款，则订单自动取消</span>
            </el-form-item>
            <el-form-item label="订单发货后超期" prop="orderUnconfirm">
              <el-input @input="format('orderUnconfirm')" type="number" v-model="form.orderUnconfirm" style="width: 350px;">
                <template slot="append">天</template>
              </el-input>
              <span style="margin-left: 1rem">未确认收货，则订单自动确认收货</span>
            </el-form-item>
            <el-form-item label="确认收货后超期" prop="orderComment">
              <el-input @input="format('orderComment')" type="number" v-model="form.orderComment" style="width: 350px;">
                <template slot="append">天</template>
              </el-input>
              <span style="margin-left: 1rem">未评价商品，则取消评价资格</span>
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
