<template>
    <el-dialog 
        title="添加字典" 
        :visible.sync="isShowAddBox"
        width="450px">
            <el-form 
            :model="addForm"
            ref="addForm"
            :rules="addFormRules">
                <el-form-item 
                label="字典名称"
                prop="name">
                    <el-input 
                    placeholder="请输入字典名称"
                    v-model="addForm.name" 
                    autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item 
                label="描述"
                prop="description">
                    <el-input 
                    placeholder="请输入字典描述"
                    v-model="addForm.description" 
                    autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button 
                @click="isShowAddBox = false" 
                size="small">取 消</el-button>
                <el-button 
                type="primary" 
                @click="submitForm('addForm')"
                size="small">确 定</el-button>
            </div>
        </el-dialog>
</template>

<script>
export default {
    name: "form-add",
    data() {
        return {
            isShowAddBox: false,
            addForm: {
                name: "",
                description: ""
            },
            addFormRules: {
                name: [
                    { required: true, message: '请输入字典名称', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入字典描述', trigger: 'blur' }
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