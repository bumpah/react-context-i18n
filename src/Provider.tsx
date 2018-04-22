import React from 'react'

import I18 from './Context'

export const withLanguage = (json) => (Component) => {
  return class extends React.Component {

   public state = {
        translations: json,
    }

    public render() {
      return (
        <I18.Provider value={this.state}>
          <Component {...this.props} />
        </I18.Provider>
      )
    }
  }
}

export default withLanguage
