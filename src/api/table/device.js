import request from '@/utils/request3'
const url = 'db/device'
const headers = {
  'Content-Type': 'application/json'
}

// 增
export function insert(data) {
  const arr = []
  arr.push(data)
  return request({
    url,
    headers,
    method: 'put',
    data: arr
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
export function update(data) {
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
export function select(query) {
  // console.log("select", JSON.parse(JSON.stringify(query)))
  return request({
    url,
    headers,
    method: 'post',
    data: {
      'select': query.select || ['*'],
      'orderby': [
        {
          'field': query.field || 'id',
          'order': query.order || 'ASC'
        }
      ],
      'offset': (query.currentPage - 1) * query.pageSize,
      'limit': query.pageSize,
      'where': query.where,
      'having': query.having
    }
  })
}

