import React from 'react'
import renderer from 'react-test-renderer'

import Trans from '../src'
import withProvide from '../src/Provider'

import getTrans from '../translations'

describe('<Translate />', () => {

  it('Should render', () => {
    const tree = renderer.create(<Trans />)
  })

  it('Should render what with children', () => {
    const tree = renderer.create(<Trans>name</Trans>)
    expect(tree.toJSON()).toEqual('name')
  })

  it('Should render with `text` prop', () => {
    const tree = renderer.create(<Trans text="name" />)
    expect(tree.toJSON()).toEqual('name')
  })

  it('Should render default translation in Finnish', () => {
    const Wrapper = () => (
      <div>
        <Trans text="name" />
      </div>
    )
    const Component = withProvide(getTrans('fi'))(Wrapper)
    const tree = renderer.create(<Component />)
    expect(tree.toJSON().children[0]).toEqual('nimi')
  })

  it('Should render default context', () => {
    const Wrapper = () => (
      <div>
        <Trans text="name" />
      </div>
    )

  })

  it('Should render default singe and multi', () => {

  })
})
