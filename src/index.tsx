import React from 'react'
import { I18 } from './Context'

interface Props {
  text?: string
  children?: string
  context?: string
}

interface Context {
  translations: { default?: {} }
}

class ReactTranslate extends React.Component<Props> {
  public state = {
    catched: false,
  }

  public render() {
    if ( this.state.catched ) {
      return null
    }
    const text: string = this.props.text || this.props.children
    const context = this.props.context || 'default'
    return (
      <I18.Consumer>
        { (trans: Context) => {
          const { translations } = trans
          const toPrint = translations[context] ?
            translations.default[text] :
            translations[text]
          return toPrint || text
        } }
      </I18.Consumer>
    )
  }

  public componentDidCatch() {
    this.setState({ catched: true })
  }
}

export default ReactTranslate
