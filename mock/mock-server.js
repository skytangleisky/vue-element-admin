const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const cookieParser = require('cookie-parser')
const Mock = require('mockjs')

const mockDir = path.join(process.cwd(), 'mock')

function registerRoutes(app) {
  let mockLastIndex
  const { mocks } = require('./index.js')
  const mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
  })
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = Object.keys(mocksForServer).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_MOCK}${url}`),
    type: type || 'get',
    response(req, res) {
      res.req.headers['content-type'] = 'application/json; charset=utf-8'
      console.log('request invoke:' + req.path)
      if (req.path === `${process.env.VUE_APP_BASE_MOCK}/vue-element-admin/routes`) { // tanglei 因为含有@特殊符号且无法使用转义符号正常转义，所以不应该对路由里面的数据进行Mock处理(dev)
        res.json(respond instanceof Function ? respond(req, res) : respond)
      } else {
        res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
      }
    }
  }
}

module.exports = app => {
  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  // app.use(bodyParser.raw())
  // app.use(bodyParser.text())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(cookieParser())

  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex

  // watch files, hot reload mock server
  chokidar.watch(mockDir, {
    ignored: /mock-server/,
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        // remove mock routes stack
        app._router.stack.splice(mockStartIndex, mockRoutesLength)

        // clear routes cache
        unregisterRoutes()

        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
      } catch (error) {
        console.log(chalk.redBright(error))
      }
    }
  })
}
