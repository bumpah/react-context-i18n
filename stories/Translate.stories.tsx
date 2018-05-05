import React from 'react';

import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';

import Trans from '../src/Consumer'
import withProvide from '../src/Provider'

import getJson from '../translations'

const Wrapper = () => (
  <div>
    <Trans text="name" />
  </div>
)
const Comp = withProvide(getJson('fi'))(Wrapper)

const WrapperWithVar = () => (
  <div>
    <Trans
      text="name ${username}, link ${link}."
      vars={[
        () => <b>'its me'</b>,
        () => <a href="#"><Trans text="cars" /></a>,
      ]}
    />
  </div>
)
const CompVars = withProvide(getJson('fi'))(WrapperWithVar)

storiesOf('Translation', module)
  .add('No translation {text=name}', () => <Trans text="name" />)
  .add('Translate to Finnish {text=name}', () => <Comp />)
  .add('Inject var as JSX', () => <CompVars />)
