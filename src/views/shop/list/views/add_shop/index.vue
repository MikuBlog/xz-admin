<template>
  <div class="article-list">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="left-border">添加门店</span>
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
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="门店名称" prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="店长姓名" prop="fullName">
                  <el-input v-model="form.fullName"></el-input>
                </el-form-item>
                <el-form-item label="门店电话" prop="phone">
                  <el-input v-model="form.phone" />
                </el-form-item>
                <el-form-item label="门店简介" prop="info">
                  <el-input
                    type="textarea"
                    v-model="form.info"
                    :rows="5"
                    maxlength="200"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12" align="center">
                <el-form-item label="门店Logo" prop="image">
                  <el-upload
                    class="avatar-uploader"
                    :http-request="uploadImage"
                    :show-file-list="false"
                    action="string"
                  >
                    <img v-if="coverImage" :src="coverImage" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="24"></el-col>
              <el-col :span="12">
                <el-form-item label="门店地址" prop="province">
                  <el-cascader
                  ref="addressBox"
                  v-model="address"
                  :options="addressList"
                  style="width: 100%"
                  @change="handleChange"></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item style="display: inline-block" label="详细地址" prop="detailAddress">
                  <el-input v-model="form.detailAddress"></el-input>
                </el-form-item>
                <el-button type="primary" style="margin-left: .5rem" @click="getLonLan">获取经纬度</el-button>
              </el-col>
              <el-col :span="12">
                <el-form-item label="经度" prop="longitude">
                  <el-input v-model="form.longitude"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="纬度" prop="latitude">
                  <el-input v-model="form.latitude"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-divider></el-divider>
              </el-col>
              <el-col :span="22">
                <el-form-item label="门店详情" prop="description">
                  <Tinymce :height="800" v-model="form.description" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <operation-box :options="buttonOptions" @submitForm="submitForm" @resetForm="resetForm" />
  </div>
</template>

<script>
import Operation from "./js/operation";
import Property from "./js/property";
export default {
  mixins: [Operation, Property]
};
</script>

<style lang="scss" scoped src="./scss/index.scss">
</style>
