<template>
  <div class="login">
    <div class="background" ref="background">
      <div class="mask" ref="mask"></div>
    </div>
    <div class="lowin lowin-blue">
    	<div class="lowin-brand"><img src="@/assets/logo/cat.png" alt="logo" /></div>
    	<div class="lowin-wrapper">
    		<div class="lowin-box lowin-login">
    			<div class="lowin-box-inner">
    				<form>
    					<p>欢迎使用</p>
    					<div class="lowin-group">
    						<label>
    							用户名
    							<a href="#" class="login-back-link">Sign in?</a>
    						</label>
    						<input v-model="username" type="text" class="lowin-input" />
    					</div>
    					<div class="lowin-group password-group">
    						<label>
    							密码
    							<!-- <a href="#" class="forgot-link">忘记密码?</a> -->
    						</label>
    						<input v-model="password" type="password" name="password" autocomplete="current-password" class="lowin-input" />
    					</div>
    					<div class="lowin-group">
    						<label>
    							验证码
    							<a href="#" class="login-back-link">Sign in?</a>
    						</label>
    						<div class="code-box">
    							<input v-model="vcode" type="text" class="lowin-input" @keyup.enter="submit" />
    							<el-image class="code-image" :src="codeUrl" fit="fill" @click="getCode">
    							  <div slot="error" class="image-slot">
    							    <i class="el-icon-picture-outline"></i>
    							  </div>
    							</el-image>
    						</div>
    					</div>
    					<span class="lowin-btn login-btn" @click="submit">登 录</span>
<!-- 							<div class="text-foot">
								下次自动登录
								<el-checkbox v-model="ruleForm.checked" @change="autoLogin">自动登录</el-checkbox>
							</div> -->
						</form>
    			</div>
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>
import Template from "./js/template_1";
export default {
  mixins: [Template]
};
</script>

<style lang="scss" scoped src="./scss/template_1.scss"></style>
