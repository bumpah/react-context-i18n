export * from './Compile'
export * from './Consumer'
export * from './Provider'

import makeDictionary from './Compile'
import ConsumeLanguage from './Consumer'
import withLanguageContext from './Provider'

export {
  ConsumeLanguage,
  withLanguageContext,
  makeDictionary,
}
