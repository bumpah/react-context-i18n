import React from 'react'
import I18 from './Context'

export interface Props {
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
  vars?: Array<string | number> | object
  variables?: Array<string | number> | object
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
    if (this.state.catched) {
      return null
    }
    let text: string = this.props.text || this.props.children || ''
    const context = this.props.context || 'default'

    let { vars } = this.props
    if (!vars) {
      vars = this.props.variables
    }

    const pre = this.props.p || this.props.pre || this.props.prefix || ''
    const suf = this.props.s || this.props.suf || this.props.suffix || ''
    if (this.props.plural && typeof this.props.count !== 'undefined') {
      text = this.props.plural[this.props.count]
    }

    return (
      <I18.Consumer>
        {(trans: Context) => {
          const { translations } = trans
          let toPrint = (translations[context] ?
            translations[context][text] :
            translations[text]) || text

          if (Array.isArray(vars)) {
            const match = this.props.customPlaceholder ? this.props.customPlaceholder : /\${.*}/
            vars.map((item) => {
              toPrint = toPrint.replace(match, item)
            })
          } else if (vars) {
            Object.keys(vars).map((item) => {
              const match = this.props.customPlaceholder ? this.props.customPlaceholder : `\${${item}}`
              toPrint = toPrint.replace(match, vars[item])
            })
          }

          return `${pre}${toPrint || text}${suf}`
        }}
      </I18.Consumer>
    )
  }

  public componentDidCatch() {
    this.setState({ catched: true })
  }
}

export default ReactTranslate
