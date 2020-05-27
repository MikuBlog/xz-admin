<template>
  <el-dialog :visible.sync="dialog" title="选择区域" width="650px" append-to-body v-dialogDrag @close="hideBox">
    <el-transfer
      filterable
      filter-placeholder="请输入城市名称"
      v-model="selectList"
      :titles="['可选区域', '已选区域']"
      :data="addressList">
    </el-transfer>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="hideBox" size="small">取消</el-button>
      <el-button type="primary" @click="submitForm" size="small">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      addressList: [],
      selectList: [],
      ind: 0,
    };
  },
  methods: {
    hideBox() {
      this.dialog = false;
    },
    submitForm() {
      this.$parent.addressTable[this.ind].areaList.splice(0)
      this.$parent.addressTable[this.ind].area = ""
      let arr = []
      this.addressList.forEach(val => {
        val.disabled = false
      })
      this.selectList.forEach(val => {
        this.addressList[val].disabled = true
        arr.push(this.addressList[val].id)
        this.$parent.addressTable[this.ind].areaList.push(this.addressList[val].label)
      })
      this.$parent.addressTable[this.ind].area = `,${arr.join(",")},`
      this.hideBox()
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