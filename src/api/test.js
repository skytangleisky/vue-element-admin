import request from '../utils/request2'

export function renameFile(data) {
  return request({
    url: 'controller/test.php',
    method: 'post',
    data: data
  })
}

export function delFile(data) {
  return request({
    url: 'controller/test.php',
    method: 'post',
    data: Object.keys(data).map(function(key) { return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) }).join('&'),
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
}

export function newFile(form) {
  const data = JSON.parse(JSON.stringify(form))
  console.log(new Map(Object.entries(data)))
  if (data.new === '')data.new = data.placeholder
  data.ajax = 1
  return request({
    url: 'controller/test.php',
    method: 'post',
    data: Object.keys(data).map(function(key) { return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) }).join('&'),
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
}

export function fetchList(query) {
  if (query.sort === '+id') {
    return request({
      url: 'libs/db/src/data.php',
      method: 'post',
      data: {
        'offset': (query.page - 1) * query.limit,
        'limit': query.limit,
        'orderby': [{ 'field': 'id', 'order': 'ASC' }]
      }
    })
  } else if (query.sort === '-id') {
    return request({
      url: 'libs/db/src/data.php',
      method: 'post',
      data: {
        'offset': (query.page - 1) * query.limit,
        'limit': query.limit,
        'orderby': [{ 'field': 'id', 'order': 'DESC' }]
      }
    })
  } else {
    return request({
      url: 'libs/db/src/data.php',
      method: 'post',
      data: {
        'offset': (query.page - 1) * query.limit,
        'limit': query.limit,
        // 'select':['id','product_root','product_image','product_url'],
        'orderby': []
      }
    })
  }
}

export function fetchData(id) {
  return request({
    url: 'libs/db/src/data.php',
    method: 'get',
    params: { id }
  })
}

export function createData(data) {
  return request({
    url: 'libs/db/src/data.php',
    method: 'post',
    data
  })
}

export function updateData(data) {
  return request({
    url: 'libs/db/src/data.php',
    method: 'post',
    data
  })
}

export function deleteData(data) {
  return request({
    url: 'libs/db/src/data.php',
    method: 'delete',
    data
  })
}
