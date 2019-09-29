<template>
  <div class="picture-manage">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="search">
            <el-input
              v-model="searchVal"
              placeholder="搜索图片名称"
              class="search-input margin-box"
              @keyup.native="searchEnter"
            ></el-input>
            <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
            <el-button
              type="primary"
              icon="el-icon-upload"
              class="margin-box"
              @click="uploadPic"
              circle
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              class="margin-box"
              @click="deleteSelect"
              :disabled="!isShowButton"
              circle
            ></el-button>
          </div>
          <el-table
            ref="table"
            :data="pictureList"
            :highlight-current-row="true"
            size="small"
            style="width: 100%;"
            @selection-change="selectItem"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="filename" label="文件名" :show-overflow-tooltip="true" />
            <el-table-column prop="username" label="上传者" :show-overflow-tooltip="true" />
            <el-table-column
              ref="table"
              :show-overflow-tooltip="true"
              prop="url"
              label="缩略图"
              align="center"
            >
              <template slot-scope="scope">
                <a :href="scope.row.url" style="color: #42b983" target="_blank">
                  <img :src="scope.row.url" alt="点击打开" class="el-avatar xz-image" />
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="size" label="文件大小" :show-overflow-tooltip="true" />
            <el-table-column label="操作" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  icon="el-icon-share"
                  @click="copy(scope.row)"
                  size="small"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletePicture(scope.row)"
                  size="small"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 25, 50, 100]"
              :page-size.sync="nowSize"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalElements"
            ></el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <eForm ref="form" />
  </div>
</template>

<script>
import eForm from "./components/form";
export default {
  components: { eForm },
  data() {
    return {
      searchVal: "",
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      dialogVisible: false,
      isShowButton: false,
      pictureList: [],
      idList: []
    };
  },
  created() {
    // 初始化页面数据
    this.getPictureList();
  },
  methods: {
    // 复制图片地址
    copy(item) {
      this.$copyText(item.url).then(() => {
        this.$successMsg("复制成功");
      });
    },
    // 删除选中的图片
    deleteSelect() {
      this.$showMsgBox({ msg: `是否删除选中图片?` }).then(() => {
        this.$http_json({
          url: `/api/picture/del`,
          method: "post",
          data: this.idList
        }).then(() => {
          this.$successMsg("删除成功");
          this.getPictureList();
        });
      });
    },
    // 删除图片
    deletePicture(item) {
      this.$showMsgBox({ msg: `是否删除当前图片?` }).then(() => {
        this.$http_json({
          url: `/api/picture/del`,
          method: "post",
          data: [item.id]
        }).then(() => {
          this.$successMsg("删除成功");
          this.getPictureList();
        });
      });
    },
    // 上传图片
    uploadPic() {
      this.$refs.form.dialog = true;
    },
    // 选中图片
    selectItem(picArray) {
      this.idList = picArray.map(val => val.id);
      this.idList.length != 0
        ? (this.isShowButton = true)
        : (this.isShowButton = false);
    },
    // 点击搜索
    search() {
      this.nowPage = 1;
      this.getPictureList();
    },
    // 回车搜索
    searchEnter(e) {
      this.nowPage = 1;
      e.keyCode === 13 && this.getPictureList();
    },
    // 条数变化
    handleSizeChange(size) {
      this.nowSize = size;
      this.getPictureList();
    },
    // 页数变化
    handleCurrentChange(page) {
      this.nowPage = page;
      this.getPictureList();
    },
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化错误日志列表
    initialPictureList(list) {
      this.pictureList.splice(0);
      list.forEach(value => {
        this.pictureList.push(value);
      });
    },
    // 获取图片列表
    getPictureList() {
      this.$http_normal({
        url: `/api/picture/page?page=${this.nowPage - 1}&size=${this.nowSize}${
            this.searchVal ? `&filename=${this.searchVal}` : ""
          }`
        ,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialPictureList(data.content);
      });
    }
  }
};
</script>

<style>
</style>
