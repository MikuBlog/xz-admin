<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '新增菜单' : '编辑菜单'" append-to-body width="600px">
    <el-form ref="menuForm" :model="menuForm" :rules="rules" size="small" label-width="80px">
      <el-form-item label="菜单图标">
        <el-popover
          placement="bottom-start"
          width="460"
          trigger="click"
          @show="$refs['iconSelect'].reset()">
          <IconSelect ref="iconSelect" @selected="selected" />
          <el-input slot="reference" v-model="menuForm.icon" style="width: 460px;" placeholder="点击选择图标" readonly>
            <svg-icon v-if="menuForm.icon" slot="prefix" :icon-class="menuForm.icon" class="el-input__icon" style="height: 32px;width: 16px;" />
            <i v-else slot="prefix" class="el-icon-search el-input__icon"/>
          </el-input>
        </el-popover>
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="menuForm.name" placeholder="名称" style="width: 460px;"/>
      </el-form-item>
      <el-form-item label="菜单排序" prop="sort">
        <el-input-number v-model.number="menuForm.sort" controls-position="right" style="width: 460px;"/>
      </el-form-item>
      <el-form-item label="内部菜单" prop="iframe">
        <el-radio v-model="menuForm.iframe" label="false">是</el-radio>
        <el-radio v-model="menuForm.iframe" label="true" >否</el-radio>
      </el-form-item>
      <el-form-item label="链接地址" prop="path">
        <el-input v-model="menuForm.path" placeholder="菜单路径" style="width: 460px;"/>
      </el-form-item>
      <el-form-item v-if="menuForm.iframe === 'false'" label="组件路径" prop="component">
        <el-input v-model="menuForm.component" placeholder="菜单路径" style="width: 460px;"/>
      </el-form-item>
      <el-form-item label="上级类目">
        <treeselect v-model="menuForm.parentId" :options="menus" style="width: 460px;" placeholder="选择上级类目" />
      </el-form-item>
      <el-form-item label="是否显示" prop="enabled">
        <el-radio v-model="menuForm.enabled" label="true">是</el-radio>
        <el-radio v-model="menuForm.enabled" label="false" >否</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="hideBox" size="small">取消</el-button>
      <el-button type="primary" @click="doSubmit" size="small">确认</el-button>
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
    const numberValidate = (rule, value, callback) => {
      value < 0 || value > 999
      ? callback(new Error('排序范围在0~999之间'))
      : callback()
    }
    return {
      menuId: "",
      dialog: false, menus: [],
      menuForm: { name: '', sort: 0, path: '', component: '', iframe: 'false', roles: [], parentId: 0, icon: '', enabled: true },
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        sort: [
          { validator: numberValidate, trigger: 'blur'}
        ],
        iframe: [
          { required: true, message: '请选择菜单类型', trigger: 'blur' }
        ],
        enabled: [
          { required: true, message: '请选择显示状态', trigger: 'blur' }
        ],
        path: [
          { required: false, message: '请输入菜单路径', trigger: 'blur' }
        ],
        component: [
          { required: false, message: '请输入菜单组件', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    // 获取菜单列表
    this.getMenus()
  },
  methods: {
    // 重置表单
    resetForm() {
      try {
        this.menuForm = { name: '', sort: 0, path: '', component: '', iframe: 'false', roles: [], parentId: 0, icon: '', enabled: 'true' }
        this.$refs.menuForm.resetFields()
      }catch(e) {}
    },
    // 更新菜单列表
    updateList() {
      this.$emit('updateMenu')
    },
    // 隐藏弹出框
    hideBox() {
      this.dialog = false
    },
    // 提交数据
    doSubmit() {
      this.$refs['menuForm'].validate((valid) => {
        if (valid) {
          if(this.menuForm.parentId == undefined) {
            this.$warnMsg("请选择上级类目")
            return
          }
          this.isAdd
          ? this.addMenu()
          : this.editMenu()
        } else {
          return false
        }
      })
    },
    // 添加菜单
    addMenu() {
      delete this.menuForm.id
      this.$http_json({
        url: "/api/menu/add",
        method: "post",
        data: this.menuForm
      }).then(result => {
        this.$successMsg('添加成功')
        this.hideBox()
        this.getMenus()
        this.updateList()
      })
    },
    // 编辑菜单
    editMenu() {
      this.menuForm.id = this.menuId
      this.$http_json({
        url: "/api/menu/edit",
        method: "post",
        data: this.menuForm
      }).then(result => {
        this.$successMsg('编辑成功')
        this.hideBox()
        this.getMenus()
        this.updateList()
      })
    },
    // 选择icon
    selected(name) {
      this.menuForm.icon = name
    },
    initialMenus(list) {
      const menu = { id: 0, label: '顶级类目', children: [] }
      this.menus.splice(0)
      menu.children = list
      this.menus.push(menu)
    },
    // 获取菜单列表
    getMenus() {
      this.$http_json({
        url: "/api/menu/tree",
        method: "get"
      }).then(result => {
        this.initialMenus(result.data)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
