<template>
  <div class="article-list">
    <el-form :model="form" :rules="rules" ref="form" label-width="110px" class="demo-ruleForm">
      <el-row>
        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="left-border">商品介绍</span>
              <!-- <div class="select-box">
              <el-checkbox v-model="form.isTop">是否置顶</el-checkbox>
              <el-checkbox v-model="form.isShow">是否显示</el-checkbox>
              </div>-->
            </div>
            <div class="button-box">
              <el-button type="primary" size="small" @click="submitForm">确认</el-button>
              <el-button type="info" size="small" @click="resetForm">重置</el-button>
              <el-button size="small" @click="$router.back()">返回</el-button>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="商品名称" prop="spu.name">
                  <el-input v-model="form.spu.name"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="spu.typeId">
                  <el-cascader
                    @change="selectGoodsType"
                    :options="goodsTypeList"
                    :props="typeProps"
                    collapse-tags
                    clearable
                    ref="goodsType"
                  ></el-cascader>
                </el-form-item>
                <el-form-item label="商品品牌" prop="spu.brandName">
                  <el-autocomplete
                    v-model="brandName"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入品牌进行搜索"
                    @select="selectBrand"
                    value-key="name"
                  ></el-autocomplete>
                </el-form-item>
                <el-form-item label="商品单位" prop="spu.unit">
                  <el-input placeholder="个/件/盒..." v-model="form.spu.unit"></el-input>
                </el-form-item>
                <el-form-item label="商品条码" prop="spu.barCode">
                  <el-input v-model="form.spu.barCode"></el-input>
                </el-form-item>
                <el-form-item label="商品简介" prop="spu.info">
                  <el-input type="textarea" :rows="4" v-model="form.spu.info"></el-input>
                </el-form-item>
                <el-form-item label="关键词">
                  <el-tag
                    class="tags"
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >{{tag}}</el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  ></el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品封面">
                  <el-upload
                    class="avatar-uploader"
                    :http-request="uploadImage_1"
                    :show-file-list="false"
                    action="string"
                  >
                    <img v-if="coverImage" :src="coverImage" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="宣传画廊">
                  <el-upload
                    list-type="picture-card"
                    class="avatar-uploader"
                    :http-request="uploadImage_2"
                    action="string"
                    :on-preview="handlePictureCardPreview"
                    :before-remove="handleRemove"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog append-to-body :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-divider></el-divider>
              </el-col>
              <el-col :span="22">
                <el-form-item label="商品描述" prop="spu.description">
                  <Tinymce v-model="form.spu.description" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-divider></el-divider>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="24">
          <el-card class="box-card" style="margin-top: 1rem">
            <div slot="header" class="clearfix">
              <span class="left-border">商品规格</span>
            </div>
            <el-radio-group v-model="skuGroup">
              <el-radio-button label="default">默认标准规格</el-radio-button>
              <el-radio-button label="more">多规格支持</el-radio-button>
            </el-radio-group>
          </el-card>
        </el-col>
        <el-col :span="24">
          <el-card class="box-card" style="margin-top: 1rem">
            <div slot="header" class="clearfix">
              <span class="left-border">商品参数</span>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="商品售价(元)" prop="spu.salesPrice">
                  <el-input type="number" v-model="form.spu.salesPrice" @input="format('salesPrice')"></el-input>
                </el-form-item>
                <el-form-item label="邮费(元)" prop="spu.postagePrice">
                  <el-input type="number" v-model="form.spu.postagePrice" @input="getPostagePrice"></el-input>
                </el-form-item>
                <el-form-item label="库存" prop="spu.totalStock">
                  <el-input type="number" v-model="form.spu.totalStock" @input="format('totalStock')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="市场价(元)" prop="spu.marketPrice">
                  <el-input type="number" v-model="form.spu.marketPrice" @input="format('marketPrice')"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="spu.sort">
                  <el-input type="number" v-model="form.spu.sort" @input="format('sort')"></el-input>
                </el-form-item>
                <el-form-item label="获得积分" prop="spu.giveIntegral">
                  <el-input type="number" v-model="form.spu.giveIntegral" @input="format('giveIntegral')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="成本价(元)" prop="spu.costPrice">
                  <el-input type="number" v-model="form.spu.costPrice" @input="format('costPrice')"></el-input>
                </el-form-item>
                <el-form-item label="虚拟销量" prop="spu.fictiSales">
                  <el-input type="number" v-model="form.spu.fictiSales" @input="format('fictiSales')"></el-input>
                </el-form-item>
                <el-form-item label="预警库存" prop="spu.warnStock">
                  <el-input type="number" v-model="form.spu.warnStock" @input="format('warnStock')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="热卖单品" prop="spu.onHot">
                  <el-radio-group v-model="form.spu.onHot">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="促销单品" prop="spu.onBenefit">
                  <el-radio-group v-model="form.spu.onBenefit">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="首发新品" prop="spu.onNew">
                  <el-radio-group v-model="form.spu.onNew">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="优品推荐" prop="spu.onRecommend">
                  <el-radio-group v-model="form.spu.onRecommend">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="精品推荐" prop="spu.onBest">
                  <el-radio-group v-model="form.spu.onBest">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="库存扣减" prop="spu.stockReduceType">
                  <el-radio-group v-model="form.spu.stockReduceType">
                    <el-radio :label="0">拍下减库存</el-radio>
                    <el-radio :label="1">付款减库存</el-radio>
                    <el-radio :label="2">永不减库存</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-form>
    <operation-box :options="buttonOptions" @submitForm="submitForm" @resetForm="resetForm" />
  </div>
</template>

<script>
import Operation from "./js/operation";
import Property from "./js/property";
export default {
  mixins: [Operation, Property]
};
</script>

<style lang="scss" scoped src="./scss/index.scss">
</style>
