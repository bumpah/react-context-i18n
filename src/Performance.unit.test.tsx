import * as React from 'react'
import renderer from 'react-test-renderer'

import { ConsumeLanguage as Trans } from '../src/Consumer'
import { withLanguageContext as withProvide } from '../src/Provider'

import getTrans from '../translations'

test('calculate performance', () => {
  const Wrapper = () => (<Trans text="name" />)
  const Component = withProvide(getTrans('fi'))(Wrapper)
  const tree = renderer.create(<Component />)
  // const root = tree.root
  const now = new Date().getTime()
  for (let i = 0; i < 10000; i++) {
    tree.update(<Component translations={getTrans('fi')} />)
  }

  console.log(new Date().getTime() - now, 'ms')
  expect(true).toBe(true)
})
