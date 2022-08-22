import request from '@/utils/request3'
const url = 'db/t_file?host=192.168.0.240&port=3306&user=root&password=mysql&database=uavcloud'
const headers = {
  'Content-Type': 'application/json'
}

// data:Object类型
export function insertFile(data) {
  const arr = []
  arr.push(data)
  return request({
    url,
    headers,
    method: 'put',
    data: arr
  })
}

export function updateFile(data) {
  const arr = []
  arr.push(data)
  return request({
    url,
    headers,
    method: 'put',
    data: arr
  })
}

// 删
export function delFile(data) {
  return request({
    url,
    headers,
    method: 'delete',
    data
  })
}

// 查
export function selectFile(query) {
  return request({
    url,
    headers,
    method: 'post',
    data: {
      'select': ['*'],
      'where': query.where
    }
  })
}
