<template>
  <el-table :data="tableConfig.data" highlight-current-row stripe style="width: 100%">
    <el-table-column type="expand" v-if="tableConfig.expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="请求方法" class="expand-line" v-for="items in tableConfig.expand">
            <span>{{ props.row[items] }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      v-for="items in tableConfig.colums"
      :key="items.prop"
      :label="items.label"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-tag
            v-if="items.isTag"
          >{{ items.beforeText || "" }}{{ scope.row[items.prop] }}{{ items.afterText || "" }}</el-tag>
          <span
            v-else
          >{{ items.beforeText || "" }}{{ scope.row[items.prop] }}{{ items.afterText || "" }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="tableConfig.operation.label">
      <template slot-scope="scope">
        <el-button
          v-for="items in tableConfig.operation.buttons"
          :type="items.type || ''"
          :icon="items.icon || ''"
          :circle="!items.name"
          :title="items.title"
          :disabled="items.disabled"
          @click="items.method ? $emit(items.method, scope.row) : () => {}"
        ><span v-if="items.name">{{ items.name }}</span></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
/**
 * @author xuanzai
 * @description （废弃）
 */
export default {
  name: "data-table",
  props: {
    tableConfig: {
      type: Object,
      default: {}
    }
  }
};
</script>