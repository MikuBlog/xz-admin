<template>
  <el-dialog
    append-to-body
    :before-close="hideBox"
    :visible.sync="dialog"
    :title="isAdd ? '新增会员等级' : '编辑会员等级'"
    width="500px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="等级名称" prop="levelId">
        <el-select
          v-model="form.levelId"
        >
          <el-option
            v-for="item in levelList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="配置原名" prop="realName">
        <el-input :disabled="!isAdd" type="text" v-model="form.realName" style="width: 350px;"></el-input>
      </el-form-item>
      <el-form-item label="任务类型" prop="taskType">
        <el-input :disabled="!isAdd" type="text" v-model="form.taskType" style="width: 350px;"></el-input>
      </el-form-item>
      <el-form-item label="任务名称" prop="name">
        <el-input type="text" v-model="form.name" style="width: 350px;"></el-input>
      </el-form-item>
      <el-form-item label="限定数" prop="number">
        <el-input-number controls-position="right" type="number" v-model="form.number" style="width: 350px;"></el-input-number>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number controls-position="right" v-model="form.sort" style="width: 350px;" />
      </el-form-item>
      <el-form-item label="是否显示" prop="onShow">
        <el-radio-group v-model="form.onShow">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="必须达成" prop="onMust">
        <el-radio-group v-model="form.onMust">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="任务说明" prop="illustrate">
			  <el-input type="textarea" :rows="4" v-model="form.illustrate" style="width: 350px;" />
			</el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="hideBox">取消</el-button>
      <el-button type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import convertHttp from "@/utils/convertHttp";
export default {
  data() {
    const 
      numberValidate = (rule, value, callback) => {
        value < 0 ? callback(new Error("不得小于0")) : callback();
      },
      numberValidate_2 = (rule, value, callback) => {
        value < 0 || value > 999 ? callback(new Error("排序范围在0~999")) : callback();
      }
    return {
      dialog: false,
      isAdd: true,
      levelList: [],
      form: {
        id: "",
        name: "",
        levelId: "",
        number: 0,
        realName: 1,
        taskType: 0,
        sort: 0,
        onShow: true,
        onMust: false,
        illustrate: ""
      },
      rules: {
        name: [{ required: true, message: "请输入等级名称", trigger: "blur" }],
        realName: [{ required: !this.isAdd, message: "请输入配置原名", trigger: "blur" }],
        taskType: [{ required: !this.isAdd, message: "请输入任务类型", trigger: "blur" }],
        sort: [{ required: true, validator: numberValidate_2, trigger: "blur" }],
        number: [{ required: true, validator: numberValidate, trigger: "blur" }],
        levelId: [
          { required: true, message: "请选择会员名称", trigger: "blur" }
        ],
        onShow: [
          { required: true, message: "请选择是否显示", trigger: "blur" }
        ],
        onMust: [
          { required: true, message: "请选择是否必须达成任务条件", trigger: "blur" }
        ],
        illustrate: [{ required: true, message: "请填写说明", trigger: "blur" }]
      }
    };
  },
  beforeDestroy() {
    document.removeEventListener("keypress", this.submitEnter);
  },
  created() {
    this.getLevelList()
    document.addEventListener("keypress", this.submitEnter);
  },
  methods: {
    submitEnter(e) {
      e.keyCode === 13 && this.dialog === true && this.doSubmit();
    },
    hideBox() {
      this.resetForm();
    },
    initialLevelList(list) {
		  this.levelList.splice(0);
		  list.forEach(value => {
		    this.levelList.push({
          label: value.name,
          value: value.id
        });
		  });
		},
    // 获取会员等级列表
    getLevelList() {
		  this.$http_normal({
		    url: `/api/memberLevel/page?page=0&size=9999&sort=createTime,desc`,
		    method: "get"
		  }).then(result => {
		    const data = result.data;
		    this.initialLevelList(data.content);
		  });
		},
    initial(data) {
      Object
				.keys(data)
				.forEach(val => {
          if(val === 'createTime' || val === 'editTime' || val === 'deletion' || val === 'editor') {
            return
          }
					this.form[val] = data[val]
        })
    },
    getDetail() {
      this.$http_json({
        url: `/api/memberTask/get/${this.form.id}`,
        method: "get"
      }).then(result => {
        this.initial(result.data);
      });
    },
    doSubmit() {
      this.isAdd ? (this.doAdd(), delete this.form.id) : this.doEdit();
    },
    doAdd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http_json({
            url: "/api/memberTask/add",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("添加成功");
            this.hideBox();
            this.$parent.getMissionList(
              this.$parent.nowPage,
              this.$parent.nowSize
            );
          });
        } else {
          return false;
        }
      });
    },
    doEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http_json({
            url: "/api/memberTask/edit",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("编辑成功");
            this.hideBox();
            this.$parent.getMissionList(
              this.$parent.nowPage,
              this.$parent.nowSize
            );
          });
        } else {
          return false;
        }
      });
    },
    // 上传封面
    uploadImage_1(param) {
      this.$http_file({
        url: "/api/localStorage/upload",
        method: "post",
        data: {
          file: param.file
        },
        timeout: 100000
      }).then(result => {
        this.imageUrl_1 = convertHttp(result.data.url);
        this.form.image = result.data.url;
        this.$successMsg("上传成功！");
      });
    },
    // 上传封面
    uploadImage_2(param) {
      this.$http_file({
        url: "/api/localStorage/upload",
        method: "post",
        data: {
          file: param.file
        },
        timeout: 100000
      }).then(result => {
        this.imageUrl_2 = convertHttp(result.data.url);
        this.form.icon = result.data.url;
        this.$successMsg("上传成功！");
      });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        id: "",
        name: "",
        levelId: "",
        number: 0,
        realName: 1,
        taskType: 0,
        sort: 0,
        onShow: true,
        onMust: false,
        illustrate: ""
      };
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