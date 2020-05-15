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
              @keyup.native.enter="search"
            ></el-input>
            <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
            <el-button
              type="success"
              icon="el-icon-refresh"
              class="margin-box"
              @click="refresh"
              circle
              title="重置"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-upload"
              class="margin-box"
              @click="uploadPic"
              title="上传图片"
              circle
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-download"
              class="margin-box"
              @click="exportImage"
              :disabled="!selectImageList.length"
              title="批量导出图片"
              circle
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              class="margin-box"
              @click="deleteAll"
              :disabled="!idList.length"
              title="批量删除"
              circle
            ></el-button>
          </div>
          <el-table
            ref="pictureTable"
            :data="pictureList"
						:max-height="$store.state.tableHeight.tableHeight"
            style="width: 100%;"
            :row-key="getRowKey"
            @selection-change="selectItem"
            highlight-current-row
            stripe
          >
            <el-table-column type="selection" width="55" reserve-selection />
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
                <img
                  :src="scope.row.url"
                  alt="点击打开"
                  class="el-avatar xz-image"
                  @click="(isShow = true, url = scope.row.url)"
                />
              </template>
            </el-table-column>
            <el-table-column prop="size" label="文件大小" show-overflow-tooltip />
            <el-table-column label="操作" fixed="right" align="center" width="180">
              <template slot-scope="scope">
                <el-button type="success" icon="el-icon-share" @click="copy(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deletePicture(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            ref="pagination"
            :get-data="getPictureList"
            :now-page.sync="nowPage"
            :now-size.sync="nowSize"
            :total="totalElements"
          />
        </el-card>
      </el-col>
    </el-row>
    <eForm ref="form" />
    <ImagePreview :show-modal.sync="isShow" :url="url" />
  </div>
</template>

<script>
import Initial from "./js/initial";
import Operation from "./js/operation";
import Property from "./js/property";
import eForm from "./components/form";
export default {
  mixins: [Initial, Operation, Property],
  components: { eForm }
};
</script>

<style>
</style>
