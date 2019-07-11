<template>
    <el-dialog 
        title="添加字典详情" 
        :visible.sync="isShowDetailBox"
        width="450px"
        >
            <el-form 
            :model="detailForm"
            ref="detailForm"
            :rules="detailFormRules"
            label-position="right"
            label-width="80px">
                <el-form-item 
                label="字典标签"
                prop="tag">
                    <el-input 
                    placeholder="请输入字典标签"
                    v-model="detailForm.tag" 
                    autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item 
                label="字典值"
                prop="val">
                    <el-input 
                    placeholder="请输入字典值"
                    v-model="detailForm.val"
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
    data() {
        name: "form-edit"
        return {
            isShowDetailBox: false,
            detailForm: {
                name: "",
                val: "",
                sort: "",
            },
            detailFormRules: {
                tag: [
                    { required: true, message: '请输入字典标签', trigger: 'blur' }
                ],
                val: [
                    { required: true, message: '请输入字典值', trigger: 'blur' }
                ],
                sort: [
                    { required: true, message: '请输入序号', trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
        // 添加字典
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>