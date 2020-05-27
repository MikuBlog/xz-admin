<template>
  <div class="article-list">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="left-border">添加模板</span>
          </div>
          <div class="button-box">
            <el-button type="primary" size="small" @click="submitForm">确认</el-button>
            <el-button type="info" size="small" @click="resetForm">重置</el-button>
            <el-button size="small" @click="$router.back()">返回</el-button>
          </div>
          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="模板名称" prop="name">
                  <el-input v-model="form.name" style="width: 200px" maxlength="20"
                  show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="包装费用" prop="packagePrice">
                  <el-input-number style="width: 200px" :min="0" :max="10000" v-model="form.packagePrice" controls-position="right" />
                </el-form-item>
                <el-form-item label="快递收费方式" prop="freightType">
                  <el-radio-group v-model="form.freightType">
                    <el-radio :label="0">按件收费</el-radio>
                    <el-radio :label="1">按重量收费</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="默认运费">
                  <el-table ref="table" :data="defaultData" border>
                    <el-table-column prop="address" :label="`${form.freightType
                    ? '首重(KG)'
                    : '首件(个)'}`">
                      <template slot-scope="scope">
                        <el-input-number controls-position="right" :min="0" v-model="scope.row.start" />
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="运费(元)">
                      <template slot-scope="scope">
                        <el-input-number controls-position="right" :min="0" v-model="scope.row.startFee" />
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" :label="`${form.freightType
                    ? '续重(KG)'
                    : '续件(个)'}`">
                      <template slot-scope="scope">
                        <el-input-number controls-position="right" :min="0" v-model="scope.row.addCount" />
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="运费(元)">
                      <template slot-scope="scope">
                        <el-input-number controls-position="right" :min="0" v-model="scope.row.addFee" />
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="按件包邮">
                      <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.isFreeByNumber"
                        @change="changeSwicth('isFreeByNumber', 'freeByNumber')"
                        v-if="!scope.row.freeByNumber"></el-switch>
                        <el-input-number v-if="scope.row.freeByNumber"
                        @change="changeVal('freeByNumber', 'isFreeByNumber')" controls-position="right" :min="0" v-model="scope.row.freeByNumber" />
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="按金额包邮">
                      <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.isFreeByMoney"
                        @change="changeSwicth('isFreeByMoney', 'freeByMoney')"
                        v-if="!scope.row.freeByMoney"></el-switch>
                        <el-input-number v-if="scope.row.freeByMoney" @change="changeVal('freeByMoney', 'isFreeByMoney')" controls-position="right" :min="0" v-model="scope.row.freeByMoney" />
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="指定区域运费">
                  <el-table ref="table" :data="addressTable" border>
                    <el-table-column prop="address" label="运送到" width="200">
                      <template slot-scope="scope">
                        {{ scope.row.areaList.join(" | ") }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" :label="`${form.freightType
                    ? '首重(KG)'
                    : '首件(个)'}`">
                      <template slot-scope="scope">
                        <el-input-number controls-position="right" :min="0" v-model="scope.row.start" />
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="运费(元)">
                      <template slot-scope="scope">
                        <el-input-number controls-position="right" :min="0" v-model="scope.row.startFee" />
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" :label="`${form.freightType
                    ? '续重(KG)'
                    : '续件(个)'}`">
                      <template slot-scope="scope">
                        <el-input-number controls-position="right" :min="0" v-model="scope.row.addCount" />
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="运费(元)">
                      <template slot-scope="scope">
                        <el-input-number controls-position="right" :min="0" v-model="scope.row.addFee" />
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="按件包邮">
                      <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.isFreeByNumber"
                        @change="changeAddressSwicth('isFreeByNumber', 'freeByNumber', scope.$index)"
                        v-if="!scope.row.freeByNumber"></el-switch>
                        <el-input-number v-if="scope.row.freeByNumber"
                        @change="changeAddressVal('freeByNumber', 'isFreeByNumber', scope.$index)" controls-position="right" :min="0" v-model="scope.row.freeByNumber" />
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="按金额包邮">
                      <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.isFreeByMoney"
                        @change="changeAddressSwicth('isFreeByMoney', 'freeByMoney', scope.$index)"
                        v-if="!scope.row.freeByMoney"></el-switch>
                        <el-input-number v-if="scope.row.freeByMoney" @change="changeAddressVal('freeByMoney', 'isFreeByMoney', scope.$index)" controls-position="right" :min="0" v-model="scope.row.freeByMoney" />
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" align="center" width="180">
                      <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showEditBox(scope.$index, scope.row)">编辑区域</el-button>
                        <el-button type="text" size="small" @click="removeItem(scope.$index)">移除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div>
                    <el-button type="text" @click="addItem">+ 添加指定地区运费</el-button>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <Address ref="addressBox" />
  </div>
</template>

<script>
import Address from './components/address'
import Operation from "./js/operation";
import Property from "./js/property";
export default {
  mixins: [Operation, Property],
  components: { Address }
};
</script>

<style lang="scss" scoped src="./scss/index.scss">
</style>
