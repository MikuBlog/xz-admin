<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in tagsList"
        ref="tag"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        :key="tag.path"
        tag="span"
        class="tags-view-item"
        @click.middle.native="tabsClick(tag)"
        @contextmenu.prevent.native="openMenu(tag,$event)">
        {{ tag.meta.title }}
        <span v-if="tag.meta.title != '首页'" class="el-icon-close" @click.prevent.stop="tabsRemove(tag)" />
      </router-link>
    </scroll-pane>
  </div>
</template>

<script>
import ScrollPane from '@/components/scrollpane';
export default {
    components: { ScrollPane },
    props: {
        tagsList: {
            type: Array,
            default: []
        }
    },
    watch: {
        $route() {
            this.moveToCurrentTag()
        },
    },
    methods: {
        moveToCurrentTag() {
            const tags = this.$refs.tag
            this.$nextTick(() => {
                for (const tag of tags) {
                    if (tag.to.path === this.$route.path) {
                        this.$refs.scrollPane.moveToTarget(tag)
                        break
                    }
                }
            })
        },
        isActive(route) {
            return route.path === this.$route.path
        },
        navigateTo(path) {
            this.$router.push({ path })
        },
        // 点击标签
        tabsClick(item) {
            this.navigateTo(item.path)
            this.initialScrollTop()
        },
        // 移除标签
        tabsRemove(item) {
            for(let i = 0, len = this.tagsList.length; i < len; i ++) {
              if(item.meta.title === this.tagsList[i].meta.title) {
                if(item.path == this.$route.path) {
                  this.$router.push({ path: this.tagsList[i - 1].path })
                }  
                this.tagsList.splice(i, 1)
              }  
            }
        },
        // 初始化当前滚动高度
        initialScrollTop(isIntial = false) {
            isIntial 
            ? document.querySelector('.top').scrollTop = this.$getMemorySes('scrollTop')
            : setTimeout(() => {
                document.querySelector('.top').scrollTop = 0
            }, 700)
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
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
      &.active {
        background-color: #2d8cf0;
        color: #fff;
        border-color: #2d8cf0;
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
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
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
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
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