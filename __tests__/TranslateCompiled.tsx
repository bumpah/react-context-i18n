import React from 'react'
import renderer from 'react-test-renderer'

import Trans from '../src/Consumer'
import withProvide from '../src/Provider'

import compiler from '../src/Compile'
import getTrans from '../translations'

const dic = [
  { file: '../translations/fi.json' },
  { file: '../translations/fi-pay.json', context: 'pay' },
]
const dicJson = [
  { json: getTrans('fi').default },
  { json: getTrans('fi-pay'), context: 'pay' },
]
const dics = [
  { json: getTrans('fi').default },
  { json: getTrans('fi-pay'), context: 'pay' },
  { json: { name: 'dink aboud id' } },
]

describe('<Translate />', () => {
  it('Should inject variables as object as well in context', () => {
    const json = compiler(dicJson)
    const Wrapper = () => (
      <div>
        <Trans text="name ${username}" vars={{ username: 'mikko' }} />
      </div>
    )
    const Component = withProvide(json)(Wrapper)
    const tree = renderer.create(<Component />)

    expect(tree.toJSON().children).toContain('nimi mikko')
  })

  it('Should return first of two non-contextual dics', () => {
    const json = compiler(dics)
    expect(Object.keys(json)).toEqual(['default', 'pay'])
  })

  it('Should return empty Object', () => {
    expect(compiler([{ hahah: 'get fuckered' }])).toEqual({})
    expect(compiler([{
      file: undefined,
      json: undefined,
      context: 'kurwa',
    }])).toEqual({})
  })
})
