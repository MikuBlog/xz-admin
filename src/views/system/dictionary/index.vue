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
              <el-button
                type="success"
                icon="el-icon-refresh"
                class="margin-box"
                @click="refresh_1"
                circle
                title="重置"
              ></el-button>
							<el-button
							  type="warning"
							  icon="el-icon-download"
							  class="margin-box"
							  @click="downloadList"
							  title="导出字典列表"
							  circle
							></el-button>
            </el-row>
          </div>
          <el-table
            :data="dictionaryList"
            style="width: 100%;"
            @row-click="getDictName"
            highlight-current-row
            stripe
          >
            <el-table-column label="名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" show-overflow-tooltip>
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.remark }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" fixed="right" align="center">
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
          <pagination
            ref="pagination_1"
            :get-data="getDictionaryList"
            :now-page.sync="nowPage_1"
            :now-size.sync="nowSize_1"
            :total="totalElements_1"
          />
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
              <el-input
                v-model="searchVal_2"
                class="search-input margin-box"
                placeholder="按字典标签内容搜索"
                @keyup.native="searchEnter_2"
              ></el-input>
              <el-button icon="el-icon-search" @click="search_2" class="margin-box" circle></el-button>
              <el-button
                type="success"
                icon="el-icon-refresh"
                class="margin-box"
                @click="refresh_2"
                circle
                title="重置"
              ></el-button>
            </el-row>
          </div>
          <el-table :data="detailList" style="width: 100%" highlight-current-row stripe>
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
                <el-button type="primary" icon="el-icon-edit" @click="editDetail(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteDetail(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            ref="pagination_2"
            :get-data="getDetailList"
            :now-page.sync="nowPage_2"
            :now-size.sync="nowSize_2"
            :total="totalElements_2"
          />
        </el-card>
      </el-col>
    </el-row>
    <operation-box :options="buttonOptions" @addDictionary="addDictionary" @addDetail="addDetail" @downloadList="downloadList"/>
    <Form-Add ref="formAdd" :isAdd="isAdd_1" />
    <Form-Edit ref="formEdit" :isAdd="isAdd_2" @updateDetailList="getDetailList" />
  </div>
</template>

<script>
import Initial from "./mixins/initial";
import Operation from "./mixins/operation";
import Property from "./mixins/property";
import FormAdd from "./components/add";
import FormEdit from "./components/edit";
export default {
  mixins: [Initial, Operation, Property],
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
