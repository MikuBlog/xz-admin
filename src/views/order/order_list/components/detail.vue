<template>
  <el-dialog
    append-to-body
    :before-close="hideBox"
    :visible.sync="dialog"
    title="订单详情"
    width="600px"
  >
    <el-card style="margin-bottom: 1rem">
      <div slot="header">收货信息</div>
      <p>收货人：{{ detail.receiverName || "无" }}</p>
      <p>联系电话：{{ detail.receiverPhone || "无" }}</p>
      <p>收货地址：{{ detail.receiverProvince
      ? detail.receiverProvince + detail.receiverCity + detail.receiverDistrict
      : "无"}}</p>
    </el-card>
    <el-card style="margin-bottom: 1rem">
      <div slot="header">订单信息</div>
      <el-row>
        <el-col :span="12">
          <p>订单编号：{{ detail.orderNum || "无" }}</p>
          <p>商品总数：{{ detail.totalNumber || "无" }}</p>
          <p>支付邮费：￥{{ detail.postage || 0}}</p>
          <!-- <p>支付方式：{{ detail.payType || "无"}}</p> -->
          <p>实际支付：￥{{ detail.payAmount || 0}}</p>
        </el-col>
        <el-col :span="12">
          <p>
            订单状态：{{ detail.status === 0
            ? '未付款'
            : detail.status === 1
            ? '未发货'
            : detail.status === 2
            ? '待收货'
            : detail.status === 3
            ? '待评价'
            : detail.status === 4
            ? '已完成'
            : detail.status === -1
            ? '退款中'
            : detail.status === -2
            ? '已退款'
            : '已删除'}}
          </p>
          <p>商品总价：￥{{ detail.totalAmount || 0 }}</p>
          <p>创建时间：{{ detail.createTime || "无"}}</p>
          <p>支付时间：{{ detail.payTime || "无"}}</p>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-bottom: 1rem">
      <div slot="header">备注信息</div>
      <div>{{ detail.remark || "无" }}</div>
    </el-card>
  </el-dialog>
</template>

<script>
import convertHttp from "@/utils/convertHttp";
export default {
  data() {
    return {
      dialog: false,
      detail: {},
      id: ""
    };
  },
  methods: {
    hideBox() {
      this.dialog = false;
    },
    getDetail() {
      this.$http_json({
        url: `/api/orderForm/get/${this.id}`,
        method: "get"
      }).then(result => {
        this.detail = result.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 3px 0;
}
</style>