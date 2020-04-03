export default {
	data() {
	  return {
			searchVal: "",
			selectType: "",
			nowPage: 1,
			nowSize: 10,
			totalElements: 0,
			selectList: [],
			<#if betweens??>
			date: "",
			dateArray: [],
			</#if>
			queryTypeOptions: [
			  <#if queryColumns??>
			  <#list queryColumns as column>
			  <#if column.queryType != 'BetWeen'>
			  { key: '${column.changeColumnName}', display_name: '<#if column.remark != ''>${column.remark}<#else>${column.changeColumnName}</#if>' }<#if column_has_next>,</#if>
			  </#if>
			  </#list>
			  </#if>
			]
			</#if>
	  }
	}
}