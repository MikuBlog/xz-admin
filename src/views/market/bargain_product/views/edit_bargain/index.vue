<template>
  <div class="article-list">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="left-border">编辑砍价产品</span>
            <el-button
              type="primary"
              style="float: right; position: relative; top: -3px;"
              size="small"
              @click="submitForm"
            >确认保存</el-button>
            <el-button
              type="info"
              style="float: right; position: relative; top: -3px; margin-right: 10px"
              size="small"
              @click="$router.go(-1)"
            >返回</el-button>
          </div>
          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            label-width="140px"
            class="demo-ruleForm"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="砍价产品名称" prop="bargainSpu.name">
                  <el-input v-model="form.bargainSpu.name" placeholder="默认为商品名称"></el-input>
                </el-form-item>
                <el-form-item label="砍价产品简介" prop="bargainSpu.info">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="form.bargainSpu.info"
                    placeholder="默认为商品简介"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="选择砍价产品商品">
                  <el-input
                    v-model="productName"
                    placeholder="查询商品名称"
                    @keyup.native.enter="search"
                    class="margin-box search-input"
                  ></el-input>
                  <!-- <el-autocomplete
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
                  ></el-cascader>-->
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
                    <el-table-column width="55" label="序号">
                      <template slot-scope="scope">
                        <div>
                          <el-radio
                            :label="scope.$index + 1"
                            v-model="product"
                            @change.native="getCurrentRow(scope.row)"
                          ></el-radio>
                        </div>
                      </template>
                    </el-table-column>
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
                    :isInit="false"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="规则状态" prop="bargainSpu.ruleType">
                  <el-radio-group v-model="form.bargainSpu.ruleType">
                    <el-radio :label="0">到砍价时间不自动开启</el-radio>
                    <el-radio :label="1">到砍价时间自动开启时间</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="活动状态" prop="bargainSpu.status">
                  <el-radio-group v-model="form.bargainSpu.status">
                    <el-radio :label="1">开启</el-radio>
                    <el-radio :label="2">关闭</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="砍价金额(元)" prop="bargainSpu.bargainPrice">
                  <el-input-number
                    :min="0"
                    v-model="form.bargainSpu.bargainPrice"
                    placeholder="请输入砍价金额"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="限购" prop="bargainSpu.limitBuy">
                  <el-input-number
                    :min="0"
                    v-model="form.bargainSpu.limitBuy"
                    placeholder="请输入限购数量"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单次砍到最低价" prop="bargainSpu.bargainMinPrice">
                  <el-input-number
                    :min="0"
                    v-model="form.bargainSpu.bargainMinPrice"
                    placeholder="请输入单次砍到最低价"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单次砍到最高价" prop="bargainSpu.bargainMaxPrice">
                  <el-input-number
                    :min="0"
                    v-model="form.bargainSpu.bargainMaxPrice"
                    placeholder="请输入单次砍到最低价"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="允许砍到最低价" prop="bargainSpu.minPrice">
                  <el-input-number
                    :min="0"
                    :max="100"
                    v-model="form.bargainSpu.minPrice"
                    placeholder="请输入允许砍到最高价"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户允许砍价次数" prop="bargainSpu.bargainNum">
                  <el-input-number :min="0" v-model="form.bargainSpu.bargainNum" placeholder="请输入用户允许砍价次数" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开始时间" prop="bargainSpu.startTime">
                  <el-date-picker
                    v-model="form.bargainSpu.startTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束时间" prop="bargainSpu.stopTime">
                  <el-date-picker
                    v-model="form.bargainSpu.stopTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-divider></el-divider>
              </el-col>
              <el-col :span="22">
                <el-form-item label="砍价规则" prop="bargainSpu.rule">
                  <Tinymce :height="800" v-model="form.bargainSpu.rule" />
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