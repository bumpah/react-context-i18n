import React from 'react';

import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';

import Trans from '../src'
import withProvide from '../src/Provider'

import getJson from '../translations'

const Wrapper = () => (
  <div>
    <Trans text="name" />
  </div>
)
const Comp = withProvide(getJson('fi'))(Wrapper)

storiesOf('Translation', module)
  .add('No translation {text=name}', () => <Trans text="name" />)
  .add('Translate to Finnish {text=name}', () => <Comp />)
