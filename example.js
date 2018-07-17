
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
