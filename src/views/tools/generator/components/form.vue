<template>
  <div>
    <el-dialog :visible.sync="dialog" :close-on-click-modal="false" :before-close="cancel" title="代码生成配置" append-to-body width="960px">
      <el-form status-icon ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="95px">
        <el-form-item label="模块名称" prop="moduleName">
          <el-input placeholder="请输入模块名称" v-model="form.moduleName"/>
        </el-form-item>
        <el-form-item label="至于包下" prop="pack">
          <el-input placeholder="请输入包名称" v-model="form.pack"/>
        </el-form-item>
        <el-form-item label="生成路径" prop="path">
          <el-input placeholder="请输入路径" v-model="form.path"/>
        </el-form-item>
        <el-table :data="tableList" size="small" style="width: 100%;margin-bottom: 15px">
          <el-table-column label="序号" width="80" align="center">
            <template slot-scope="scope">
              <div>{{ scope.$index + 1 }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="columnName" label="字段名称"/>
          <el-table-column prop="columnType" label="字段类型"/>
          <el-table-column prop="columnComment" label="字段标题">
            <template slot-scope="scope">
              <el-input v-model="tableList[scope.$index].columnComment" class="edit-input"/>
            </template>
          </el-table-column>
          <el-table-column label="查询方式">
            <template slot-scope="scope">
              <el-select v-model="tableList[scope.$index].columnQuery" class="edit-input" clearable placeholder="请选择">
                <el-option
                  label="模糊查询"
                  value="1"/>
                <el-option
                  label="精确查询"
                  value="2"/>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="columnShow" label="列表显示">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.columnShow === 'true' ?'显示':'不显示'" placement="top">
                <el-switch
                  v-model="tableList[scope.$index].columnShow"
                  active-color="#13ce66"
                  active-value="true"
                  inactive-value="false"/>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item label="作者名称" prop="author">
          <el-input placeholder="请填写作者名称" v-model="form.author"/>
        </el-form-item>
        <el-form-item label="实体注备名" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入注备名"/>
        </el-form-item>
        <el-form-item label="去表前缀" prop="prefix">
          <el-input v-model="form.prefix" placeholder="默认不去除表前缀"/>
        </el-form-item>
        <!--    可自定义显示配置    -->
        <!--        <el-form-item label="Api路径">-->
        <!--          <el-input v-model="form.apiPath"/>-->
        <!--        </el-form-item>-->
        <el-form-item label="是否覆盖" prop="cover">
          <el-radio-group v-model="form.cover" size="mini">
            <el-radio-button label="true">是</el-radio-button>
            <el-radio-button label="false">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="padding: 0 15px;">
          <div style="padding: 5px 0">
            <div>后端模板：</div>
            <el-checkbox 
            v-for="items in templateList" 
            :key="items.name"
            v-if="items.type === 0"
            v-model="items.enabled" 
            >{{ items.name }}</el-checkbox>
          </div>
          <div style="padding: 5px 0">
            <div>前端模板：</div>
            <el-checkbox 
              v-for="items in templateList" 
              :key="items.name"
              v-if="items.type === 1"
              v-model="items.enabled" 
              >{{ items.name }}</el-checkbox>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" size="small" @click="cancel">取消</el-button>
        <el-button type="primary" size="small" @click="doSubmit">生成</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Generator',
  // props: {
  //   name: {
  //     type: String,
  //     required: true
  //   }
  // },
  data() {
    return {
      id: "",
      remark: "",
      dialog: false, columnQuery: '',
      form: {id: 1, author: '', pack: '', path: '', moduleName: '', cover: 'false', apiPath: '', prefix: '', remark: ""},
      tableComment: "文章",
      tableList: [],
      templateList: [],
      rules: {
        author: [
          { required: true, message: '作者不能为空', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '注备不能为空', trigger: 'blur' }
        ],
        pack: [
          { required: true, message: '模块路径不能为空', trigger: 'blur' }
        ],
        moduleName: [
          { required: true, message: '包路径不能为空', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '生成路径不能为空', trigger: 'blur' }
        ],
        cover: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.dialog = false
      this.genLoading = false
      this.$refs['form'].resetFields()
      this.form = {id: 1, author: '', pack: '', path: '', moduleName: '', cover: 'false', apiPath: '', prefix: '', remark: ""}
    },
    // 上传表格数据
    uploadForm() {
      this.form.genTemplates = this.templateList
      delete this.form.remark
      return this.$http_json({
        url: "/api/genConfig/edit",
        method: "post",
        data: this.form
      })
    },
    // 上传表单数据
    uploadTableList() {
      return this.$http_json({
        url: `/api/generator/create`,
        method: "post",
        data: {
          columnInfos: this.tableList,
          remark: this.remark,
          tableName: this.tableName
        }
      })
    },
    // 提交数据
    async doSubmit() {
      this.genLoading = true
      this.$refs['form'].validate(async (valid) => {
        this.remark = this.form.remark
        if (valid) {
          let result_1 = await this.uploadForm()
          let result_2 = await this.uploadTableList()
          if(result_1.status === 200 && result_2.status) {
            this.dialog = false
            this.$successMsg("代码生成成功")
            this.$parent.getGenerateCodeList()
          }
        } else {
          return false
        }
      })
    },
    // 初始化表单数据
    initialFormMsg(data) {
      this.templateList.splice(0)
      for(let key in data) {
        this.form[key] = data[key]
      }
      data.genTemplates.forEach(val => {
        this.templateList.push(val)
      })
    },
    // 初始化表格数据
    initialTableList(list) {
      this.tableList.splice(0)
      list.forEach(val => {
        this.tableList.push(val)
      }) 
    },
    // 获取表单数据
    getFormMsg() {
      this.$http_json({
        url: "/api/genConfig/list",
        method: "get"
      }).then(result => {
        this.initialFormMsg(result.data)
      })
    },
    // 获取表格数据
    getTableList(tableName) {
      this.tableName = tableName
      this.$http_json({
        url: `/api/generator/columns?tableName=${this.tableName}`,
        method: "get"
      }).then(result => {
        this.initialTableList(result.data.content)
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .edit-input {
    .el-input__inner {
      border: none;
    }
  }
</style>