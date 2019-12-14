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
            :stripe="true"
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
                <!-- <a :href="scope.row.url" style="color: #42b983" target="_blank">
                  <img :src="scope.row.url" alt="点击打开" class="el-avatar xz-image" />
                </a> -->
                <img :src="scope.row.url" alt="点击打开" class="el-avatar xz-image" @click="(isShow = true, url = scope.row.url)"/>
              </template>
            </el-table-column>
            <el-table-column prop="size" label="文件大小" :show-overflow-tooltip="true" />
            <el-table-column label="操作" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  icon="el-icon-share"
                  @click="copy(scope.row)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletePicture(scope.row)"
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
              :small="this.defaultConfig.paginationSize"
              :layout="this.defaultConfig.paginationLayout"
              :total="totalElements"
            ></el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <eForm ref="form" />
    <ImagePreview :show-modal.sync="isShow" :url="url" />
  </div>
</template>

<script>
import Initial from './mixins/initial'
import Operation from './mixins/operation'
import Property from './mixins/property'
import eForm from "./components/form";
export default {
  mixins: [ Initial, Operation, Property ],
  components: { eForm }
};
</script>

<style>
</style>
