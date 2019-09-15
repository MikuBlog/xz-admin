<template>
    <div class="add-article">
        <el-card class="box-card">
            <el-row class="button-box">
                <el-col :span="24">
                    <el-button 
                    type="primary" 
                    size="small"
                    @click="submitForm('ruleForm')">
                        确认
                    </el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form 
                    :model="ruleForm" 
                    :rules="rules"
                     ref="ruleForm" 
                     label-width="100px" 
                     label-position="top"
                     class="demo-ruleForm">
                        <el-form-item label="文章标题" prop="title">
                            <el-input v-model="ruleForm.title" placeholder="请输入文章标题"></el-input>
                        </el-form-item>
                        <el-form-item label="文章作者" prop="author">
                            <el-input v-model="ruleForm.author" placeholder="请输入文章作者"></el-input>
                        </el-form-item>
                        <el-form-item label="文章分类" prop="type">
                            <el-select v-model="ruleForm.type" placeholder="请选择文章分类">
                            <el-option label="分类1" value="分类1"></el-option>
                            <el-option label="分类2" value="分类2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="创建日期" required>
                            <el-col :span="11">
                            <el-form-item prop="date">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                            <el-form-item prop="time">
                                <el-time-picker placeholder="选择时间" v-model="ruleForm.time" style="width: 100%;"></el-time-picker>
                            </el-form-item>
                            </el-col>
                        </el-form-item>
                        <!-- <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item> -->
                    </el-form>
                </el-col>
                <el-col :span="12" style="padding-left: 5rem">
                    <div class="title">
                        文章大图
                    </div>
                    <el-upload
                        class="avatar-uploader"
                        action="http://upload.xuanzai.top:8080/gbk-php/php/controller.php?action=uploadimage&encode=utf-8"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>
            </el-row>    
            <el-divider></el-divider>
            <el-row>
                <el-col :span="24">
                    <div class="editor">
                        <editor @getValue="getValue"></editor>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imageUrl: '',
            msg: "",
            ruleForm: {
                title: "",
                author: "",
                type: "",
                date: "",
                time: ""
            },
            rules: {
                title: [
                    { required: true, message: '请输入文章标题', trigger: 'blur' }
                ],
                author: [
                    { required: true, message: '请输入文章作者', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择文章分类', trigger: 'change' }
                ],
                date: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                time: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
            }
        };
    },
    methods: {
        // 获取富文本内容
        getValue(val) {
            this.msg = ""
        },
        goto() {
            this.$router.push({path: "/home/welcome"})
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style lang="scss" scoped>
    .el-icon-plus {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .el-icon-plus:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .el-col-11 {
        padding-left: 0!important;
    }
    .editor {
        position: relative;
        margin: 1rem 0;
        width: 100%;
    }
</style>
