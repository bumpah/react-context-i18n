export interface DictionaryProps {
  json?: {},
  file?: {},
  context?: string,
}

// const compileJson = (array: Props): object => {
export function makeDictionary(array: DictionaryProps[]) {
  let defaulted = false
  const json: {} = array.reduce((acc: {}, cur: DictionaryProps): {} => {
    if (!cur.context && !defaulted) {
      defaulted = true
      const def: {} = cur.json
      return { ...acc, default: def }
    }

    if (cur.context && (cur.file || cur.json)) {
      return { ...acc, [cur.context]: (cur.file || cur.json) }
    }

    return { ...acc }
  }, {})

  return json
}

export default makeDictionary
