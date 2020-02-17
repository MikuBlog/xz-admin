<template>
  <el-dialog :visible.sync="dialog" title="新增商品规格" width="570px" append-to-body v-dialogDrag>
    <el-form
      status-icon
      ref="form"
      :model="form"
      :rules="rules"
      size="small"
      @submit.native.prevent="addSku"
    >
      <el-form-item label="商品规格名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="商品规格值">
        <el-tag
          class="tags"
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="hideBox" size="small">取消</el-button>
      <el-button type="primary" @click="addSku" size="small">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      form: {
        name: "",
        value: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入商品规格名", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "change"
          }
        ],
        value: [
          { required: true, message: "请输入商品规格值", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue && !this.dynamicTags.includes(inputValue)) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    // 隐藏窗口
    hideBox() {
      this.dialog = false;
      this.resetForm();
    },
    addSku() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if(!this.dynamicTags.length) {
            this.$warnMsg("规格值不能为空")
            return
          }
          this.form.value = JSON.stringify(this.dynamicTags)
          this.$http_json({
            url: "/api/productSpec/add",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("添加成功");
            this.hideBox();
            this.$parent.getSkuList(
              this.$parent.nowPage,
              this.$parent.nowSize
            );
          });
        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      try {
        this.form = {
          name: "",
          value: ""
        };
        this.dynamicTags = []
        this.$refs.form.resetFields();
      } catch (e) {}
    }
  }
};
</script>

<style lang="scss" scoped>
.tags {
  margin-right: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-right: 10px;
  vertical-align: bottom;
}
</style>