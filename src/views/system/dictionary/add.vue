<template>
    <el-dialog 
        :title="title" 
        :visible.sync="isShowAddBox"
        width="450px">
            <el-form 
            :model="addForm"
            ref="addForm"
            :rules="addFormRules"
            label-position="right"
            label-width="80px"
            size="small">
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
                prop="remark">
                    <el-input 
                    placeholder="请输入字典描述"
                    v-model="addForm.remark" 
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
    props: {
        isAdd: {
            type: Boolean,
            default: true
        }
    },
    created() {
        this.isAdd
        && (this.title = "添加字典")
    },
    data() {
        return {
            title: "编辑字典",
            isShowAddBox: false,
            addForm: {
                name: "",
                remark: ""
            },
            addFormRules: {
                name: [
                    { required: true, message: '请输入字典名称', trigger: 'blur' }
                ],
                remark: [
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
                    this.isAdd
                    && this.$http_json({
                        url: "/api/dict/add",
                        method: "post",
                        data: this.addForm
                    }).then(result => {
                        result.status === 200
                        && (this.$successMsg('添加成功'),
                        this.isShowAddBox = false,
                        this.$emit('updateList'))
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>