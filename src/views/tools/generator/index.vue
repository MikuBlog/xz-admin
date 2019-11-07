<template>
  <div class="generator-code">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="search">
            <el-input
              v-model="searchVal"
              placeholder="请按表名进行搜索"
              class="search-input margin-box"
              @keyup.native="searchEnter"
            ></el-input>
            <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
          </div>
          <el-table :data="generateCodeList" :highlight-current-row="true" style="width: 100%" :stripe="true">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="备注" class="expand-line">
                    <span>{{ props.row.remark ? props.row.remark : "无" }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="表名" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.tableName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="数据库引擎" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference">{{ scope.row.engine }}</div>
              </template>
            </el-table-column>
            <el-table-column label="字符编码集" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference">{{ scope.row.coding }}</div>
              </template>
            </el-table-column>
            <el-table-column label="创建日期" width="180">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
              </template>
            </el-table-column>
            <el-table-column 
            label="操作" 
            width="130px" 
            align="center" 
            fixed="right">
                  <template slot-scope="scope">
                    <el-button
                      slot="reference"
                      type="primary"
                      icon="el-icon-magic-stick"
                      size="small"
                      @click="showGeneratorCodeBox(scope.row)"
                    >生成代码</el-button>
                  </template>
                </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 25, 50, 100]"
              :page-size.sync="nowSize"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalElements"
            ></el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <GeneratorBox ref="form" />
  </div>
</template>

<script>
import GeneratorBox from './components/form'
export default {
  components: { GeneratorBox },
  data() {
    return {
      searchVal: "",
      generateCodeList: [],
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      options: [
        {
          value: "username",
          label: "用户名"
        },
        {
          value: "description",
          label: "描述"
        }
      ]
    };
  },
  created() {
    // 初始化页面数据
    this.getGenerateCodeList();
  },
  methods: {
    // 弹窗
    showGeneratorCodeBox(item) {
      const generatorBox = this.$refs.form
      generatorBox.dialog = true
      generatorBox.form.remark = item.remark
      generatorBox.getFormMsg()
      generatorBox.getTableList(item.tableName)
    },
    // 点击搜索
    search() {
      this.nowPage = 1;
      this.getGenerateCodeList()
    },
    // 回车搜索
    searchEnter(e) {
      this.nowPage = 1;
      e.keyCode === 13
      && this.getGenerateCodeList()
    },
    // 条数变化
    handleSizeChange(size) {
      this.nowSize = size;
      this.getGenerateCodeList();
    },
    // 页数变化
    handleCurrentChange(page) {
      this.nowPage = page;
      this.getGenerateCodeList();
    },
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化操作日志列表
    initialGenerateCodeList(list) {
      this.generateCodeList.splice(0);
      list.forEach(value => {
        this.generateCodeList.push(value);
      });
    },
    // 获取操作日志信息
    getGenerateCodeList() {
      this.$http_normal({
        url: `/api/generator/tables?page=${this.nowPage - 1}&size=${
          this.nowSize
        }&sort=createTime,desc${
          this.searchVal ? `&name=${this.searchVal}` : ""
        }`,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialGenerateCodeList(data.content);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
