import importHTML from 'import-html-entry'
import urlParse from 'url'

const cache = {}
const loading = {}

const getDomain = (url) => {
  let domain = ''
  let path = url
  if (url.indexOf('://') > -1) {
    const u = urlParse.parse(url)
    domain = u.protocol + '//' + u.host
    path = u.path
  }
  if (!path.endsWith('/')) {
    const index = path.lastIndexOf('/')
    if (index > -1 && path.startsWith('/')) {
      path = path.substr(0, index + 1)
    }
  }
  return domain + path
}

const fetch = async(url) => {
  let result
  if (url.endsWith('.js')) {
    const pos = url.lastIndexOf('/')
    const filename = url.substr(pos + 1)
    result = await window.fetch(url)
    let text = await result.text()
    text = text.replace(`sourceMappingURL=${filename}.map`, `sourceMappingURL=${url}.map`)
    result.text = () => {
      return text
    }
  } else {
    result = window.fetch(url)
  }
  return result
}

export const importResource = (location, options = {}) => {
  return new Promise((resolve, reject) => {
    // 如果 location 不带schema 则使用 window.location.href 进行合成
    if (location.indexOf('://') === -1) {
      location = urlParse.resolve(window.location.href, location)
    }
    const resource = cache[location]
    if (resource) {
      if (options.callback) {
        try {
          options.callback(resource)
        } catch (err) {
          reject(err)
          return
        }
      }
      resolve(resource.props)
      return
    }
    if (loading[location] === undefined) {
      loading[location] = []
      const opts = {
        getDomain
      }
      // sourcemap 用于控制是否替换 sourcemap 路径
      if (options.sourcemap) {
        opts.fetch = fetch
      }
      importHTML(location, opts).then(async res => {
        res.execScripts(window).then(result => {
          const props = result.default ? result.default : result
          cache[location] = {
            template: res.template,
            assetPublicPath: res.assetPublicPath,
            props
          }
          if (options.callback) options.callback(cache[location])
          resolve(props)
          setTimeout(() => {
            if (loading[location].length > 0) {
              for (const f of loading[location]) {
                f(props)
              }
            }
          }, 0)
        }).catch(err => {
          reject(err)
        })
      }).catch(err => {
        reject(err)
      })
    } else {
      const callback = (m) => {
        resolve(m)
      }
      loading[location].push(callback)
    }
  })
}

export const remoteImport = async(location, name, options) => {
  const module = await importResource(location, options)
  if (name) {
    const m = module[name]
    if (!m) {
      throw new Error(`No component named ${name} founded in component ${location}`)
    }
    return module[name]
  } else {
    return module
  }
}
export default remoteImport
