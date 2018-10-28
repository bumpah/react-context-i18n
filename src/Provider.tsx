import React from 'react'
import I18 from './Context'

// Declare 16.7 func here
const { memo }: any = React

export function withLanguageContext(translations) {
  return (Component) => memo((props) => {
    return (
      <I18.Provider value={{ translations }}>
        <Component {...props} />
      </I18.Provider>
    )
  })
}

export default withLanguageContext
