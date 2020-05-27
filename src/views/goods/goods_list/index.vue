<template>
  <div class="article-list">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="全部商品" name="null"></el-tab-pane>
            <el-tab-pane label="上架" name="showStatus 1"></el-tab-pane>
            <el-tab-pane label="热卖单品" name="onHot true"></el-tab-pane>
            <el-tab-pane label="促销单品" name="onBenefit true"></el-tab-pane>
            <el-tab-pane label="新品首发" name="onNew true"></el-tab-pane>
            <el-tab-pane label="优品推荐" name="onRecommend true"></el-tab-pane>
            <el-tab-pane label="精品推荐" name="onBest true"></el-tab-pane>
            <el-tab-pane label="下架" name="showStatus 0"></el-tab-pane>
          </el-tabs>
          <div class="search">
            <el-input
              v-model="name"
              placeholder="搜索关键词"
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
              class="margin-box"
              icon="el-icon-plus"
              @click="toAddGoodsPage"
              title="添加商品"
              circle
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              class="margin-box"
              @click="deleteAllGoods"
              :disabled="!selectList.length"
              title="批量删除商品"
              circle
            ></el-button>
          </div>
          <el-table
            ref="table"
            :max-height="$store.state.tableHeight.tableHeight"
            :data="goodsList"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
            :row-key="getRowKey"
            highlight-current-row
            stripe
          >
            <el-table-column type="selection" width="55" reserve-selection />
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="商品分类" class="expand-line">
                        <span>
                          {{
                          props.row.typeName.typeName && props.row.typeName.typeName.join(" | ")
                          }}
                        </span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="关键词" class="expand-line">
                        <span>
                          {{
                          props.row.keyWords.replace(/^,/, '').replace(/,$/, '').split(",").join(" | ")
                          }}
                        </span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="库存扣减" class="expand-line">
                        <el-tag
                          :type="props.row.stockReduceType === 0 ? 'primary' : props.row.stockReduceType === 1 ? 'success' : 'warning'"
                        >{{ props.row.stockReduceType === 0 ? '拍下减库存' : props.row.stockReduceType === 1 ? '付款减库存' : '永不减库存' }}</el-tag>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                    </el-col>
                  </el-row>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column ref="table" prop="url" label="商品图片" align="center" width="150">
              <template slot-scope="scope">
                <img
                  :src="scope.row.coverImage || 'https://myinterface.xuanzai.top/getPicture?type=error'"
                  alt="点击打开"
                  @click="(isShow = true), (url = scope.row.coverImage)"
                  width="100"
                  height="100"
                />
              </template>
            </el-table-column>
            <el-table-column prop="num" label="商品编号" :show-overflow-tooltip="true" />
            <el-table-column prop="name" label="商品名称" :show-overflow-tooltip="true" width="140">
              <template slot-scope="scope">
                <div class="name-wrapper">{{ scope.row.name }}</div>
                <div class="name-wrapper">品牌：{{ scope.row.brandName || "无" }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="价格/货号" :show-overflow-tooltip="true" width="140">
              <template slot-scope="scope">
                <div class="name-wrapper">售价：￥{{ scope.row.salesPrice }}</div>
                <div class="name-wrapper">商品编码：{{ scope.row.barCode || "无" }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="totalSales"
              label="销量"
              :show-overflow-tooltip="true"
              align="center"
            />
            <el-table-column
              prop="totalStock"
              label="库存"
              :show-overflow-tooltip="true"
              align="center"
            />
            <el-table-column label="排序" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag type="primary">{{ scope.row.sort }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag
                    :type="scope.row.showStatus === 0 
									? 'info' 
									: scope.row.showStatus === 1
									? 'primary'
									: 'success'"
                  >
                    {{ scope.row.showStatus === 0
                    ? '下架'
                    : scope.row.showStatus === 1
                    ? '上架'
                    : '赠品上架' }}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="创建日期" width="180">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="150">
              <template slot-scope="scope">
                <el-dropdown split-button type="primary" trigger="click">
                  操作
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="showSkuList(scope.row)">
                      <el-button type="text">商品属性</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="toEditGoodsPage(scope.row)">
                      <el-button type="text">编辑商品</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click.native="changeStatus(scope.row, scope.row.showStatus
                    ? 0
                    : 1)"
                    >
                      <el-button type="text">
                        商品{{ scope.row.showStatus
                        ? '下架'
                        : '上架' }}
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="deleteGoods(scope.row)">
                      <el-button type="text">删除商品</el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            ref="pagination"
            :get-data="getGoodsList"
            :now-page.sync="nowPage"
            :now-size.sync="nowSize"
            :total="totalElements"
          />
        </el-card>
      </el-col>
    </el-row>
    <ImagePreview :show-modal.sync="isShow" :url="url" />
    <SkuList ref="skuList" />
  </div>
</template>

<script>
import Operation from "./js/operation";
import Property from "./js/property";
import SkuList from "./components/sku_list";
export default {
  components: { SkuList },
  mixins: [Operation, Property]
};
</script>

<style lang="scss" scoped src="./scss/index.scss"></style>
