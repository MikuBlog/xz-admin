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
              title="上传图片"
              circle
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              class="margin-box"
              @click="deleteAll"
              :disabled="!this.idList.length"
              title="批量删除"
              circle
            ></el-button>
          </div>
          <el-table
            ref="pictureTable"
            :data="pictureList"
            :highlight-current-row="true"
            :stripe="true"
            style="width: 100%;"
            :row-key="getRowKey"
            @selection-change="selectItem"
          >
            <el-table-column type="selection" width="55" reserve-selection/>
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
                <img :src="scope.row.url" alt="点击打开" class="el-avatar xz-image" @click="(isShow = true, url = scope.row.url)"/>
              </template>
            </el-table-column>
            <el-table-column prop="size" label="文件大小" :show-overflow-tooltip="true" />
            <el-table-column label="操作" fixed="right" align="center" width="180">
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
    <operation-box 
    :options="buttonOptions"
    @uploadPic="uploadPic"
    @deleteAll="deleteAll"/>
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
