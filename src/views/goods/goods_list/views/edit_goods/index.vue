<template>
  <div class="article-list">
    <el-form :model="form" :rules="rules" ref="form" label-width="110px" class="demo-ruleForm">
      <el-row>
        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="left-border">商品介绍</span>
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
										v-model="typeName"
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
                    @close="handleClose(tag, 'dynamicTags')"
                  >{{tag}}</el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm('inputValue', 'inputVisible', 'dynamicTags')"
                    @blur="handleInputConfirm('inputValue', 'inputVisible', 'dynamicTags')"
                  ></el-input>
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput('inputVisible', 'saveTagInput')"
                  >+ 添加</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品封面" prop="spu.cover">
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
										:file-list="fileList"
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
                  <Tinymce height="800" v-model="form.spu.description" />
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
            <el-divider v-if="skuGroup === 'more'"></el-divider>
            <div v-if="skuGroup === 'more'">
              <el-form-item label="选择规格">
                <el-cascader
                  v-model="bindingSelectSkuList"
                  @change="selectSkuType"
                  :options="skuList"
                  :props="skuProps"
                  collapse-tags
                  clearable
                  ref="skuType"
                ></el-cascader>
                <el-button
                  type="primary"
                  style="margin-left: .5rem"
                  size="small"
                  @click="generatorSkuList"
                >生成</el-button>
              </el-form-item>
              <el-form-item label="规格名称">
                <el-tag
                  class="tags"
                  :key="tag"
                  v-for="tag in selectSkuLabel"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag, 'selectSkuLabel')"
                >{{tag}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputSkuVisible"
                  v-model="inputSkuValue"
                  ref="skuTagInpt"
                  size="small"
                  @keyup.enter.native="handleInputConfirm('inputSkuValue', 'inputSkuVisible', 'selectSkuLabel')"
                  @blur="handleInputConfirm('inputSkuValue', 'inputSkuVisible', 'selectSkuLabel')"
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput('inputSkuVisible', 'skuTagInpt')"
                >+ 添加规格名</el-button>
              </el-form-item>
              <el-form-item
                v-for="(item, index) in selectSkuList"
                :key="item.label"
                :label="item.label"
              >
                <el-tag
                  class="tags"
                  :key="tag"
                  v-for="tag in item.children"
                  closable
                  :disable-transitions="false"
                  @close="handleCloseChildren(tag, index)"
                >{{tag}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="item.inputVisible"
                  v-model="item.inputValue"
                  size="small"
                  @keyup.enter.native="handleInputConfirmChildren(index)"
                  @blur="handleInputConfirmChildren(index)"
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInputChildren(index)"
                >+ 添加规格值</el-button>
              </el-form-item>
            </div>
            <el-divider v-if="generateSkuList.length"></el-divider>
            <div v-if="generateSkuList.length && skuGroup === 'more'">
              <span class="key-value-box">
                <el-checkbox @change="selectAllSku"></el-checkbox>
              </span>
              <el-button type="primary" size="small" @click="showEditBox">批量编辑</el-button>
              <el-button type="danger" size="small" @click="deleteAllSku">批量删除</el-button>
            </div>
						<div v-if="skuGroup === 'more'">
							<div v-for="(item, index) in generateSkuList" class="sku-list">
							  <span class="key-value-box">
							    <el-checkbox v-model="item.checked"></el-checkbox>
							  </span>
							  <span class="key-value-box" v-for="(val, key) in item.skuDesc">
							    <span class="key">{{ key }}</span>:
							    <span class="value">{{ val }}</span>
							  </span>
							  <span class="key-value-box">
							    <span class="key">售价</span>
							    <el-input
							      class="inline-input"
							      type="number"
							      @input="formatChildren('salesPrice', index)"
							      v-model="item.salesPrice"
							    >
                    <template slot="append">元</template>
							    </el-input>
							  </span>
							  <span class="key-value-box">
							    <span class="key">库存</span>
							    <el-input
							      v-model="item.stock"
							      class="inline-input"
							      type="number"
							      @input="formatChildren('stock', index)"
							    >
                    <template slot="append">件</template>
							    </el-input>
							  </span>
							  <span class="key-value-box">
							    <span class="key">成本价</span>
							    <el-input
							      v-model="item.costPrice"
							      class="inline-input"
							      type="number"
							      @input="formatChildren('costPrice', index)"
							    >
                    <template slot="append">元</template>
							    </el-input>
							  </span>
							  <span class="key-value-box" @click="setIndex(index)">
							    <el-upload
							      class="avatar-uploader-small"
							      :http-request="uploadImage_3"
							      :show-file-list="false"
							      action="string"
							    >
							      <img v-if="item.coverImage" :src="item.coverImage" class="avatar-small" />
							      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
							    </el-upload>
							  </span>
							  <span class="key-value-box">
							    <el-button type="danger" size="small" @click="deleteSku(index)">删除</el-button>
							  </span>
							</div>
						</div>
          </el-card>
        </el-col>
        <el-col :span="24">
          <el-card class="box-card" style="margin-top: 1rem">
            <div slot="header" class="clearfix">
              <span class="left-border">商品参数</span>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="商品售价" prop="spu.salesPrice">
                  <el-select
                    v-if="generateSkuList.length"
                    v-model="form.spu.salesPrice"
                    filterable
                    placeholder="请选择售价(元)"
                  >
                    <el-option
                      v-for="item in generateSkuList"
                      :key="item.label"
                      :label="item.label"
                      :value="item.salesPrice"
                    ></el-option>
                  </el-select>
                  <el-input
                    v-else
                    type="number"
                    v-model="form.spu.salesPrice"
                    @input="format('salesPrice')"
                  >
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="邮费" prop="spu.postagePrice">
                  <el-input type="number" v-model="form.spu.postagePrice" @input="getPostagePrice">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="库存" prop="spu.totalStock">
                  <el-input
                    :disabled="!!generateSkuList.length"
                    type="number"
                    v-model="form.spu.totalStock"
                    @input="format('totalStock')"
                  >
                    <template slot="append">件</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="市场价" prop="spu.marketPrice">
                  <el-input
                    type="number"
                    v-model="form.spu.marketPrice"
                    @input="format('marketPrice')"
                  >
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="排序" prop="spu.sort">
                  <el-input-number controls-position="right" type="number" v-model="form.spu.sort" @input="format('sort')" />
                </el-form-item>
                <el-form-item label="获得积分" prop="spu.giveIntegral">
                  <el-input-number controls-position="right"
                    type="number"
                    v-model="form.spu.giveIntegral"
                    @input="format('giveIntegral')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="成本价" prop="spu.costPrice">
                  <el-input type="number" v-model="form.spu.costPrice" @input="format('costPrice')">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="虚拟销量" prop="spu.fictiSales">
                  <el-input
                    type="number"
                    v-model="form.spu.fictiSales"
                    @input="format('fictiSales')"
                  >
                    <template slot="append">件</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="预警库存" prop="spu.warnStock">
                  <el-input type="number" v-model="form.spu.warnStock" @input="format('warnStock')">
                    <template slot="append">件</template>
                  </el-input>
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
                <el-form-item label="上下架" prop="spu.showStatus">
                  <el-radio-group v-model="form.spu.showStatus">
                    <el-radio :label="0">下架</el-radio>
                    <el-radio :label="1">上架</el-radio>
                    <el-radio :label="2">赠品上架</el-radio>
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
    <eForm ref="editForm" />
  </div>
</template>

<script>
import Operation from "./js/operation";
import Property from "./js/property";
import eForm from "./components/edit_sku";
export default {
  mixins: [Operation, Property],
  components: { eForm }
};
</script>

<style lang="scss" scoped src="./scss/index.scss">
</style>
