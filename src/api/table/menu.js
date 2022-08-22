import request from '@/utils/request3'
const url = 'db/menu'
const headers = {
  'Content-Type': 'application/json'
}

// 增
export function insertMenu(data) {
  const arr = []
  arr.push(data)
  return request({
    url,
    headers,
    method: 'put',
    data: arr
  })
}

// 逻辑删除
export function deleteMenu(data) {
  return request({
    url,
    headers,
    method: 'put',
    data
  })
}

// 物理删除
export function del(data) {
  return request({
    url,
    headers,
    method: 'delete',
    data
  })
}

// 改
export function updateMenu(data) {
  const arr = []
  arr.push(data)
  return request({
    url,
    headers,
    method: 'put',
    data: arr
  })
}

// 查
export function selectMenu(query) {
  // console.log("select", JSON.parse(JSON.stringify(query)))
  return request({
    url,
    headers,
    method: 'post',
    data: {
      'select': ['*'],
      'orderby': [
        {
          'field': query.field || 'modified_date',
          'order': query.order || 'DESC'
        }
      ],
      'offset': (query.currentPage - 1) * query.pageSize,
      'limit': query.pageSize,
      'where': query.where,
      'having': query.having
    }
  })
}

