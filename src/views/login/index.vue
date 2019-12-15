<template>
  <div class="login">
    <div class="background" ref="background">
      <div class="mask" ref="mask"></div>
    </div>
    <div class="setting" @click="showSetting" v-show="defaultConfig.loginSetting">
      <i class="el-icon-setting"></i>
    </div>
    <div class="login-box" ref="loginBox">
      <div class="header" ref="header">{{ defaultConfig.loginHeader }}</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="medium">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="vcode">
          <div class="flex-box">
            <el-input
              v-model="ruleForm.vcode"
              @keyup.native="pressEnter"
              prefix-icon="fa fa-shield"
            ></el-input>
            <el-image class="code-box" :src="codeUrl" fit="fill" @click="getCode">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%;">登录</el-button>
        </el-form-item>
        <el-form-item v-show="defaultConfig.isAutoLogin">
          <el-checkbox v-model="ruleForm.checked" @change="autoLogin">自动登录</el-checkbox>
        </el-form-item>
      </el-form>
      <div v-show="defaultConfig.otherLoginMethods">
        <el-divider></el-divider>
        <div class="tip">使用合作网站账号登陆：</div>
        <div class="button-box">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconQQ" />
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconweibo" />
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconweixin" />
          </svg>
        </div>
      </div>
    </div>
    <Drawer
      title="界面设置"
      v-model="isShowDrawer"
      width="350px"
      @on-close="closeDrawer"
      style="overflow-x: hidden"
    >
      <el-tabs v-model="activeName" type="card" @tab-click="getTag">
        <el-tab-pane label="背景图" name="0"></el-tab-pane>
        <el-tab-pane label="登录框" name="1"></el-tab-pane>
      </el-tabs>
      <div class="background-setting" v-show="tab[0]">
        <div class="block" style="text-align: right; margin: .5rem 0;">
          <span class="label">背景是否重复：</span>
          <el-switch v-model="repeat"></el-switch>
        </div>
        <el-image class="login-background" style="width: 100%; height: 159px" :src="backgroundUrl" :fit="size" ref="image"></el-image>
        <div class="radio-box">
          <el-radio v-model="size" label="cover">覆盖</el-radio>
          <el-radio v-model="size" label="contain">适应</el-radio>
          <el-radio v-model="size" label="fill">填充</el-radio>
        </div>
        <div class="block" style="margin-top: 2rem">
          <span class="demonstration">透明度：</span>
          <el-slider v-model="opacity" :format-tooltip="formatTooltip" @change="getVal"></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">模糊度：</span>
          <el-slider v-model="blur" :format-tooltip="formatTooltip" @change="getVal"></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">遮罩浓度：</span>
          <el-slider v-model="mask" :format-tooltip="formatTooltip" @change="getVal"></el-slider>
        </div>
        <div class="button" style="margin-top: 2rem">
          <el-button type="primary" style="width: 100%" @click="selectPic">选择图片</el-button>
        </div>
        <div class="button">
          <el-button type="success" style="width: 100%" @click="useBg">应用背景</el-button>
        </div>
      </div>
      <div class="login-box-setting" v-show="tab[1]">
        <div class="block" style="text-align:right">
          <span class="label">登录框颜色:</span>
          <el-color-picker v-model="boxColor" @change="getBoxVal" show-alpha></el-color-picker>
        </div>
        <div class="block" style="text-align:right">
          <span class="label">字体颜色:</span>
          <el-color-picker v-model="fontColor" @change="getBoxVal"></el-color-picker>
        </div>
        <div class="block" style="text-align:right; margin: .5rem 0 1rem 0">
          <span class="label">标题是否斜体:</span>
          <el-switch v-model="isItalic" @change="getBoxVal"></el-switch>
        </div>
        <div class="block">
          <span class="demonstration">高度：</span>
          <el-slider v-model="height" @change="getBoxVal"></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">宽度：</span>
          <el-slider v-model="width" @change="getBoxVal"></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">标题大小：</span>
          <el-slider v-model="fontSize" @change="getBoxVal"></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">图标大小：</span>
          <el-slider v-model="iconSize" @change="getBoxVal"></el-slider>
        </div>
        <div class="button" style="margin-top: 2rem">
          <el-button type="success" style="width: 100%" @click="saveBoxStyle">保存样式</el-button>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script>
import Initial from "./mixins/initial";
import Operation from "./mixins/operation";
import Property from "./mixins/property";
export default {
  mixins: [Initial, Operation, Property]
};
</script>

<style lang="scss" scoped src="./style/index.scss"></style>
