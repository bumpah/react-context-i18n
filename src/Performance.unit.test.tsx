import React from 'react'
import renderer from 'react-test-renderer'

import Trans from '../src/Consumer'
import withProvide from '../src/Provider'

import getTrans from '../translations'

test('calculate performance', async () => {
  const Wrapper = () => (<Trans text="name" />)
  const Component = withProvide(getTrans('fi'))(Wrapper)
  const tree = renderer.create(<Component />)
  // const root = tree.root
  const now = new Date().getTime()
  for (let i = 0; i < 10000; i++) {
    await tree.update(<Component translations={getTrans('fi')} />)
  }

  console.log(new Date().getTime() - now, 'ms')
  expect(true).toBe(true)
})
