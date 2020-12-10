<template>
  <el-dialog
    :visible.sync="dialog"
    :title="isAdd ? '新增权限' : '编辑权限'"
    append-to-body
    :close-on-click-modal="false"
    v-dialogDrag
    width="500px"
    @close="hideBox"
  >
    <el-form
      status-icon
      ref="authorityForm"
      :model="authorityForm"
      :rules="rules"
      size="small"
      label-width="80px"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="authorityForm.name" style="width: 360px;" />
      </el-form-item>
      <el-form-item label="别名" prop="alias">
        <el-input v-model="authorityForm.alias" style="width: 360px;" />
      </el-form-item>
      <el-form-item style="margin-bottom: 0px;" label="上级类目" prop="parentId">
        <treeselect
          v-model="authorityForm.parentId"
          :options="permissions"
          style="width: 360px;"
          placeholder="选择上级类目"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="hideBox" class="margin-box" size="small">取消</el-button>
      <el-button type="primary" @click="doSubmit" class="margin-box" size="small" :loading="isLoading">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      isLoading: false,
      permissions: [],
      authorityId: "",
      authorityForm: { name: "", alias: "", parentId: 0 },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        alias: [{ required: true, message: "请输入别名", trigger: "blur" }],
        parentId: [{ required: true, message: "请选择上级类目", trigger: "blur" }]
      }
    };
  },
	beforeDestroy() {
		document.removeEventListener('keypress', this.submitEnter)
	},
  created() {
    // 获取权限树状列表
    this.getPermissions();
		document.addEventListener('keypress', this.submitEnter)
  },
  methods: {
		submitEnter(e) {
			e.keyCode === 13 && this.dialog === true && this.doSubmit()
		},
    // 隐藏窗口
    hideBox() {
      this.dialog = false;
      this.resetForm()
    },
    // 提交数据
    doSubmit() {
      this.$refs["authorityForm"].validate(valid => {
        if (valid) {
          this.isAdd ? this.addAuthority() : this.editAuthority();
        } else {
          return false;
        }
      });
    },
    // 添加权限
    addAuthority() {
      delete this.authorityForm.id;
      this.isLoading = true
      this.$http_json({
        url: "/api/permission/add",
        method: "post",
        data: this.authorityForm
      }).then(result => {
        this.isLoading = false
        this.$successMsg("添加成功");
        this.hideBox();
        this.getPermissions();
        this.$parent.getAuthorityList();
      }).catch(e => {
        this.isLoading = false
      });
    },
    // 编辑权限
    editAuthority() {
      this.authorityForm.id = this.authorityId;
      this.isLoading = true
      this.$http_json({
        url: "/api/permission/edit",
        method: "post",
        data: this.authorityForm
      }).then(result => {
        this.isLoading = false
        this.$successMsg("编辑成功");
        this.hideBox();
        this.getPermissions();
        this.$parent.getAuthorityList();
      }).catch(e => {
        this.isLoading = false
      });
    },
    // 重置表单
    resetForm() {
      try {
        this.authorityForm = { name: "", alias: "", parentId: 0 };
        this.$refs.authorityForm.resetFields();
      } catch (e) {}
    },
    // 初始化权限列表
    initialPermissions(list) {
      const permission = { id: 0, label: "顶级类目", children: [] };
      this.permissions.splice(0);
      permission.children = list;
      this.permissions.push(permission);
    },
    // 获取权限列表
    getPermissions() {
      this.$http_json({
        url: "/api/permission/tree",
        method: "get"
      }).then(result => {
        this.initialPermissions(result.data);
      });
    }
  }
};
</script>

<style scoped>
</style>