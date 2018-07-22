const env = require('./')

test('should be defined', () => {
  expect(env).toBeDefined()
})

test('should and set environmental variables', () => {
  const t = env('testenv')
  expect(t.get('foo')).toBe('1234')
  expect(t.get('bar')).toBe('baz')
  expect(t.get(['foo', 'bar'])).toEqual(['1234', 'baz'])
})

test('should have access to variables on process.env', () => {
  const t = env('testenv')
  expect(t.get('home')).toBeDefined()
})
