import React from 'react'

import { storiesOf } from '@storybook/react'

import Trans from '../lib/Consumer'
import withProvide from '../lib/Provider'

import getTrans from '../translations'

const Wrapper = () => (
  <div>
    <Trans text="name" />
  </div>
)
const Comp = withProvide(getTrans('fi'))(Wrapper)

const WrapperWithVar = () => (
  <div>
    <Trans
      text="name ${username}"
      vars={[
        () => <Trans text="name" />,
      ]}
    />
  </div>
)
const CompVars = withProvide(getTrans('fi'))(WrapperWithVar)

storiesOf('Translation', module)
  .add('No translation {text=name}', () => <Trans text="name" />)
  .add('Translate to Finnish {text=name}', () => <Comp />)
  .add('Inject var as JSX', () => <CompVars />)
