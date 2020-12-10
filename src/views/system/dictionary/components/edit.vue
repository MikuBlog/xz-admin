<template>
	<el-dialog :title="isAdd ? '添加字典详情' : '编辑字典详情'" :visible.sync="isShowDetailBox" append-to-body v-dialogDrag width="450px" :close-on-click-modal="false">
		<el-form status-icon :model="detailForm" ref="detailForm" :rules="detailFormRules" label-position="right" label-width="80px" size="small">
			<el-form-item label="字典标签" prop="label"><el-input placeholder="请输入字典标签" v-model="detailForm.label" autocomplete="off"></el-input></el-form-item>
			<el-form-item label="字典值" prop="value"><el-input placeholder="请输入字典值" v-model="detailForm.value" autocomplete="off"></el-input></el-form-item>
			<el-form-item label="排序" prop="sort">
				<el-input-number placeholder="请输入序号" v-model="detailForm.sort" type="number" autocomplete="off" controls-position="right"></el-input-number>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="isShowDetailBox = false">取 消</el-button>
			<el-button type="primary" @click="submitForm('detailForm')" :loading="isLoading">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
export default {
	name: 'form-edit',
	props: {
		isAdd: {
			type: Boolean,
			default: true
		}
	},
	data() {
		const numberValidate = (rule, value, callback) => {
			value < 0 || value > 999 ? callback(new Error('排序范围在0~999之间')) : callback();
		};
		return {
			id: '',
			title: '编辑字典详情',
			isShowDetailBox: false,
			isLoading: false,
			detailForm: {
				label: '',
				value: '',
				sort: ''
			},
			detailFormRules: {
				label: [{ required: true, message: '请输入字典标签', trigger: 'blur' }],
				value: [{ required: true, message: '请输入字典值', trigger: 'blur' }],
				sort: [{ validator: numberValidate, trigger: 'blur' }]
			}
		};
	},
	created() {
		document.addEventListener('keypress', this.submitEnter);
	},
	beforeDestroy() {
		document.removeEventListener('keypress', this.submitEnter);
	},
	methods: {
		submitEnter(e) {
			e.keyCode === 13 && this.isShowDetailBox === true && this.submitForm();
		},
		// 隐藏弹出框
		hideDetailBox() {
			this.isShowDetailBox = false;
		},
		// 添加字典详情
		addDictDetail() {
			delete this.detailForm.id;
			this.isLoading = true
			this.$http_json({
				url: '/api/dictDetail/add',
				method: 'post',
				data: this.detailForm
			}).then(result => {
				this.isLoading = false
				result.status === 200 && (this.$successMsg('添加成功'), this.hideDetailBox(), this.$parent.getDetailList());
			}).catch(e => {
        this.isLoading = false
      });
		},
		editDictDetail() {
			this.detailForm.id = this.id;
			this.isLoading = true
			this.$http_json({
				url: '/api/dictDetail/edit',
				method: 'post',
				data: this.detailForm
			}).then(result => {
				this.isLoading = false
				result.status === 200 && (this.$successMsg('编辑成功'), this.hideDetailBox(), this.$parent.getDetailList());
			}).catch(e => {
        this.isLoading = false
      });
		},
		// 提交数据
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.isAdd ? this.addDictDetail() : this.editDictDetail();
				} else {
					return false;
				}
			});
		}
	}
};
</script>
