<template>
  <div class="article-list">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="left-border">开启拼团</span>
          </div>
          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="拼团名称" prop="comSpu.name">
                  <el-input v-model="form.comSpu.name" placeholder="默认为商品名称"></el-input>
                </el-form-item>
                <el-form-item label="拼团简介" prop="comSpu.info">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="form.comSpu.info"
                    placeholder="默认为商品简介"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="选择拼团商品">
                  <el-input
                    v-model="productName"
                    placeholder="查询商品名称"
                    @keyup.native.enter="search"
                    class="margin-box search-input"
                  ></el-input>
                  <el-autocomplete
                    class="margin-box search-input"
                    v-model="brandName"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入品牌进行搜索"
                    @select="selectBrand"
                    value-key="name"
                  ></el-autocomplete>
                  <el-cascader
                    class="margin-box search-input"
                    @change="selectGoodsType"
                    :options="goodsTypeList"
                    :props="typeProps"
                    collapse-tags
                    clearable
                    ref="goodsType"
                    placeholder="查询商品分类"
                  ></el-cascader>
                  <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
                </el-form-item>
                <el-form-item>
                  <el-table
                    ref="table"
                    :data="goodsList"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    :row-key="getRowKey"
                    highlight-current-row
                    stripe
                  >
                    <el-table-column type="selection" width="55" reserve-selection />
                    <el-table-column
                      ref="table"
                      :show-overflow-tooltip="true"
                      prop="url"
                      label="商品图片"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <img
                          :src="scope.row.coverImage || 'https://myinterface.xuanzai.top/getPicture?type=error'"
                          alt="点击打开"
                          class="el-avatar xz-image"
                          @click="(isShow = true), (url = scope.row.coverImage)"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="商品名称" :show-overflow-tooltip="true" />
                    <el-table-column
                      prop="salesPrice"
                      label="商品价格(元)"
                      :show-overflow-tooltip="true"
                      align="center"
                    />
                  </el-table>
                  <pagination
                    ref="pagination"
                    :get-data="getGoodsList"
                    :now-page.sync="nowPage"
                    :now-size.sync="nowSize"
                    :total="totalElements"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Operation from "./js/operation";
import Property from "./js/property";
export default {
  mixins: [Operation, Property]
};
</script>

<style lang="scss" scoped src="./scss/index.scss"></style>