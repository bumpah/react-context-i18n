import React from 'react'
import renderer from 'react-test-renderer'

import Trans from '../src/Consumer'
import withProvide from '../src/Provider'

import getTrans from '../translations'

describe('<Translate />', () => {

  /**
   * Basic render and translations
   */
  it('Should render', () => {
    const tree = renderer.create(<Trans />)
  })

  it('Should render what with children', () => {
    const tree = renderer.create(<Trans>name</Trans>)
    expect(tree.toJSON()).toContain('name')
  })

  it('Should render with `text` prop', () => {
    const tree = renderer.create(<Trans text="name" />)
    expect(tree.toJSON()).toContain('name')
  })

  it('Should render default translation in Finnish', () => {
    const Wrapper = () => (
      <div>
        <Trans text="name" />
      </div>
    )
    const Component = withProvide(getTrans('fi'))(Wrapper)
    const tree = renderer.create(<Component />)
    expect(tree.toJSON().children).toContain('nimi')
  })

  /**
   * Contextuals
   */
  it('Should render contextual translation', () => {
    const Wrapper = () => (
      <div>
        <Trans text="name" context="reservation" />
      </div>
    )
    const Component = withProvide(getTrans('fi'))(Wrapper)
    const tree = renderer.create(<Component />)
    expect(tree.toJSON().children).toContain('varauksen nimi')
  })

  it('Should render contextual plurals', () => {
    const Wrapper = () => (
      <div>
        <Trans text="name" context="reservation" />
      </div>
    )
    const Component = withProvide(getTrans('fi'))(Wrapper)
    const tree = renderer.create(<Component />)
    expect(tree.toJSON().children).toContain('varauksen nimi')
  })

  /**
   * Variable injections
   */
  it('Should inject variables as array', () => {
    const Wrapper = () => (
      <div>
        <Trans text="name ${username}" vars={['mikko']} />
      </div>
    )
    const Component = withProvide(getTrans('fi'))(Wrapper)
    const tree = renderer.create(<Component />)
    expect(tree.toJSON().children).toContain('nimi ')
    expect(tree.toJSON().children).toContain('mikko')
  })

  it('Should inject variables from Array & Object with customPlaceholder option', () => {
    const Wrapper = () => (
      <div>
        <Trans text="name %s" vars={['mikko']} customPlaceholder="%s" />
      </div>
    )
    const Component = withProvide(getTrans('fi'))(Wrapper)
    const tree = renderer.create(<Component />)
    expect(tree.toJSON().children).toContain('nimi ')
    expect(tree.toJSON().children).toContain('mikko')

    const Wrapper2 = () => (
      <div>
        <Trans text="name %s" vars={{ username: 'mikko' }} customPlaceholder="%s" />
      </div>
    )
    const Component2 = withProvide(getTrans('fi'))(Wrapper2)
    const tree2 = renderer.create(<Component2 />)
    expect(tree2.toJSON().children).toContain('nimi mikko')
  })

  it('Should inject variables as object', () => {
    const Wrapper = () => (
      <div>
        <Trans text="name ${username}" vars={{ username: 'mikko' }} />
      </div>
    )
    const Component = withProvide(getTrans('fi'))(Wrapper)
    const tree = renderer.create(<Component />).toJSON()
    expect(tree.children).toContain('nimi mikko')
  })

  it('Should inject variables as object as well in context', () => {
    const Wrapper = () => (
      <div>
        <Trans text="name ${username}" vars={{ username: 'mikko' }} context="reservation" />
      </div>
    )
    const Component = withProvide(getTrans('fi'))(Wrapper)
    const tree = renderer.create(<Component />)

    expect(tree.toJSON().children).toContain('nimi mikko varaus')
  })

  /**
   * Naive pluralization implementation
   */
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
    expect(tree.toJSON().children).toContain('autoni')
    const Component2 = withProvide(getTrans('fi'))(Wrapper2)
    const tree2 = renderer.create(<Component2 />)
    expect(tree2.toJSON().children).toContain('autojani')
  })

  /**
   * Prefix and suffix
   */
  it('Should render prefix and suffix', () => {
    const Wrapper = () => (
      <div>
        <Trans text="name" s="suffix" p="prefix" />
      </div>
    )
    const Component = withProvide(getTrans('fi'))(Wrapper)
    const tree = renderer.create(<Component />)

    expect(tree.toJSON().children).toContain('prefix')
    expect(tree.toJSON().children).toContain('nimi')
    expect(tree.toJSON().children).toContain('suffix')
  })

  it('Should catch on error and return `null`', () => {
    const tree = renderer.create(<Trans />)
    const { root } = tree
    const { instance } = root
    instance.componentDidCatch()

    expect(tree.toJSON()).toBe(null)
  })
  /**
   * Translation whit in translation
   */
  it('Should translate, `translation within translation`', () => {
    const Wrapper = () => (
      <div>
        <Trans
          text="name ${username}, link ${link}."
          vars={[
            () => <Trans text="name" />,
            () => <a href="#"><Trans text="name" /></a>,
          ]}
        />
      </div>
    )
    const Component = withProvide(getTrans('fi'))(Wrapper)
    const tree = renderer.create(<Component />).toJSON()

    expect(tree.children).toContain('nimi')
    expect(tree.children[6].children).toContain('nimi')
  })

  /**
   * Catch
   */
  it('Should catch on error and return `null`', () => {
    const Wrapper = () => (
      <div>
        <Trans
          text="name ${username}, link ${link}."
          vars={[
            () => <b>'its me'</b>,
            () => <a href="#">asd</a>,
          ]}
        />
      </div>
    )
    const Component = withProvide(getTrans('fi'))(Wrapper)
    const tree = renderer.create(<Component />).toJSON()

    expect(tree.children).toContain('name ')
    expect(tree.children).toContain(', link ')
    expect(tree.children).toContain('.')
    expect(tree).toMatchSnapshot()
  })

})
