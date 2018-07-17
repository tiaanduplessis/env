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
    get: (key = '', def) => props[key.toUpperCase()] || def || false,
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
