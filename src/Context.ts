import React from 'react'

export interface LngCtx { translations: {} }
const DefaultLangContext: LngCtx = { translations: {} }

export const I18 = React.createContext(DefaultLangContext)

export default I18
