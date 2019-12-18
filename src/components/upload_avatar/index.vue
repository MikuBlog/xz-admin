<template>
  <el-dialog title="更换头像" :visible.sync="dialogVisible" width="600px" append-to-body v-dialogDrag>
    <div class="flex-box">
      <div class="cropper-box">
        <div class="select-button-box">
          <el-button type="text" @click="getAvatar">
            <i class="el-icon-upload el-icon--left"></i>选择头像
          </el-button>
        </div>
        <VueCropper
          ref="cropper"
          :info="true"
          :centerBox="true"
          :img="options.img"
          :outputSize="options.size"
          :outputType="options.outputType"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
          @realTime="realTime"
        ></VueCropper>
        <div class="correct-button-box">
          <el-button @click="$refs.cropper.changeScale(1)" size="medium" icon="el-icon-plus"></el-button>
          <el-button @click="$refs.cropper.changeScale(-1)" size="medium" icon="el-icon-minus"></el-button>
          <el-button @click="$refs.cropper.rotateLeft()" size="medium" icon="el-icon-refresh-left"></el-button>
          <el-button
            @click="$refs.cropper.rotateRight()"
            size="medium"
            icon="el-icon-refresh-right"
          ></el-button>
        </div>
      </div>
      <div class="avatar-box">
        <div class="avatar-upload-preview">
          <img :src="previews.url" :style="previews.img" />
        </div>
        <div class="ensure-button-box">
          <el-button type="primary" @click="sendRequest" size="small">保 存</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
/**
 * @author xuanzai
 * @description 上传头像
 */
// 引入图片剪裁组件
import VueCropper from 'vue-cropper'
export default {
  name: "upload-avatar",
  components: { VueCropper: VueCropper.vueCropper },
  props: {
    uploadAvatar: {
      type: Function,
      default: () => {}
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      previews: {},
      options: {
        img: "",
        size: 1,
        outputType: "jpg",
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: true
      }
    };
  },
  watch: {
    isShow(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit("update:isShow", val);
    }
  },
  methods: {
    realTime(data) {
      this.previews = data;
    },
    // 获取头像
    getAvatar() {
      this.$getImgFile(2).then(result => {
        this.options.img = result.url;
      });
    },
    // 上传头像
    sendRequest() {
      if (this.options.img) {
        this.$refs.cropper.getCropBlob(result => {
          this.uploadAvatar(result);
        });
      } else {
        this.$warnMsg("请选择图片");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.flex-box {
  position: relative;
  display: flex;
  height: 350px;
}
.cropper-box {
  position: relative;
  height: 250px;
  flex: 1;
}
.avatar-box {
  position: relative;
  top: 57px;
  text-align: center;
  flex: 1;
}
.avatar-upload-preview {
  position: relative;
  display: inline-block;
  flex: 1;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.select-button-box {
  position: relative;
  padding-bottom: 10px;
  text-align: left;
}
.correct-button-box {
  position: relative;
  text-align: center;
  margin: 1rem 0;
}
.ensure-button-box {
  position: relative;
  top: 3.4rem;
}
.dialog-footer {
  position: relative;
  top: 10px;
}
</style>