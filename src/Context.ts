import { createContext } from 'react'

export interface LngCtx { translations: {} }
const DefaultLangContext: LngCtx = { translations: {} }

export const I18 = createContext(DefaultLangContext)
