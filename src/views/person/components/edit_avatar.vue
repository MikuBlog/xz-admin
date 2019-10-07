<template>
  <el-dialog title="更换头像" :visible.sync="dialogVisible" width="600px">
    <div class="flex-box">
      <div class="cropper-box">
        <div class="select-button-box">
          <el-button type="text" @click="getAvatar">
            <i class="el-icon-upload el-icon--left"></i>选择头像
          </el-button>
        </div>
        <vueCropper
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
        ></vueCropper>
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
        <!-- <el-avatar :size="200" :style="previews.img" :src="previewUrl" @click.native="uploadAvatar">
          <img src="https://myinterface.xuanzai.top/getPicture?type=error" />
        </el-avatar>-->
        <div class="avatar-upload-preview">
          <img :src="previews.url" :style="previews.img" />
        </div>
        <div class="ensure-button-box">
          <el-button type="primary" @click="uploadAvatar" size="small">保 存</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      dialogVisible: true,
      previews: {
        img: {
          height: "230px",
          width: "230px"
        }
      },
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
  computed: {
    ...mapState({
      avatar: state => state.user.avatar
    })
  },
  mounted() {
    this.options.img = this.avatar
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
    uploadAvatar() {
      if (this.options.img) {
        this.$refs.cropper.getCropBlob(result => {
          this.$http_file({
            url: "/api/user/updateAvatar",
            method: "post",
            data: {
              file: result
            }
          }).then(result => {
            this.dialogVisible = false;
            this.$emit("updateUserInfo");
            this.$successMsg("更换头像成功，正在缓慢加载中~");
          });
        });
      } else {
        this.$warnMsg("请选择图片");
      }
    }
    // imgMove(val) {
    //   console.log(this.option.img)
    //   this.$refs.cropper.stopCrop()
    // },
    // cropMove(val) {
    //   console.log(this.option.img)
    //   this.$refs.cropper.stopCrop()
    // }
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