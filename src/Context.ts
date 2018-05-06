import React from 'react'

export interface LanguageContext {
  translations: {}
}

const DefaultLangContext: LanguageContext = {
  translations: {},
}

export const I18 = React.createContext(
  DefaultLangContext,
)

export default I18
