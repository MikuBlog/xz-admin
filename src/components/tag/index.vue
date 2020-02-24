<template>
	<div class="tags-view-container">
		<scroll-pane ref="scrollPane" class="tags-view-wrapper">
			<router-link
				v-for="tag in tagsList"
				ref="tag"
				:class="isActive(tag) ? 'activetag' : ''"
				:to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
				:key="tag.path"
				tag="span"
				class="tags-view-item"
				@click.middle.native="tabsClick(tag)"
				@contextmenu.prevent.native="openMenu(tag, $event)"
			>
				{{ tag.meta.title }}
				<span v-if="tag.meta.title != '首页'" class="el-icon-close" @click.prevent.stop="tabsRemove(tag)" />
			</router-link>
		</scroll-pane>
		<ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
			<li @click="refreshPage(selectedTag)">刷新</li>
			<li @click="closeTag()">关闭</li>
			<li @click="closeOther()">关闭其他</li>
			<li @click="closeAll()">关闭全部</li>
		</ul>
	</div>
</template>

<script>
import ScrollPane from '@/components/scrollpane';
import { mapMutations } from 'vuex';
export default {
	name: 'Tag',
	components: { ScrollPane },
	props: {
		tagsList: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			visible: false,
			top: 0,
			left: 0,
			selectedTag: {},
			affixTags: []
		};
	},
	created() {
		this.setTagColor()
	},
	watch: {
		$route() {
			this.moveToCurrentTag();
		},
		visible(value) {
			if (value) {
				document.body.addEventListener('click', this.closeMenu);
			} else {
				document.body.removeEventListener('click', this.closeMenu);
			}
		}
	},
	methods: {
		...mapMutations([
			'REMOVE_TAGS', 
			'REMOVE_ALL_TAGS', 
			'REMOVE_RANGE_TAGS', 
			'DEL_CACHE_VIEWS', 
			'ADD_CACHE_VIEWS']),
		setTagColor() {
		  this.$createStyle(`
		    .activetag {
		      background: ${this.defaultConfig.default.tagsColor}!important;
		      border-color: ${this.defaultConfig.default.tagsColor}!important;
		    }
		  `, 'tag-color')
		},
		refreshPage(tag) {
			this.DEL_CACHE_VIEWS(tag)
			setTimeout(() => {
				this.ADD_CACHE_VIEWS(tag)
			}, 1000)
			this.$router.replace({
				path: `/home/redirect?path=${this.selectedTag.fullPath}`
			});
		},
		closeTag() {
			if(this.selectedTag.meta.title === '首页') return
			this.tabsRemove(this.selectedTag);
		},
		// 移除所有标签
		closeAll() {
			this.REMOVE_ALL_TAGS();
			this.$router.push('/home/welcome');
		},
		// 移除其他标签
		closeOther() {
			let i = 0
			this.$router.push(this.selectedTag)
			this.tagsList.forEach((val, ind) => {
				if (this.selectedTag.meta.title === val.meta.title ) {
					i = ind
				}
			})
			if(i == 0) {
				this.REMOVE_RANGE_TAGS({
					startInd: 1,
					number: this.tagsList.length - 1
				})
			}else {
				this.REMOVE_RANGE_TAGS({
					startInd: 1,
					number: i - 1
				})
				this.REMOVE_RANGE_TAGS({
					startInd: 2,
					number: this.tagsList.length - 1
				})
			}
		},
		moveToCurrentTag() {
			const tags = this.$refs.tag;
			this.$nextTick(() => {
				for (const tag of tags) {
					if (tag.to.path === this.$route.path) {
						this.$refs.scrollPane.moveToTarget(tag);
						break;
					}
				}
			});
		},
		isActive(route) {
			return route.path === this.$route.path;
		},
		navigateTo(path) {
			this.$router.push({ path });
		},
		// 点击标签
		tabsClick(item) {
			this.navigateTo(item.path);
			this.initialScrollTop();
		},
		// 右键标签
		openMenu(tag, e) {
			const menuMinWidth = 105;
			const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
			const offsetWidth = this.$el.offsetWidth; // container width
			const maxLeft = offsetWidth - menuMinWidth; // left boundary
			const left = e.clientX - offsetLeft + 5; // 15: margin right
			if (left > maxLeft) {
				this.left = maxLeft;
			} else {
				this.left = left;
			}
			this.top = e.clientY - 45;
			this.visible = true;
			this.selectedTag = tag;
		},
		closeMenu() {
			this.visible = false;
		},
		// 移除标签
		tabsRemove(item) {
			for (let i = 0, len = this.tagsList.length; i < len; i++) {
				if (item.meta.title === this.tagsList[i].meta.title) {
					if (item.path == this.$route.path && i == len - 1) {
						this.$router.push({ path: this.tagsList[i - 1].path });
					}
					if (item.path == this.$route.path && i != len - 1) {
						this.$router.push({ path: this.tagsList[i + 1].path });
					}
					this.REMOVE_TAGS(i);
				}
			}
		},
		// 初始化当前滚动高度
		initialScrollTop(isIntial = false) {
			isIntial
				? (document.querySelector('.top').scrollTop = this.$getMemorySes('scrollTop'))
				: setTimeout(() => {
						document.querySelector('.top').scrollTop = 0;
				  }, 700);
		}
	}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
	position: relative;
	height: 34px;
	width: 100%;
	border-bottom: 1px solid #d8dce5;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
	.tags-view-wrapper {
		.tags-view-item {
			display: inline-block;
			position: relative;
			cursor: pointer;
			height: 26px;
			line-height: 26px;
			border: 1px solid #d8dce5;
			color: #495060;
			background: #fff;
			padding: 0 8px;
			font-size: 12px;
			margin-left: 5px;
			margin-top: 4px;
			&:first-of-type {
				margin-left: 15px;
			}
			&:last-of-type {
				margin-right: 15px;
			}
			&.activetag {
				background-color: #409eff;
				color: #fff;
				border-color: #409eff;
				&::before {
					content: '';
					background: #fff;
					display: inline-block;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					position: relative;
					margin-right: 2px;
				}
			}
		}
	}
	.contextmenu {
		margin: 0;
		background: #fff;
		z-index: 99;
		position: absolute;
		list-style-type: none;
		padding: 5px 0;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 400;
		color: #333;
		box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
		li {
			margin: 0;
			padding: 7px 16px;
			cursor: pointer;
			&:hover {
				background: #eee;
			}
		}
	}
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
	.tags-view-item {
		.el-icon-close {
			width: 16px;
			height: 16px;
			vertical-align: 2px;
			border-radius: 50%;
			text-align: center;
			transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
			transform-origin: 100% 50%;
			&:before {
				transform: scale(0.6);
				display: inline-block;
				vertical-align: -3px;
			}
			&:hover {
				background-color: #b4bccc;
				color: #fff;
			}
		}
	}
}
</style>
