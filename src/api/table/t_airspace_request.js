import request from '@/utils/request3'
const url = 'db/t_airspace_request?host=192.168.0.240&port=3306&user=root&password=mysql&database=uavcloud'
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

export function delAirSpc(data) {
  return request({
    url,
    headers,
    method: 'put',
    data
  })
}
// 删
export function del(data) {
  return request({
    url,
    headers,
    method: 'delete',
    data
  })
}
export function updateAirSpc(data) {
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
  console.log('select', JSON.parse(JSON.stringify(query)))
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

