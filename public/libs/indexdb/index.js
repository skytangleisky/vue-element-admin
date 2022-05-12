
// 先定义数据库数据
const Salt = {
  name: 'myIndexDb',
  version: 1,
  db: null,
  table: 'myIndexDbTable',
  business: 'unity'// 业务名称
}
/**
 * 增加或更新indexDB字段的值
 * @param {*} key 传递过来的键（在存储的时候）
 * @param {*} val 传递过来的值（在存储的时候）
 * @param {*} back 回调函数
 * @param {*} value 整个数据，需要更新的，是更新的值
 */

var INDEXDB = {
  openDB(name, version, table, callback) {
    var request = window.indexedDB.open(name, version)
    request.onerror = function(e) {
      console.log(e.currentTarget.error.message)
    }
    request.onsuccess = function(e) {
      Salt.db = e.target.result
      if (callback && (typeof callback === 'function')) {
        callback(Salt.db)
      }
    }
    request.onupgradeneeded = function(e) {
      var db = e.target.result
      if (!db.objectStoreNames.contains(table)) {
        db.createObjectStore(table, {
          keyPath: 'id'
        })
      }
    }
  },
  setItem(key, val) {
    INDEXDB.openDB(Salt.name, Salt.version, Salt.table, function() {
      try {
        var addData = [{
          id: key,
          value: val
        }]
        var transaction = Salt.db.transaction(Salt.table, 'readwrite')
        var store = transaction.objectStore(Salt.table)
        for (var i = 0; i < addData.length; i++) {
          store.add(addData[i])
        }
        INDEXDB.closeDB()
      } catch (error) {
        console.log(error)
      }
    })
  },
  getItem: function(val, back) {
    INDEXDB.openDB(Salt.name, Salt.version, Salt.table, function() {
      var transaction = Salt.db.transaction(Salt.table, 'readwrite')
      var store = transaction.objectStore(Salt.table)
      var request = store.get(val)
      request.onsuccess = function(e) {
        if (back && (typeof back === 'function')) {
          if (e.target.result) {
            back(e.target.result.value)
          } else {
            back('')
          }
          INDEXDB.closeDB()
        }
      }
    })
  },
  putItem(key, value) {
    INDEXDB.openDB(Salt.name, Salt.version, Salt.table, function() {
      var transaction = Salt.db.transaction(Salt.table, 'readwrite')
      var store = transaction.objectStore(Salt.table)
      var request = store.get(key)
      request.onsuccess = function(e) {
        try {
          var resultData = e.target.result
          resultData.value = value
          var resultInfo = store.put(resultData)
          resultInfo.onsuccess = function(e) {
            if (e.type === 'success') {
              INDEXDB.closeDB()
            }
          }
        } catch (error) {
          INDEXDB.setItem(key, value)
        }
      }
    })
  },
  deleteItem(key) {
    INDEXDB.openDB(Salt.name, Salt.version, Salt.table, function() {
      var transaction = Salt.db.transaction(Salt.table, 'readwrite')
      var store = transaction.objectStore(Salt.table)
      var result = store.delete(key)
      result.onsuccess = function(e) {
        if (e.type === 'success') {
          INDEXDB.closeDB()
        }
      }
    })
  },
  clearTable() {
    INDEXDB.openDB(Salt.name, Salt.version, Salt.table, function() {
      var transaction = Salt.db.transaction(Salt.table, 'readwrite')
      var store = transaction.objectStore(Salt.table)
      var result = store.clear()
      result.onsuccess = function(e) {
        if (e.type === 'success') {
          INDEXDB.closeDB()
        }
      }
    })
  },
  closeDB() {
    // console.log(Salt);
    Salt.db.close()
  }
}
// 初始化数据库
INDEXDB.openDB(Salt.name, Salt.version, Salt.table)

// // 存储数据
// INDEXDB.setItem('data', 'insertData');
// // // 取出数据
// INDEXDB.getItem('data', (res) => {
//     console.log(res);
// });
// //删除数据
// INDEXDB.deleteItem('data');
// //修改数据
// INDEXDB.putItem('data','newData')
// // 清空数据表
// INDEXDB.clearTable();

INDEXDB.UserInfo = {
  getUser: function(ur) {
    return new Promise((resolve, reject) => { // 防止嵌套过多。
      INDEXDB.getItem(Salt.business, function(val) {
        const unity = JSON.parse(val === '' ? '{}' : val)
        unity.users = (unity.users === undefined) ? [] : unity.users
        let user
        for (const i in unity.users) { // 本系统支持多个账号独立登录
          if ('usr' in ur && unity.users[i].usr === ur.usr) {
            user = unity.users[i]// 得到之前用户保存的和用户相关的所有数据
          } else if ('sessionid' in ur && unity.users[i].sessionid === ur.sessionid) {
            user = unity.users[i]
          }
        }
        if (user === undefined) {
          for (const i in unity.users) {
            if (!('usr' in ur) && !('usr' in unity.users[i])) { // 游客方式浏览
              user = unity.users[i]
            }
          }
        }
        if (user === undefined) { // 浏览器没有用户相关数据时，为用户配置相关数据
          user = {}
          user.usr = ur.usr
          user.expandStatus = {}
          unity.users.push(user)
          INDEXDB.putItem(Salt.business, JSON.stringify(unity))
        }
        resolve(user)
      })
    })
  },
  putUser: function(ur) {
    return new Promise((resolve, reject) => { // 防止嵌套过多。
      INDEXDB.getItem(Salt.business, function(val) {
        const unity = JSON.parse(val === '' ? '{}' : val)
        unity.users = (unity.users === undefined) ? [] : unity.users
        let user
        for (const i in unity.users) {
          if (unity.users[i].usr === ur.usr) {
            user = unity.users[i]
          }
        }
        if (user === undefined) { // 浏览器没有用户相关数据时，为用户配置相关数据
          user = {}
          user.usr = ur.usr
          user.expandStatus = {}
          unity.users.push(user)
        }
        for (const k in ur) {
          user[k] = ur[k]
        }
        INDEXDB.putItem(Salt.business, JSON.stringify(unity))
        resolve(user)
      })
    })
  }
}
window.INDEXDB = INDEXDB
