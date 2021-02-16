import { Fragment, Component, ReactNode } from 'react'
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
  vars?: Array<string | number | (() => any)> | object
  variables?: Array<string | number> | object
  plural?: string[]
  customPlaceholder?: string
}

interface Context {
  translations: { default?: {} }
}

/**
 * RE-WRITE TO USE
 * =>> React.js -hooks
 */
export class ConsumeLanguage extends Component<Props> {
  protected static defaultProps = {
    variables: null,
    vars: null,
  }

  public state = {
    catched: false,
  }

  public render() {
    if (this.state.catched) {
      return this.props.t || this.props.text || this.props.children || null
    }
    let text: string = this.props.text
      || this.props.children
      || this.props.t
      || ''

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

    const helper: ReactNode[] = []
    return (
      <I18.Consumer>
        {(trans: Context) => {
          const { translations } = trans
          let toPrint = (translations[context] ?
            translations[context][text] :
            translations[text]) || text

          if (Array.isArray(vars)) {
            const match = this.props.customPlaceholder ? this.props.customPlaceholder : /\${.*?}/
            vars.map((item, i) => {
              // if (typeof item === 'function') {
              const arr = toPrint.match(match)
              const { length } = arr[0]
              const { index, input } = arr

              helper.push(
                fill(input.slice(0, index)),
              )

              if (typeof item === 'function') {
                helper.push(fill(item()))
              } else {
                helper.push(fill(item))
              }

              toPrint = input.slice(index + length)

              if (
                typeof vars !== 'undefined' &&
                (i + 1) === Object.keys(vars).length) {
                if (toPrint.length > 0) {
                  helper.push(
                    fill(toPrint),
                  )
                }
              }
            })
            toPrint = helper.slice(0)
          } else if (vars && typeof vars !== 'undefined') {
            Object.keys(vars).map((item) => {
              const match = this.props.customPlaceholder ? this.props.customPlaceholder : `\${${item}}`
              if (
                typeof vars !== 'undefined' &&
                typeof vars[item] !== 'function'
              ) {
                toPrint = toPrint.replace(match, vars[item])
              }
            })
          }
          return [pre, (toPrint || text), suf]
        }}
      </I18.Consumer>
    )
  }

  public componentDidCatch() {
    this.setState({ catched: true })
  }
}

function fill(val) {
  let key: string
  try {
    key = JSON.stringify(val)
  } catch (error) {
    key = JSON.stringify(val.props)
  }
  return <Fragment key={key}>{val}</Fragment>
}

export default ConsumeLanguage
