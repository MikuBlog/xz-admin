import { edit } from '@/api/user';
<template>
    <el-dialog 
        :title="isAdd ? '添加字典' : '编辑字典'" 
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
    data() {
        return {
            id: "",
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
        // 更新父组件数据
        updateList() {
            this.$emit('updateDictionaryList')
        },
        // 隐藏弹出框
        hideBox() {
            this.isShowAddBox = false
        },
        // 添加字典
        addDictionary() {
            delete this.addForm.id
            this.$http_json({
                url: "/api/dict/add",
                method: "post",
                data: this.addForm
            }).then(result => {
                result.status === 200
                && (this.$successMsg('添加成功'),
                this.hideBox(),
                this.updateList())
            })
        },
        // 编辑字典
        editDictionary() {
            this.addForm.id = this.id
            this.$http_json({
                url: "/api/dict/edit",
                method: "post",
                data: this.addForm
            }).then(result => {
                result.status === 200
                && (this.$successMsg('编辑成功'),
                this.hideBox(),
                this.updateList())
            })
        },
        // 提交数据
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.isAdd
                    ? this.addDictionary()
                    : this.editDictionary()
                } else {
                    return false;
                }
            });
        },
    }
}
</script>