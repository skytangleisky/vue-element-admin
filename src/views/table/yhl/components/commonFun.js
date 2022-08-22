/**
 * 条件搜索
 * @param {搜索内容} val
 * @param {“全部”选项对应的值} allVal
 * @param {搜索字段} field
 * @param {当前搜索条件} listQuery
 * @returns 新的查询条件
 */
export function searchByCondition(val, allVal, field, listQuery) {
  const searchData = {
    relation: 'AND',
    field: field,
    relationship: '=',
    condition: val
  }
  if (listQuery.where.length === 1) {
    if (val === allVal) {
      return listQuery
    } else {
      listQuery.where.push(searchData)
      return listQuery
    }
  } else {
    if (val === allVal) {
      let flag = true
      listQuery.where.forEach((item, index) => {
        if (item.field === field) {
          listQuery.where.splice(index, 1)
          return listQuery
        } else {
          flag = false
        }
      })
      if (!flag) {
        return listQuery
      }
    } else {
      let flag = true
      listQuery.where.forEach(item => {
        if (item.field === field) {
          item.condition = val
          flag = true
        } else {
          flag = false
        }
      })
      if (!flag) {
        listQuery.where.push(searchData)
      }
      return listQuery
    }
  }
}

/**
 * 模糊搜索
 * @param {搜索内容} val
 * @param {当前查询条件} listQuery
 * @param {模糊搜索匹配的字段集合} searchContent
 * @returns 新的查询条件
 */
export function fuzzySearch(val, listQuery, searchContent) {
  if (val === '') {
    listQuery.having = []
  } else {
    searchContent.forEach(item => {
      item.condition = '%' + val + '%'
    })
    listQuery.having = searchContent
  }
  listQuery.currentPage = 1
  return listQuery
}

/**
 * 分页
 * @param {分页子组件传递的参数} vals
 * @param {当前查询条件} listQuery
 * @returns 新的查询条件
 */
export function getPageParam(vals, listQuery) {
  listQuery.currentPage = vals.currentPage
  listQuery.pageSize = vals.pageSize
  return listQuery
}

/**
 * 排序
 * @param {表格子组件传递的排序参数} vals
 * @param {当前查询条件} listQuery
 * @returns 新的查询条件
 */
export function tableSort(vals, listQuery) {
  listQuery.field = vals.field
  listQuery.order = vals.order
  return listQuery
}

/**
 * 封装查询接口
 * @param {当前查询条件} listQuery
 * @param {查询接口} selFun
 * @returns 查询结果
 */
export async function getTableData(listQuery, selFun) {
  const res = await selFun(listQuery)
  const selResults = {
    tableData: res.data.results,
    total: res.data.total
  }
  return selResults
}
