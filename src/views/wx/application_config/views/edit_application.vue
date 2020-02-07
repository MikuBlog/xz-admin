<template>
  <div class="add_application">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="left-border">编辑应用</span>
          </div>
          <div class="button-box">
            <el-button type="primary" size="small" @click="submitForm">确认</el-button>
            <el-button type="info" size="small" @click="resetForm">重置</el-button>
            <el-button size="small" @click="$router.back()">返回</el-button>
          </div>
          <el-form
            :model="applicationForm"
            :rules="rules"
            ref="applicationForm"
            label-width="150px"
            class="demo-ruleForm"
          >
						<el-form-item label="类型" prop="type">
						  <el-radio-group v-model="applicationForm.type">
						    <el-radio :label="0">公众号</el-radio>
						    <el-radio :label="1">小程序</el-radio>
						  </el-radio-group>
						</el-form-item>
						<el-form-item label="AppID" prop="appid">
						  <el-input v-model="applicationForm.appid"></el-input>
						</el-form-item>
            <el-form-item label="AppSecret" prop="secret">
              <el-input v-model="applicationForm.secret"></el-input>
            </el-form-item>
						<el-form-item label="微信验证TOKEN" prop="token">
						  <el-input v-model="applicationForm.token"></el-input>
						</el-form-item>
						<el-form-item label="EncodingAESKey" prop="aesKey">
						  <el-input v-model="applicationForm.aesKey"></el-input>
						</el-form-item>
						<el-form-item label="简介" prop="remark">
							<el-input
							  type="textarea"
							  :rows="4"
							  v-model="applicationForm.remark">
							</el-input>
						</el-form-item>
						<el-form-item label="应用二维码/LOGO">
						  <el-upload
						    class="avatar-uploader"
						    :http-request="uploadImage"
						    :show-file-list="false"
						    action="string"
						  >
						    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
						    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						  </el-upload>
						</el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <operation-box :options="buttonOptions" @submitForm="submitForm" @resetForm="resetForm" />
  </div>
</template>

<script>
import convertHttp from '@/utils/convertHttp'
export default {
  data() {
		return {
			imageUrl: "",
			applicationForm: {
				id: this.$route.query.id,
				type: 0,
			  aesKey: "",
			  appid: "",
				logo: "",
				secret: "",
				token: "",
				remark: ""
			},
			rules: {
				type: [
					{ required: true, message: "请选择分类", trigger: "change" }
				],
				appid: [
					{ required: true, message: "AppID不能为空", trigger: "change" }
				],
				secret: [
					{ required: true, message: "AppSecret不能为空", trigger: "change" }
				]
			},
			buttonOptions: [{
			  type: "primary",
			  title: "确认",
			  name: "确认",
			  method: "submitForm"
			}, {
			  type: "info",
			  title: "重置",
			  name: "重置",
			  method: "resetForm"
			}]
		}
	},
	created() {
		this.getApplicationDetail()
	},
	methods: {
		uploadImage(param) {
		  this.$http_file({
		    url: "/api/localStorage/upload",
		    method: "post",
		    data: {
		      file: param.file
		    },
		    timeout: 100000
		  }).then(result => {
		    this.imageUrl = convertHttp(result.data.url)
				this.applicationForm.logo = result.data.url
		    this.$successMsg("上传成功！");
		  });
		},
		initial(data) {
			Object
				.keys(data)
				.forEach(val => {
					if(val !== 'createTime' || val !== 'editTime') {
						this.applicationForm[val] = data[val]
					}
				})
			this.imageUrl = convertHttp(data.logo)
		},
		getApplicationDetail() {
			this.$http_json({
				url: `/api/wxConfig/get/${this.$route.query.id}`,
				method: "get"
			}).then(result => {
				this.initial(result.data)
			})
		},
		submitForm() {
		  this.$refs.applicationForm.validate(valid => {
		    if (valid) {
		      this.$http_json({
		        url: "/api/wxConfig/add",
		        method: "post",
		        data: this.applicationForm
		      }).then(result => {
		        this.$successMsg("编辑成功");
		        this.$router.push({ path: "/home/application_config" })
		      });
		    } else {
		      return false;
		    }
		  });
		},
		resetForm() {
			try {
				this.applicationForm.logo = ""
				this.imageUrl = ""
			  this.$refs.applicationForm.resetFields();
			} catch (e) {}
		}
	}
};
</script>

<style scoped>
	.avatar-uploader /deep/ .el-upload {
	  border: 1px dashed #d9d9d9;
	  border-radius: 6px;
	  cursor: pointer;
	  position: relative;
	  overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	  border-color: #409eff;
	}
	.avatar-uploader-icon {
	  font-size: 28px;
	  color: #8c939d;
	  width: 138px;
	  height: 138px;
	  line-height: 138px;
	  text-align: center;
	}
	.avatar {
	  width: 138px;
	  height: 138px;
	  display: block;
	}
</style>
