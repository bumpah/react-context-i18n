import React from 'react'

const DefaultLangContext = {
  translations: {},
}

export const I18 = React.createContext(
  DefaultLangContext,
)
