
# @tiaanduplessis/env
[![package version](https://img.shields.io/npm/v/@tiaanduplessis/env.svg?style=flat-square)](https://npmjs.org/package/@tiaanduplessis/env)
[![package downloads](https://img.shields.io/npm/dm/@tiaanduplessis/env.svg?style=flat-square)](https://npmjs.org/package/@tiaanduplessis/env)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/@tiaanduplessis/env.svg?style=flat-square)](https://npmjs.org/package/@tiaanduplessis/env)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> Get access to your environment configuration

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#License)

## Install

This project uses [node](https://nodejs.org) and [npm](https://www.npmjs.com). 

```sh
$ npm install @tiaanduplessis/env
$ # OR
$ yarn add @tiaanduplessis/env
```

## Usage

```js

const env = require('@tiaanduplessis/env')()

// Optionally specify a file name (default .env) and additional environment variables
const env2 = require('@tiaanduplessis/env')('.bar', {
    NAME: 'Tiaan',
    SURNAME: 'du Plessis'
})

// in A example .env file:
// FOO=1234
//

console.log(env.get('foo'), env.get('FOO')) // 1234 1234
env.set('foo', 555, true) // Overwrite FOO's value
env.set('foo', 888) // Will not be set, overwrite flag needed
console.log(env.get('foo'), env.get('FOO')) // 555 555

// Get access to variables on process.env
console.log(process.env.HOME, env.get('HOME')) // /Users/tiaan /Users/tiaan

// process.env is extended with variables from .env
// These variables are also updated when set
console.log(process.env.FOO) // 555
env.set('foo', 999, true) 
console.log(process.env.FOO) // 999

```

## Contribute

1. Fork it and create your feature branch: git checkout -b my-new-feature
2. Commit your changes: git commit -am 'Add some feature'
3. Push to the branch: git push origin my-new-feature 
4. Submit a pull request

## License

MIT
    