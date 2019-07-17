<template>
    <el-dialog 
        :title="isAdd ? '添加字典详情' : '编辑字典详情'" 
        :visible.sync="isShowDetailBox"
        width="450px"
        >
            <el-form 
            :model="detailForm"
            ref="detailForm"
            :rules="detailFormRules"
            label-position="right"
            label-width="80px"
            size="small">
                <el-form-item 
                label="字典标签"
                prop="label">
                    <el-input 
                    placeholder="请输入字典标签"
                    v-model="detailForm.label" 
                    autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item 
                label="字典值"
                prop="value">
                    <el-input 
                    placeholder="请输入字典值"
                    v-model="detailForm.value"
                    autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item 
                label="排序"
                prop="sort">
                    <el-input-number
                    placeholder="请输入序号"
                    v-model="detailForm.sort" 
                    type="number"
                    autocomplete="off"
                    controls-position="right"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button
                @click="isShowDetailBox = false"
                size="small">取 消</el-button>
                <el-button 
                type="primary" 
                size="small"
                @click="submitForm('detailForm')">确 定</el-button>
            </div>
        </el-dialog>
</template>

<script>
export default {
    name: "form-edit",
    props: {
        isAdd: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            dictDetailId: "",
            title: "编辑字典详情",
            isShowDetailBox: false,
            detailForm: {
                label: "",
                value: "",
                sort: "",
            },
            detailFormRules: {
                label: [
                    { required: true, message: '请输入字典标签', trigger: 'blur' }
                ],
                value: [
                    { required: true, message: '请输入字典值', trigger: 'blur' }
                ],
                sort: [
                    { required: true, message: '请输入序号', trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
        // 更新父组件数据
        updateList() {
            this.$emit('updateDetailList')
        },
        // 隐藏弹出框
        hideDetailBox() {
            this.isShowDetailBox = false
        },
        // 添加字典详情
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(!this.detailForm.dict) {
                        this.$warnMsg('请选择字典再进行操作')
                        return false
                    }
                    this.isAdd
                    ? this.$http_json({
                        url: "/api/dictDetail/add",
                        method: "post",
                        data: this.detailForm
                    }).then(result => {
                        result.status === 200
                        && (this.$successMsg('添加成功'),
                        this.hideDetailBox(),
                        this.updateList())
                    })
                    : (this.detailForm.dictDetailId = this.dictDetailId, 
                    this.$http_json({
                        url: "/api/dictDetail/edit",
                        method: "post",
                        data: this.detailForm
                    }).then(result => {
                        result.status === 200
                        && (this.$successMsg('编辑成功'),
                        this.hideDetailBox(),
                        this.updateList())
                    }))
                } else {
                    return false;
                }
            });
        },
    }
}
</script>