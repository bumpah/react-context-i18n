import React from 'react'
import I18 from './Context'

interface Props {
  text?: string
  t?: string
  s?: string,
  p?: string,
  pre?: string
  suf?: string
  prefix?: string
  suffix?: string
  children?: string
  context?: string
  count?: number
  vars?: Array<string|number> | object
  variables?: Array<string|number> | object
  plural?: string[]
  customPlaceholder?: string
}

interface Context {
  translations: { default?: {} }
}

export class ReactTranslate extends React.Component<Props> {
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

    const { vars, variables } = this.props
    let injectables = []
    if ( Array.isArray(vars) ) {
      injectables = [...vars]
    }
    if ( Array.isArray(variables) ) {
      injectables = [...injectables, ...variables]
    }
    const pre = this.props.p || this.props.pre || this.props.prefix || ''
    const suf = this.props.s || this.props.suf || this.props.suffix || ''
    if ( this.props.plural ) {
      text = this.props.plural[this.props.count]
    }

    return (
      <I18.Consumer>
        { (trans: Context) => {
          const { translations } = trans
          let toPrint = (translations[context] ?
            translations[context][text] :
            translations[text]) || text

          if ( Array.isArray(injectables) ) {
            const match = this.props.customPlaceholder ? this.props.customPlaceholder : /\${.*}/
            injectables.map( (item) => {
              toPrint = toPrint.replace(match, item)
            })
          } else if ( injectables ) {
            Object.keys(injectables).map((item) => {
              const match = this.props.customPlaceholder ? this.props.customPlaceholder : `\${${item}}`
              toPrint = toPrint.replace(match, injectables[item])
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
