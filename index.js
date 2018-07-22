'use strict'

const fs = require('fs')
const path = require('path')

function getKeysFromFile (filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  return content.split('\n').reduce(parseFile, {})
}

function parseFile (acc, cur, index) {
  const [key = `INVALID_KEY_${index}`, value = ''] = cur.split('=')
  acc[key.toUpperCase()] = value
  return acc
}

function env (filename = '.env', otherKeys = {}) {
  const filePath = path.resolve(process.cwd(), filename)

  if (!fs.existsSync(filePath)) {
    return
  }

  const props = Object.assign(process.env, otherKeys, getKeysFromFile(filePath))

  return {
    get: (keys = '', def) => {
      const getByKey = key => props[key.toUpperCase()] || def || false

      if (Array.isArray(keys)) {
        return keys.map(getByKey)
      }

      return getByKey(keys)
    },
    set: (key = '', value = '', overwrite = false) => {
      key = key.toUpperCase()
      if (!props[key]) {
        props[key] = value
        process.env[key] = value
        return true
      } else if (overwrite) {
        props[key] = value
        process.env[key] = value
        return true
      }

      return false
    }
  }
}

module.exports = env
