<template>
  <div class="menu-manage">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card">
          <div class="search">
            <el-row :gutter="10">
              <el-input
                v-model="searchVal"
                placeholder="搜索商品分类名称"
                class="search-input margin-box"
                @keyup.native="searchEnter"
              ></el-input>
              <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
              <el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
              <el-button
                type="primary"
                icon="el-icon-plus"
                class="margin-box"
                @click="showAddBox"
                title="添加商品分类"
                circle
              ></el-button>
<!-- 							<el-button
							  type="warning"
							  icon="el-icon-download"
							  class="margin-box"
							  @click="downloadList"
							  title="导出商品分类列表"
							  circle
							></el-button> -->
							<el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAllGoodsType" :disabled="!selectList.length" title="批量删除商品分类" circle></el-button>
            </el-row>
          </div>
          <el-table
						ref="table"
            :data="goodsTypeList"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            v-if="isShow"
            :default-expand-all="expand"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            @selection-change="handleSelectionChange" 
						:row-key="getRowKey" 
						highlight-current-row stripe
            stripe
          >
						<el-table-column type="selection" width="55" reserve-selection />
            <el-table-column prop="name" label="名称" :render-header="renderHeader"></el-table-column>
            <el-table-column ref="table" :show-overflow-tooltip="true" prop="url" label="缩略图" align="center">
            	<template slot-scope="scope">
            		<img :src="scope.row.imageUrl || 'https://myinterface.xuanzai.top/getPicture?type=error'" alt="点击打开" class="el-avatar xz-image" @click="(isShowPic = true), (url = scope.row.imageUrl)" />
            	</template>
            </el-table-column>
						<el-table-column prop="enabled" label="是否显示" align="center" width="80px">
              <template slot-scope="scope">
                <el-tag
                  effect="dark"
                  :type="scope.row.isShow ? 'success' : 'info'"
                >{{scope.row.isShow ? '是' : '否'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="sort" align="center" label="排序">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.sort }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" @click="showEditBox(scope.row)" />
                <el-button
                  slot="reference"
                  type="danger"
                  @click="deleteGoodsType(scope.row)"
                  icon="el-icon-delete"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <operation-box 
    :options="buttonOptions"
    @showAddBox="showAddBox"
		@downloadList="downloadList"
		@deleteAllGoodsType="deleteAllGoodsType"/>
		<ImagePreview :show-modal.sync="isShowPic" :url="url" />
    <eForm ref="form" />
  </div>
</template>

<script>
import Initial from "./js/initial";
import Operation from "./js/operation";
import Property from "./js/property";
import eForm from "./components/form";
export default {
  mixins: [Initial, Operation, Property],
  components: { eForm }
};
</script>

