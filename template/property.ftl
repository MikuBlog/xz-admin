export default {
	data() {
	  return {
			searchVal: "",
			selectType: "",
			nowPage: 1,
			nowSize: 10,
			totalElements: 0,
      list: [],
			selectList: [],
			<#if betweens??>
				<#list betweens as column>
					<#if column.queryType = 'BetWeen'>
					date_${column_index + 1}: "",
					dateArray_${column_index + 1}: [],
					</#if>
				</#list>
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
	  }
	}
}