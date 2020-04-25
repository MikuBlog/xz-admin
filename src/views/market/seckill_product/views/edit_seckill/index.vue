<template>
  <div class="article-list">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="left-border">编辑秒杀产品</span>
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
            label-width="130px"
            class="demo-ruleForm"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="秒杀产品名称" prop="seckillSpu.name">
                  <el-input v-model="form.seckillSpu.name" placeholder="默认为商品名称"></el-input>
                </el-form-item>
                <el-form-item label="秒杀产品简介" prop="seckillSpu.info">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="form.seckillSpu.info"
                    placeholder="默认为商品简介"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="选择秒杀产品商品">
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
              <!-- <el-col :span="24">
                <el-form-item label="规则状态" prop="seckillSpu.ruleType">
                  <el-radio-group v-model="form.seckillSpu.ruleType">
                    <el-radio :label="0">正常上线</el-radio>
                    <el-radio :label="1">到期下线</el-radio>
                    <el-radio :label="2">手动下线</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item label="优惠类型" prop="seckillSpu.activityType">
                  <el-radio-group v-model="form.seckillSpu.activityType">
                    <el-radio :label="1">折扣</el-radio>
                    <el-radio :label="2">返现</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="活动状态" prop="seckillSpu.status">
                  <el-radio-group v-model="form.seckillSpu.status">
                    <el-radio :label="1">开启</el-radio>
                    <el-radio :label="2">关闭</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="秒杀产品价(元)" prop="seckillSpu.seckillPrice">
                  <el-input-number
                    :min="0"
                    v-model="form.seckillSpu.seckillPrice"
                    placeholder="请输入秒杀产品价"
                  />
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="秒杀产品人数设置" prop="seckillSpu.peopleCount">
                  <el-input-number
                    :min="0"
                    v-model="form.seckillSpu.peopleCount"
                    placeholder="请输入秒杀产品人数"
                  />
                </el-form-item>
              </el-col> -->
              <el-col :span="12" v-if="form.seckillSpu.activityType === 1">
                <el-form-item label="秒杀产品折扣" prop="seckillSpu.seckillDiscount">
                  <el-input-number
                    :min="0"
                    :max="100"
                    v-model="form.seckillSpu.seckillDiscount"
                    placeholder="请输入秒杀产品折扣"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="form.seckillSpu.activityType === 2">
                <el-form-item label="秒杀返现(元)" prop="seckillSpu.returnMoney">
                  <el-input-number :min="0" v-model="form.seckillSpu.returnMoney" placeholder="请输入返现值" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开始时间" prop="seckillSpu.startTime">
                  <el-date-picker
                    v-model="form.seckillSpu.startTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期时间"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束时间" prop="seckillSpu.stopTime">
                  <el-date-picker
                    v-model="form.seckillSpu.stopTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期时间"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="秒杀时效(时)" prop="seckillSpu.timeId">
                  <el-select v-model="form.seckillSpu.timeId" placeholder="请选择秒杀时间段" >
                    <el-option
                      v-for="(item, ind) in options"
                      :key="ind"
                      :label="`${item.startTime}点开始，持续${item.continueTime}小时`"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="限购数" prop="seckillSpu.limitBuy">
                  <el-input-number
                    :min="0"
                    :max="99999"
                    v-model="form.seckillSpu.limitBuy"
                    placeholder="请输入限购数"
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