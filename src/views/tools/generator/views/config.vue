<template>
	<div class="app-container">
		<el-row :gutter="15">
			<el-col style="margin-bottom: 10px">
				<el-card class="box-card" shadow="never">
					<div class="button-box">
						<el-button type="primary" class="margin-box" @click="toGen" title="保存&生成" size="small">保存&生成</el-button>
						<el-button type="success" class="margin-box" @click="save" title="保存" size="small">保存</el-button>
						<el-button type="warning" icon="el-icon-refresh" class="margin-box" @click="sync" title="同步" size="small">同步</el-button>
					</div>
					<el-form size="small" label-width="90px">
						<el-table :data="columnList" :max-height="tableHeight" size="small" style="width: 100%;margin-bottom: 15px">
							<el-table-column prop="columnName" label="字段名称" />
							<el-table-column prop="columnType" label="字段类型" />
							<el-table-column prop="remark" label="字段描述">
								<template slot-scope="scope">
									<el-input v-model="columnList[scope.$index].remark" size="mini" class="edit-input" />
								</template>
							</el-table-column>
							<el-table-column align="center" label="必填" width="70px">
								<template slot-scope="scope">
									<el-checkbox v-model="columnList[scope.$index].notNull" />
								</template>
							</el-table-column>
							<el-table-column align="center" label="列表" width="70px">
								<template slot-scope="scope">
									<el-checkbox v-model="columnList[scope.$index].listShow" />
								</template>
							</el-table-column>
							<el-table-column align="center" label="表单" width="70px">
								<template slot-scope="scope">
									<el-checkbox v-model="columnList[scope.$index].formShow" />
								</template>
							</el-table-column>
							<el-table-column label="表单类型">
								<template slot-scope="scope">
									<el-select v-model="columnList[scope.$index].formType" filterable class="edit-input" clearable size="mini" placeholder="请选择">
										<el-option label="文本框" value="Input" />
										<el-option label="文本域" value="Textarea" />
										<el-option label="单选框" value="Radio" />
										<el-option label="下拉框" value="Select" />
										<el-option label="日期框" value="Date" />
									</el-select>
								</template>
							</el-table-column>
							<el-table-column label="查询方式">
								<template slot-scope="scope">
									<el-select v-model="columnList[scope.$index].queryType" filterable class="edit-input" clearable size="mini" placeholder="请选择">
										<el-option label="=" value="=" />
										<el-option label="!=" value="!=" />
										<el-option label=">=" value=">=" />
										<el-option label="<=" value="<=" />
										<el-option label="Like" value="Like" />
										<el-option label="NotNull" value="NotNull" />
										<el-option label="BetWeen" value="BetWeen" />
									</el-select>
								</template>
							</el-table-column>
							<el-table-column label="日期注解">
								<template slot-scope="scope">
									<el-select v-model="columnList[scope.$index].dateAnnotation" filterable class="edit-input" clearable size="mini" placeholder="请选择">
										<el-option label="自动创建时间" value="CreationTimestamp" />
										<el-option label="自动更新时间" value="UpdateTimestamp" />
									</el-select>
								</template>
							</el-table-column>
							<el-table-column label="关联字典">
								<template slot-scope="scope">
									<el-select v-model="columnList[scope.$index].dictName" filterable class="edit-input" clearable size="mini" placeholder="请选择">
										<el-option v-for="item in dicts" :key="item.id" :label="item.remark === '' ? item.name : item.remark" :value="item.name" />
									</el-select>
								</template>
							</el-table-column>
						</el-table>
					</el-form>
				</el-card>
			</el-col>
			<el-col>
				<el-card class="box-card" shadow="never">
					<div slot="header" class="clearfix">
						<span class="role-span">生成配置</span>
						<el-button icon="el-icon-check" size="mini" style="float: right; padding: 6px 9px" type="primary" @click="saveForm">保存</el-button>
					</div>
					<el-form ref="form" :model="form" :rules="rules" size="small" label-width="78px">
						<el-form-item label="作者名称" prop="author">
							<el-input v-model="form.author" style="width: 40%" />
							<span style="color: #C0C0C0;margin-left: 10px;">类上面的作者名称</span>
						</el-form-item>
						<el-form-item label="模块名称" prop="moduleName">
							<el-input v-model="form.moduleName" style="width: 40%" />
							<span style="color: #C0C0C0;margin-left: 10px;">模块的名称，请选择项目中已存在的模块</span>
						</el-form-item>
						<el-form-item label="至于包下" prop="pack">
							<el-input v-model="form.pack" style="width: 40%" />
							<span style="color: #C0C0C0;margin-left: 10px;">项目包的名称，生成的代码放到哪个包里面</span>
						</el-form-item>
						<el-form-item label="接口名称" prop="apiAlias">
							<el-input v-model="form.apiAlias" style="width: 40%" />
							<span style="color: #C0C0C0;margin-left: 10px;">接口的名称，用于控制器与接口文档中</span>
						</el-form-item>
						<el-form-item label="前端路径" prop="path">
							<el-input v-model="form.path" style="width: 40%" />
							<span style="color: #C0C0C0;margin-left: 10px;">输入views文件夹下的目录，不存在即创建</span>
						</el-form-item>
						<el-form-item label="实体注备" prop="tableComment">
							<el-input v-model="form.tableComment" placeholder="请输入注备" style="width: 40%" />
							<span style="color: #C0C0C0;margin-left: 10px;">用于提示</span>
						</el-form-item>
						<el-form-item label="去表前缀" prop="prefix">
							<el-input v-model="form.prefix" placeholder="默认不去除表前缀" style="width: 40%" />
							<span style="color: #C0C0C0;margin-left: 10px;">默认不去除表前缀，可自定义</span>
						</el-form-item>
						<el-form-item label="是否覆盖" prop="cover">
							<el-radio-group v-model="form.cover" size="mini" style="width: 40%">
								<el-radio-button label="true">是</el-radio-button>
								<el-radio-button label="false">否</el-radio-button>
							</el-radio-group>
							<span style="color: #C0C0C0;margin-left: 10px;">谨防误操作，请慎重选择</span>
						</el-form-item>
						<div class="template-list-box">
							<div class="list">
								<div class="title">后端模板</div>
								<el-checkbox v-for="items in templateList" :key="items.name" v-if="items.type === 0" v-model="items.enabled">{{ items.name }}</el-checkbox>
							</div>
							<div class="list">
								<div class="title">前端模板</div>
								<el-checkbox v-for="items in templateList" :key="items.name" v-if="items.type === 1" v-model="items.enabled">{{ items.name }}</el-checkbox>
							</div>
						</div>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name: 'GeneratorConfig',
	data() {
		return {
			activeName: 'first',
			tableName: '',
			tableHeight: 550,
			columnLoading: false,
			configLoading: false,
			dicts: [],
			syncLoading: false,
			genLoading: false,
			form: {
				id: null,
				tableName: '',
				author: '',
				pack: '',
				tableComment: '',
				path: '',
				moduleName: '',
				cover: 'false',
				apiPath: '',
				prefix: '',
				apiAlias: null,
				tableName: this.$route.query.tableName
			},
			columnList: [],
			templateList: [],
			rules: {
				author: [{ required: true, message: '作者不能为空', trigger: 'blur' }],
				pack: [{ required: true, message: '包路径不能为空', trigger: 'blur' }],
				moduleName: [{ required: true, message: '包路径不能为空', trigger: 'blur' }],
				path: [{ required: true, message: '前端路径不能为空', trigger: 'blur' }],
				apiAlias: [{ required: true, message: '接口名称不能为空', trigger: 'blur' }],
				cover: [{ required: true, message: '不能为空', trigger: 'blur' }],
				tableComment: [{ required: true, message: '不能为空', trigger: 'blur' }]
			}
		};
	},
	created() {
		this.getColumnData();
		this.getFormMsg();
	},
	methods: {
		// 初始化查询字段
		initialColumnData(list) {
			this.columnList.splice(0);
			list.forEach(val => {
				this.columnList.push(val);
			});
		},
		// 查询字段数据
		getColumnData() {
			this.$http_json({
				url: `/api/generator/columns/${this.$route.query.tableName}`,
				method: 'get'
			}).then(result => {
				this.initialColumnData(result.data);
			});
		},
		initialFormMsg(data) {
			for (let key in data) {
				this.form[key] = data[key];
			}
		},
		// 获取表单数据
		getFormMsg() {
			this.$http_json({
				url: `/api/genConfig/get/${this.$route.query.tableName}`,
				method: 'get'
			}).then(result => {
				if(!result.data.genTemplates) {
					this.getTemplateList()
				}else {
					this.initialTemplateList(result.data.genTemplates)
				}
				this.initialFormMsg(result.data);
			});
		},
		initialTemplateList(list) {
			list.forEach(val => {
				this.templateList.push(val);
			});
		},
		toGen() {
			this.$http_json({
				url: '/api/generator/columns/edit',
				method: 'post',
				data: this.columnList
			})
				.then(result => {
					return this.$http_json({
						url: `/api/generator/handle/${this.$route.query.tableName}/0`,
						method: 'post'
					});
				})
				.then(result => {
					this.$successMsg('生成成功');
				});
		},
		sync() {
			this.$http_json({
				url: `/api/generator/sync`,
				method: 'post',
				data: [this.$route.query.tableName]
			}).then(result => {
				this.getColumnData();
			});
		},
		save() {
			this.$http_json({
				url: '/api/generator/columns/edit',
				method: 'post',
				data: this.columnList
			}).then(result => {
				this.$successMsg('保存成功');
			});
		},
		getTemplateList() {
			this.$http_json({
				url: '/api/genTemplate/list',
				method: 'get'
			}).then(result => {
				this.initialTemplateList(result.data)
			});
		},
		saveForm() {
			this.$refs['form'].validate(valid => {
				if (valid) {
					this.form.genTemplates = this.templateList
					this.$http_json({
						url: '/api/genConfig/edit',
						method: 'post',
						data: this.form
					}).then(result => {
						this.$successMsg('保存成功');
					});
				}
			});
		}
	}
};
</script>

<style rel="stylesheet/scss" lang="scss">
.edit-input {
	.el-input__inner {
		border: 1px solid #e5e6e7;
	}
}
</style>

<style scoped>
/deep/ .input-with-select .el-input-group__prepend {
	background-color: #fff;
}
.template-list-box {
	padding: 0 10px;
}
.list {
	padding-bottom: 5px;
}
.list {
	font-weight: bold;
	color: #6e7075;
}
</style>
