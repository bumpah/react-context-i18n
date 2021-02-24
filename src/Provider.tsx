import { memo } from 'react'
import { I18 } from './Context'

export function withLanguageContext(translations) {
  return (Component) => memo((props) => {
    return (
      <I18.Provider value={{ translations }}>
        <Component {...props} />
      </I18.Provider>
    )
  })
}
