<template>
	<div class="chart">
		<el-row :gutter="20">
			<el-col :xs="12" :sm="12" :md="6" :xl="6">
				<el-card class="box-card">
					<el-row>
						<el-col :xs="24" :sm="12" style="text-align: center">
							<div class="iconfont-box"><span class="el-icon-user-solid"></span></div>
						</el-col>
						<el-col :xs="24" :sm="12">
							<div class="content-box">
								<div class="header">流量</div>
								<div class="number"><countTo :startVal="0" :endVal="peopleNum" :duration="duration" /></div>
							</div>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12" :md="6" :xl="6">
				<el-card class="box-card">
					<el-row>
						<el-col :xs="24" :sm="12" style="text-align: center">
							<div class="iconfont-box"><span class="el-icon-document"></span></div>
						</el-col>
						<el-col :xs="24" :sm="12">
							<div class="content-box">
								<div class="header">留言</div>
								<div class="number"><countTo :startVal="0" :endVal="messageNum" :duration="duration" /></div>
							</div>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12" :md="6" :xl="6">
				<el-card class="box-card">
					<el-row>
						<el-col :xs="24" :sm="12" style="text-align: center">
							<div class="iconfont-box"><span class="el-icon-coin"></span></div>
						</el-col>
						<el-col :xs="24" :sm="12">
							<div class="content-box">
								<div class="header">销售额</div>
								<div class="number"><countTo :startVal="0" :endVal="money" :duration="duration" /></div>
							</div>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12" :md="6" :xl="6">
				<el-card class="box-card">
					<el-row>
						<el-col :xs="24" :sm="12" style="text-align: center">
							<div class="iconfont-box"><span class="el-icon-shopping-cart-1"></span></div>
						</el-col>
						<el-col :xs="24" :sm="12">
							<div class="content-box">
								<div class="header">销售量</div>
								<div class="number"><countTo :startVal="0" :endVal="sellNum" :duration="duration" /></div>
							</div>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
		<el-row style="margin-top: 1rem">
			<el-col :span="24">
				<el-card class="box-card">
					<ve-line
						:data="lineData"
						:settings="lineSettings"
						:colors="colors"
						:after-config="
							options => {
								options.animationDuration = 3000;
								return options;
							}
						"
					></ve-line>
				</el-card>
			</el-col>
		</el-row>
		<el-row style="margin-top: 1rem" :gutter="20">
			<el-col :xs="24" :sm="24" :md="24" :lg="8">
				<el-card class="box-card"><ve-ring :data="ringData" :settings="ringSettings" :colors="colors"></ve-ring></el-card>
			</el-col>
			<el-col :xs="24" :sm="24" :md="24" :lg="8">
				<el-card class="box-card"><ve-funnel :data="funnelData" :settings="funnelSettings" :colors="colors"></ve-funnel></el-card>
			</el-col>
			<el-col :xs="24" :sm="24" :md="24" :lg="8">
				<el-card class="box-card"><ve-histogram :data="histogramData" :settings="histogramSettings" :colors="colors"></ve-histogram></el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
// 引入v-chart
import Property from './js/property';
import Initial from './js/initial';
import countTo from 'vue-count-to';
import VeLine from 'v-charts/lib/line.common';
import VePie from 'v-charts/lib/pie.common';
import VeRing from 'v-charts/lib/ring.common';
import VeHistogram from 'v-charts/lib/histogram.common';
import VeFunnel from 'v-charts/lib/funnel.common';
export default {
	mixins: [Initial, Property],
	components: { VeLine, VePie, VeRing, VeHistogram, VeFunnel, countTo }
};
</script>

<style lang="scss" src="./scss/index.scss" scoped></style>
