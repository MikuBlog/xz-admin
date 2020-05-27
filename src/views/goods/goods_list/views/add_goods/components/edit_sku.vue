<template>
  <el-dialog :visible.sync="dialog" title="批量编辑" width="500px" append-to-body v-dialogDrag>
    <el-form
      status-icon
      ref="form"
      :model="form"
      size="small"
      @submit.native.prevent="editSpuList"
      label-width="100px"
    >
      <el-form-item label="售价(元)" prop="salesPrice">
        <el-input-number :min="0" v-model="form.salesPrice" style="width: 350px;" />
      </el-form-item>
      <el-form-item label="库存" prop="stock">
        <el-input-number :min="0" v-model="form.stock" style="width: 350px;" />
      </el-form-item>
      <el-form-item label="预警库存" prop="warnStock">
        <el-input-number :min="0" v-model="form.warnStock" style="width: 350px;" />
      </el-form-item>
      <el-form-item label="成本价(元)" prop="costPrice">
        <el-input-number :min="0" type="number" v-model="form.costPrice" style="width: 350px;" />
      </el-form-item>
      <el-form-item label="重量" prop="weight">
        <el-input-number :min="0" type="number" v-model="form.weight" style="width: 350px;" />
      </el-form-item>
      <el-form-item label="是否显示" prop="costPrice">
        <el-switch v-model="form.onShow" active-color="#409eff"></el-switch>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          :http-request="uploadImage"
          :show-file-list="false"
          action="string"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="hideBox" size="small">取消</el-button>
      <el-button type="primary" @click="editSpuList" size="small">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import convertHttp from "@/utils/convertHttp";
export default {
  data() {
    return {
      dialog: false,
      form: {
        salesPrice: 0,
        stock: 0,
        costPrice: 0,
        warnStock: 0,
        onShow: true,
        weight: 0,
        image: ""
      },
      imageUrl: ""
    };
  },
  methods: {
    hideBox() {
      this.dialog = false;
      this.resetForm();
    },
    format(key) {
      if (!this.form[key]) {
        return;
      }
      if (this.form[key] <= 0) {
        this.form[key] = 0;
      }
    },
    uploadImage(param) {
      this.$http_file({
        url: "/api/localStorage/upload",
        method: "post",
        data: {
          file: param.file
        },
        timeout: 100000
      }).then(result => {
        this.imageUrl = convertHttp(result.data.url);
        this.form.image = result.data.url;
        this.$successMsg("上传成功！");
      });
    },
    editSpuList() {
      this.$parent.generateSkuList.forEach(val => {
        if (val.checked) {
          val.salesPrice = this.form.salesPrice
          val.stock = this.form.stock
          val.warnStock = this.form.warnStock
          val.onShow = this.form.onShow
          val.weight = this.form.weight
          val.costPrice = this.form.costPrice
          val.image = this.form.image ? this.form.image : val.image;
          val.coverImage = this.imageUrl ? this.imageUrl : val.coverImage;
        }
      });
      this.$parent.caculateSalesPrice();
      this.hideBox();
    },
    // 重置表单
    resetForm() {
      try {
        this.form = {
          salesPrice: 0,
          stock: 0,
          costPrice: 0,
          warnStock: 0,
          onShow: true,
          weight: 0,
          image: ""
        };
        this.imageUrl = "";
        this.$refs.form.resetFields();
      } catch (e) {}
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