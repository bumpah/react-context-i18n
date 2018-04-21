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

  it('Should render contextual translation', () => {
    const Wrapper = () => (
      <div>
        <Trans text="name" context="reservation" />
      </div>
    )
    const Component = withProvide(getTrans('fi'))(Wrapper)
    const tree = renderer.create(<Component />)
    expect(tree.toJSON().children[0]).toEqual('varauksen nimi')
  })

  it('Should render contextual plurals', () => {
    const Wrapper = () => (
      <div>
        <Trans text="name" context="reservation" />
      </div>
    )
    const Component = withProvide(getTrans('fi'))(Wrapper)
    const tree = renderer.create(<Component />)
    expect(tree.toJSON().children[0]).toEqual('varauksen nimi')
  })

  it('Should inject variables as array', () => {
    const Wrapper = () => (
      <div>
        <Trans text="name ${username}" vars={['mikko']} />
      </div>
    )
    const Component = withProvide(getTrans('fi'))(Wrapper)
    const tree = renderer.create(<Component />)
    expect(tree.toJSON().children[0]).toEqual('nimi mikko')
  })

  it('Should inject variables as object', () => {
    const Wrapper = () => (
      <div>
        <Trans text="name ${username}" vars={{username: 'mikko'}} />
      </div>
    )
    const Component = withProvide(getTrans('fi'))(Wrapper)
    const tree = renderer.create(<Component />)
    expect(tree.toJSON().children[0]).toEqual('nimi mikko')
  })

  it('Should inject variables as object as well in context', () => {
    const Wrapper = () => (
      <div>
        <Trans text="name ${username}" vars={{username: 'mikko'}} context="reservation" />
      </div>
    )
    const Component = withProvide(getTrans('fi'))(Wrapper)
    const tree = renderer.create(<Component />)
    expect(tree.toJSON().children[0]).toEqual('nimi mikko varaus')
  })

  it('Should render based on count', () => {
    const Wrapper = () => (
      <div>
        <Trans plural={['my car', 'my cars']} count={0} context="reservation" />
      </div>
    )
    const Wrapper2 = () => (
      <div>
        <Trans plural={['my car', 'my cars']} count={1} context="reservation" />
      </div>
    )
    const Component = withProvide(getTrans('fi'))(Wrapper)
    const tree = renderer.create(<Component />)
    expect(tree.toJSON().children[0]).toEqual('autoni')
    const Component2 = withProvide(getTrans('fi'))(Wrapper2)
    const tree2 = renderer.create(<Component2 />)
    expect(tree2.toJSON().children[0]).toEqual('autojani')
  })

  it('Should render prefix and suffix', () => {
    const Wrapper = () => (
      <div>
        <Trans text="name" s="suffix" p="prefix" />
      </div>
    )
    const Component = withProvide(getTrans('fi'))(Wrapper)
    const tree = renderer.create(<Component />)
    expect(tree.toJSON().children[0]).toEqual('prefixnimisuffix')
  })

  it('Should catch on error and return `null`', () => {
    const tree = renderer.create(<Trans />)
    const {root} = tree
    const {instance} = root
    instance.componentDidCatch()

    expect(tree.toJSON()).toBe(null)
  })

})
