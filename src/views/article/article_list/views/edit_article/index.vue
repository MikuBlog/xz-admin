<template>
  <div class="article-list">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="left-border">添加资讯</span>
            <div class="select-box">
              <el-checkbox v-model="articleForm.isTop">是否置顶</el-checkbox>
              <el-checkbox v-model="articleForm.isShow">是否显示</el-checkbox>
            </div>
          </div>
          <div class="button-box">
            <el-button type="primary" size="small" @click="submitForm">确认</el-button>
            <el-button type="info" size="small" @click="resetForm">重置</el-button>
            <el-button size="small" @click="$router.back()">返回</el-button>
          </div>
          <el-form
            :model="articleForm"
            :rules="rules"
            ref="articleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="资讯标题" prop="title">
                  <el-input v-model="articleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="资讯分类">
                  <el-autocomplete
                    v-model="articleForm.types[0].name"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入资讯分类进行搜索并选择"
                    @select="handleSelect"
                    style="width: 100%"
										value-key="name"
                  ></el-autocomplete>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                  <el-input type="number" v-model="articleForm.sort"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" align="center">
                <el-form-item label="资讯封面">
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
              <el-col :span="24">
                <el-form-item label="标签">
                  <el-tag
										class="tags"
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >{{tag}}</el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  ></el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-divider></el-divider>
              </el-col>
              <el-col :span="22">
                <el-form-item label="资讯内容" prop="content">
                  <Tinymce v-model="articleForm.content" />
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
