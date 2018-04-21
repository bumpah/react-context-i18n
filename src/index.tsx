import React from 'react'
import { I18 } from './Context'

interface Props {
  text?: string
  t?: string
  s?: string,
  p?: string,
  pre?: string
  suf?: string
  children?: string
  context?: string
  count?: number
  vars?: Array<string|number> | object
  variables?: Array<string|number> | object
  plural?: string[]
}

interface Context {
  translations: { default?: {} }
}

class ReactTranslate extends React.Component<Props> {
  protected static defaultProps = {
    vars: null,
    variables: null,
  }

  public state = {
    catched: false,
  }

  public render() {
    if ( this.state.catched ) {
      return null
    }
    let text: string = this.props.text || this.props.children
    const context = this.props.context || 'default'

    const { vars } = this.props

    const pre = this.props.p || this.props.pre || ''
    const suf = this.props.s || this.props.suf || ''
    if ( this.props.plural ) {
      text = this.props.plural[this.props.count]
    }
    return (
      <I18.Consumer>
        { (trans: Context) => {
          const { translations } = trans
          let toPrint = translations[context] ?
            translations[context][text] :
            translations[text]

          if ( Array.isArray(vars) ) {
            vars.map( (item) => {
              toPrint = toPrint.replace(/\${.*}/, item)
            })
          } else if ( vars ) {
            Object.keys(vars).map((item) => {
              toPrint = toPrint.replace(`\${${item}}`, vars[item])
            })
          }
          return `${pre}${toPrint || text}${suf}`
        } }
      </I18.Consumer>
    )
  }

  public componentDidCatch() {
    this.setState({ catched: true })
  }
}

export default ReactTranslate
