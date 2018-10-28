export interface DictionaryProps {
  json?: {},
  file?: {},
  context?: string,
}

// const compileJson = (array: Props): object => {
export function makeDictionary(array: DictionaryProps[]) {
  let defaulted = false
  // Create translations JSON-file
  const json: {} = array.reduce((acc: {}, cur: DictionaryProps): {} => {
    if (!cur.context && !defaulted) {
      defaulted = true
      const def: {} = cur.json || cur.file
      return { ...acc, default: def }
    }

    if (cur.context && (cur.file || cur.json)) {
      return { ...acc, [cur.context]: (cur.json || cur.file) }
    }

    return { ...acc }
  }, {})

  return json
}

export default makeDictionary
