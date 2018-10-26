export interface DictionaryProps {
  json?: {},
  file?: {},
  context?: string,
}

// const compileJson = (array: Props): object => {
export function makeDictionary(array: DictionaryProps[]) {
  let defaulted: boolean = false

  const json: {} = array.reduce((acc: {}, cur: DictionaryProps): {} => {

    if (!cur.context && defaulted) {
      return acc
    }

    if (!cur.context) {
      defaulted = true
      const def: {} = cur.json
      return { ...acc, default: def }
    }

    if (cur.file) {
      return { ...acc, [cur.context]: (cur.file) }
    }

    if (cur.json) {
      return { ...acc, [cur.context]: (cur.json) }
    }
    return { ...acc }
  }, {})

  return json
}

export default makeDictionary
