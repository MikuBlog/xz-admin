<template>
  <div class="dictionary-manage">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title">字典列表</span>
            <el-button
              style="float: right; margin-top: 5px;"
              type="primary"
              icon="el-icon-plus"
              size="small"
              @click="addDictionary"
            >新增</el-button>
          </div>
          <div class="search">
            <el-row :gutter="10">
              <el-input
                v-model="searchVal_1"
                class="search-input margin-box"
                placeholder="请选择类型进行搜索"
                @keyup.native="searchEnter_1"
              ></el-input>
              <el-select
                v-model="selectType_1"
                clearable
                placeholder="类型"
                class="select-input margin-box"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-button icon="el-icon-search" class="margin-box" @click="search_1" circle></el-button>
            </el-row>
          </div>
          <el-table
            :data="dictionaryList"
            style="width: 100%;"
            :highlight-current-row="true"
            :stripe="true"
            @row-click="getDictName"
          >
            <el-table-column label="名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.remark }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  class="margin-box"
                  @click="editDictionary(scope.row)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  class="margin-box"
                  @click="deleteDictionary(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange_1"
              @current-change="handleCurrentChange_1"
              :page-sizes="[10, 25, 50, 100]"
              :page-size="nowSize_1"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalElements_1"
            ></el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12">
        <el-card class="box-card card-gutter-sm">
          <div slot="header" class="clearfix">
            <span class="title">字典详情</span>
            <el-button
              style="float: right; margin-top: 5px;"
              type="primary"
              icon="el-icon-plus"
              size="small"
              @click="addDetail"
            >新增</el-button>
          </div>
          <div class="search">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-input
                  v-model="searchVal_2"
                  placeholder="按字典标签内容搜索"
                  @keyup.native="searchEnter_2"
                ></el-input>
              </el-col>
              <el-button icon="el-icon-search" @click="search_2" circle></el-button>
            </el-row>
          </div>
          <el-table :data="detailList" :highlight-current-row="true" style="width: 100%" :stripe="true">
            <el-table-column label="所属字典" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ beloneDictName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="字典标签" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.label }}</div>
              </template>
            </el-table-column>
            <el-table-column label="字典值" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.value }}</div>
              </template>
            </el-table-column>
            <el-table-column label="排序" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.sort }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="editDetail(scope.row)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteDetail(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange_2"
              @current-change="handleCurrentChange_2"
              :page-sizes="[10, 25, 50, 100]"
              :page-size="nowSize_2"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalElements_2"
            ></el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <Form-Add ref="formAdd" :isAdd="isAdd_1"/>
    <Form-Edit ref="formEdit" :isAdd="isAdd_2" @updateDetailList="getDetailList" />
  </div>
</template>

<script>
import Initial from './mixins/initial'
import Operation from './mixins/operation'
import Property from './mixins/property'
import FormAdd from "./components/add";
import FormEdit from "./components/edit";
export default {
  mixins: [ Initial, Operation, Property ],
  components: { FormAdd, FormEdit }
};
</script>

<style lang="scss" scoped>
.title {
  position: relative;
  font-size: 1rem;
}
.gutter {
  padding: 0 !important;
}
</style>
