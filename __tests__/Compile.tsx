import React from 'react'
import renderer from 'react-test-renderer'

import compiler from '../src/Compile'
import getTrans from '../translations'

const dic = [
  { file: '../translations/fi.json'},
  { file: '../translations/fi-pay.json', context: 'pay'},
]
const dicJson = [
  { json: getTrans('fi')},
  { json: getTrans('fi-pay'), context: 'pay'},
]
describe('<Compile />', () => {

  it('Should return dictionary', () => {
    const resp = compiler(dic)
    expect(Object.keys(resp)).toContain('default')
    expect(Object.keys(resp)).toContain('pay')
    expect(Object.keys(resp).length).toBe(2)
  })

  it('Should return dictionary from provided json', () => {
    const resp = compiler(dicJson)

    expect(Object.keys(resp)).toContain('default')
    expect(Object.keys(resp)).toContain('pay')
    expect(Object.keys(resp).length).toBe(2)
  })
})
