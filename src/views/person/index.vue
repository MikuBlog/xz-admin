<template>
	<div class="person">
		<el-row :gutter="20">
			<el-col :sm="24" :md="6">
				<el-card class="box-card">
					<div slot="header" class="header"><span>关于我</span></div>
					<div class="avatar-box">
						<div class="avatar">
							<el-button icon="el-icon-upload" class="upload-button" circle @click="$refs.avatarForm.dialogVisible = true"></el-button>
							<el-avatar :size="120" :src="user.avatar" fit="cover"><img src="https://myinterface.xuanzai.top/getPicture?type=error" /></el-avatar>
							<div class="hover-plus" @click="isShow = true"><svg-icon icon-class="add" class="add-avatar" /></div>
						</div>
						<div class="avatar-detail">
							<div class="role">{{ user.username }}</div>
							<div class="name">{{ user.email }}</div>
						</div>
					</div>
					<div class="title">
						<i class="el-icon-reading"></i>
						<span class="word">个人信息</span>
						<div class="border"></div>
					</div>
					<div style="margin: .5rem 0; font-size: .8rem;">
						<i class="el-icon-s-custom"></i>
						昵称：{{ user.nickname || '无' }}
					</div>
					<div style="margin: .5rem 0; font-size: .8rem;">
						<i class='el-icon-male' />
						性别：{{ user.sex === 0 ? '保密' : user.sex === 1 ? '男' : '女' }}
					</div>
					<div style="margin: .5rem 0; font-size: .8rem;">
						<i class="el-icon-office-building" />
						部门：{{ user.dept }}
					</div>
					<div style="margin: .5rem 0; font-size: .8rem;">
						<i class="el-icon-s-check"></i>
						岗位：{{ user.job }}
					</div>
					<div style="margin: .5rem 0; font-size: .8rem;">
						<i class="el-icon-phone"></i>
						电话：{{ user.phone }}
					</div>
				</el-card>
			</el-col>
			<el-col :sm="24" :md="18">
				<el-card class="box-card card-gutter-sm">
					<div slot="header" class="clearfix"><span class="header">基本资料</span></div>
					<el-tabs>
						<el-tab-pane label="基本资料">
							<Basic @updateUserInfo="updateUserInfo" />
						</el-tab-pane>
						<el-tab-pane label="修改邮箱">
							<editEmail @updateUserInfo="updateUserInfo" />
						</el-tab-pane>
						<el-tab-pane label="修改密码">
							<editPassword />
						</el-tab-pane>
						<el-tab-pane label="操作日志">
							<Table />
						</el-tab-pane>
					</el-tabs>
				</el-card>
			</el-col>
		</el-row>
		<upload-avatar :is-show.sync="isShow" :upload-avatar="uploadAvatar" />
	</div>
</template>

<script>
import Operation from './js/operation';
import Property from './js/property';
import Basic from './components/basic'
import editPassword from './components/edit_password';
import editEmail from './components/edit_email';
import Table from './components/table';
export default {
	mixins: [ Operation, Property ],
	components: { Basic, editPassword, editEmail, Table }
};
</script>

<style lang="scss" scoped src="./scss/index.scss" />
