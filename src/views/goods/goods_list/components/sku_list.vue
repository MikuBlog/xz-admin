<template>
  <el-dialog :visible.sync="dialog" title="商品属性" width="1200px" append-to-body v-dialogDrag>
    <el-table ref="table" :data="generateSkuList" border>
      <el-table-column v-for="(item, ind) in tableHeader" :label="item" :key="ind">
        <template slot-scope="scope">
          <div class="name-wrapper">{{ scope.row.valList[ind] }}</div>
        </template>
      </el-table-column>
      <el-table-column label="销量" align="center">
        <template slot-scope="scope">
          <div class="name-wrapper">{{ scope.row.sales }}件</div>
        </template>
      </el-table-column>
      <el-table-column label="售价" align="center">
        <template slot-scope="scope">
          <el-input-number controls-position="right" :min="0" v-model="scope.row.salesPrice" />
        </template>
      </el-table-column>
      <el-table-column label="库存" align="center">
        <template slot-scope="scope">
          <el-input-number controls-position="right" :min="0" v-model="scope.row.stock" />
        </template>
      </el-table-column>
      <el-table-column label="预警库存" align="center">
        <template slot-scope="scope">
          <el-input-number controls-position="right" :min="0" v-model="scope.row.warnStock" />
        </template>
      </el-table-column>
      <el-table-column label="重量" align="center">
        <template slot-scope="scope">
          <el-input-number controls-position="right" :min="0" v-model="scope.row.weight" />
        </template>
      </el-table-column>
      <el-table-column label="是否显示" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.onShow" active-color="#409eff"></el-switch>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="hideBox" size="small">取消</el-button>
      <el-button type="primary" @click="submitForm" size="small">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import convertHttp from "@/utils/convertHttp";
export default {
  data() {
    return {
      dialog: false,
      id: "",
      generateSkuList: [],
      tableHeader: []
    };
  },
  methods: {
    hideBox() {
      this.dialog = false;
    },
    submitForm() {
      this.$http_json({
        url: "/api/productSku/edit",
        method: "post",
        data: this.generateSkuList.map(val => {
          return {
            costPrice: val.costPrice,
            id: val.id,
            image: val.image,
            lockStock: val.lockStock,
            onShow: val.onShow,
            sales: val.sales,
            salesPrice: val.salesPrice,
            spuId: val.spuId,
            stock: val.stock,
            value: val.value,
            warnStock: val.warnStock,
            weight: val.weight
          };
        })
      }).then(result => {
        this.$successMsg("修改成功");
        this.hideBox();
      });
    },
    getSkuList() {
      this.$http_json({
        url: `/api/productSku/list/${this.id}`,
        method: "get"
      }).then(result => {
        this.generateSkuList = result.data.map(val => {
          return {
            skuDesc: JSON.parse(val.value),
            coverImage: val.image ? convertHttp(val.image) : "",
            checked: false,
            ...val,
            valList: Object.keys(JSON.parse(val.value)).map(key => {
              return JSON.parse(val.value)[key];
            })
          };
        });
        this.formatData(result.data[0]);
      });
    },
    formatData(item) {
      this.tableHeader = Object.keys(JSON.parse(item.value));
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 138px;
  height: 138px;
  line-height: 138px;
  text-align: center;
}
.avatar {
  width: 138px;
  height: 138px;
  display: block;
}
</style>