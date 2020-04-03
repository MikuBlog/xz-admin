<#--noinspection ALL-->
<template>
		<el-card>
			<div slot="header">
				<span>${tableComment}列表</span>
			</div>
    <#if hasQuery>
				<div class="search">
					<!-- 搜索 -->
					<el-input v-model="searchVal" clearable placeholder="输入搜索内容" class="search-input margin-box" @keyup.enter.native="search" />
					<el-select v-model="selectType" clearable placeholder="类型" class="select-input margin-box" style="width: 7rem">
						<el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
					</el-select>
					<#if betweens??>
						<#list betweens as column>
							<#if column.queryType = 'BetWeen'>
								<el-date-picker
									v-model="query.${column.changeColumnName}"
									:default-time="['00:00:00','23:59:59']"
									type="datetime"
									value-format="yyyy-MM-dd HH:mm:ss"
									start-placeholder="开始时间"
									end-placeholder="结束时间"
								/>
							</#if>
						</#list>
					</#if>
					<el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
					<el-button
						type="primary"
						icon="el-icon-plus"
						class="margin-box"
						@click="showAddUser"
						title="添加${tableComment}"
						circle
					></el-button>
					<el-button
						type="danger"
						icon="el-icon-delete"
						class="margin-box"
						@click="deleteAll"
						:disabled="!selectList.length"
						title="批量删除${tableComment}"
						circle
					></el-button>
					<el-button
						type="warning"
						icon="el-icon-download"
						class="margin-box"
						@click="downList"
						title="导出${tableComment}"
						circle
					></el-button>
				</div>
    </#if>
      <!--表格渲染-->
      <el-table 
			ref="table" 
			:data="list" 
			style="width: 100%;" 
			highlight-current-row
			@selection-change="handleSelectionChange"
      :row-key="getRowKey"
			stripe>
        <el-table-column type="selection" width="55" />
        <#if columns??>
            <#list columns as column>
            <#if column.columnShow>
          <#if column.dictName??>
        <el-table-column v-if="columns.visible('${column.changeColumnName}')" prop="${column.changeColumnName}" label="<#if column.remark != ''>${column.remark}<#else>${column.changeColumnName}</#if>">
          <template slot-scope="scope">
            {{ dict.label.${column.dictName}[scope.row.${column.changeColumnName}] }}
          </template>
        </el-table-column>
          <#elseif column.columnType != 'Timestamp'>
        <el-table-column v-if="columns.visible('${column.changeColumnName}')" prop="${column.changeColumnName}" label="<#if column.remark != ''>${column.remark}<#else>${column.changeColumnName}</#if>" />
                <#else>
        <el-table-column v-if="columns.visible('${column.changeColumnName}')" prop="${column.changeColumnName}" label="<#if column.remark != ''>${column.remark}<#else>${column.changeColumnName}</#if>">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.${column.changeColumnName}) }}</span>
          </template>
        </el-table-column>
                </#if>
            </#if>
            </#list>
        </#if>
        <el-table-column width="180" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deleteItem(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
			<pagination
			  ref="pagination"
			  :get-data="getList"
			  :now-page.sync="nowPage"
			  :now-size.sync="nowSize"
			  :total="totalElements"
			/>
  </el-card>
</template>

<script>
import Operation from './js/operation'
import Property from './js/property'
import eForm from './components/form'
// crud交由presenter持有
export default {
  name: '${className}',
  mixins: [ Operation, Property],
	components: { eForm }
}
</script>

<style lang="scss" src="./scss/index.scss" scoped></style>
