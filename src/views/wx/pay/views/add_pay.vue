<template>
  <div class="add_application">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="left-border">添加支付配置</span>
          </div>
          <div class="button-box">
            <el-button type="primary" size="small" @click="submitForm">确认</el-button>
            <el-button type="info" size="small" @click="resetForm">重置</el-button>
            <el-button size="small" @click="$router.back()">返回</el-button>
          </div>
          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            label-width="150px"
            class="demo-ruleForm"
          >
						<el-form-item label="AppID" prop="appid">
						  <el-input v-model="form.appid"></el-input>
						</el-form-item>
            <el-form-item label="商户ID" prop="mchId">
              <el-input v-model="form.mchId"></el-input>
            </el-form-item>
						<el-form-item label="商户密钥" prop="mchKey">
						  <el-input v-model="form.mchKey" type="password"></el-input>
						</el-form-item>
						<el-form-item label="简介" prop="remark">
							<el-input
							  type="textarea"
							  :rows="4"
							  v-model="form.remark">
							</el-input>
						</el-form-item>
						<el-form-item label="微信证书" prop="mchPath">
						  <el-upload
						    class="upload-demo"
						    action="string"
						    :http-request="uploadFile"
						    :limit="1"
						    >
						    <el-button size="small" type="primary">点击上传</el-button>
						    <div slot="tip" class="el-upload__tip">请上传微信证书</div>
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
			form: {
			  appid: "",
				mchId: "",
				mchKey: "",
				mchPath: "",
				remark: ""
			},
			rules: {
				appid: [
					{ required: true, message: "AppID不能为空", trigger: "change" }
				],
				mchId: [
					{ required: true, message: "商户ID不能为空", trigger: "change" }
				],
				mchKey: [
					{ required: true, message: "商户密钥不能为空", trigger: "change" }
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
	methods: {
		uploadFile(param) {
			this.$http_file({
			  url: "/api/localStorage/upload",
			  method: "post",
			  data: {
			    file: param.file
			  },
			  timeout: 100000
			}).then(result => {
				this.form.mchPath = result.data.url
			  this.$successMsg("上传成功！");
			})
		},
		submitForm() {
		  this.$refs.form.validate(valid => {
		    if (valid) {
		      this.$http_json({
		        url: "/api/wxPayConfig/add",
		        method: "post",
		        data: this.form
		      }).then(result => {
		        this.$successMsg("添加成功");
		        this.$router.push({ path: "/home/pay" })
		      });
		    } else {
		      return false;
		    }
		  });
		},
		resetForm() {
			try {
			  this.$refs.form.resetFields();
			} catch (e) {}
		}
	}
};
</script>

