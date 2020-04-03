<template>
<!--表单组件-->
      <el-dialog :visible.sync="dailog" :before-close="hideBox" title="新增${tableComment}" width="500px">
        <el-form ref="form" :model="form" <#if isNotNullColumns??>:rules="rules"</#if> size="small" label-width="100px">
			<#if columns??>
				<#list columns as column>
					<#if column.formShow>
						<el-form-item label="<#if column.remark != ''>${column.remark}<#else>${column.changeColumnName}</#if>"<#if column.istNotNull> prop="${column.changeColumnName}"</#if>>
							<#if column.formType = 'Input'>
							<el-input v-model="form.${column.changeColumnName}" style="width: 370px;" />
							<#elseif column.formType = 'Textarea'>
							<el-input :rows="3" v-model="form.${column.changeColumnName}" type="textarea" style="width: 370px;" />
							<#elseif column.formType = 'Radio'>
								<#if column.dictName??>
							<el-radio v-for="item in dict.${column.dictName}" :key="item.id" v-model="form.${column.changeColumnName}" :label="item.value">{{ item.label }}</el-radio>
								<#else>
									未设置字典，请手动设置 Radio
								</#if>
							<#elseif column.formType = 'Select'>
								<#if column.dictName??>
							<el-select v-model="form.${column.changeColumnName}" filterable placeholder="请选择">
								<el-option
									v-for="item in dict.${column.dictName}"
									:key="item.id"
									:label="item.label"
									:value="item.value" />
							</el-select>
								<#else>
							未设置字典，请手动设置 Select
								</#if>
							<#else>
							<el-date-picker v-model="form.${column.changeColumnName}" type="datetime" style="width: 370px;" />
							</#if>
						</el-form-item>
					</#if>
				</#list>
			</#if>
      </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="hideBox">取消</el-button>
          <el-button type="primary" @click="doSubmit">确认</el-button>
        </div>
      </el-dialog>
</template>
<script>
export default {
	data() {
	  return {
			isAdd: false,
			dailog: false,
			form: {
				<#if isNotNullColumns??>
				<#list isNotNullColumns as column>
				<#if column.istNotNull>
				${column.changeColumnName}: ""<#if column_has_next>,</#if>
				</#if>
				</#list>
				</#if>
			}
	    rules: {
	      <#if isNotNullColumns??>
	      <#list isNotNullColumns as column>	
	      <#if column.istNotNull>
	      ${column.changeColumnName}: [
	        { required: true, message: '<#if column.remark != ''>${column.remark}</#if>不能为空', trigger: 'blur' }
	      ]<#if column_has_next>,</#if>
	      </#if>
	      </#list>
	      </#if>
	    }
	  }
	},
	methods: {
		hideBox() {
			this.dialog = false
			this.resetForm()
		},
		doSubmit() {
			this.isAdd
			? this.add()
			: this.edit()
		},
		add() {
			delete this.form.id
			this.$refs.form.validate(valid => {
			  if (valid) {
			    this.$http_json({
			      url: "",
			      method: "post",
			      data: this.form
			    }).then(result => {
			      this.$successMsg("添加成功");
			    });
			  } else {
			    return false;
			  }
			});
		},
		edit() {
			this.$refs.form.validate(valid => {
			  if (valid) {
			    this.$http_json({
			      url: "",
			      method: "post",
			      data: this.form
			    }).then(result => {
			      this.$successMsg("编辑成功");
			    });
			  } else {
			    return false;
			  }
			});
		},
		resetForm() {
			try {
				this.form = {
					<#if isNotNullColumns??>
					<#list isNotNullColumns as column>
					<#if column.istNotNull>
					${column.changeColumnName}: ""<#if column_has_next>,</#if>
					</#if>
					</#list>
					</#if>
				}
				this.$refs.form.resetFields();
			}catch(e) {}
		}
	}
}
</script>
<style lang="scss" scoped></style>