'use strict'

const fs = require('fs')
const path = require('path')

function parseFile (filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  return content.split('\n').reduce((acc, cur) => {
    const [key = 'INVALID_KEY', value = ''] = cur.split('=')
    acc[key.toUpperCase()] = value
    return acc
  }, {})
}

function env (filename = '.env', otherProps = {}) {
  if (process.env.ENV_FLAG) {
    return
  }

  const filePath = path.resolve(process.cwd(), filename)

  if (!fs.existsSync(filePath)) {
    return
  }

  const props = Object.assign(process.env, otherProps, parseFile(filePath))

  return {
    get: (key = '') => props[key.toUpperCase()] || false,
    set: (key = '', value = '', overwrite = false) => {
      if (!props[key.toUpperCase()]) {
        props[key.toUpperCase()] = value
        process.env[key.toUpperCase()] = value
        return true
      } else if (overwrite) {
        props[key.toUpperCase()] = value
        process.env[key.toUpperCase()] = value
        return true
      }

      return false
    }
  }
}

module.exports = env
