
export interface DictionaryProps {
  file?: string,
  json?: {},
  context?: string,
}

const getFile = (filename: string) => require('./' + filename)

// const compileJson = (array: Props): object => {
export function makeDictionary(array: DictionaryProps[]) {
  let defaulted: boolean = false

  const json: {} = array.reduce((acc: {}, cur: DictionaryProps): {} => {

    if (!cur.context && defaulted) {
      return acc
    }

    if (!cur.context) {
      defaulted = true
      const def: {} = cur.file ? getFile(cur.file) : cur.json
      return { ...acc, default: def }
    }

    if (cur.file) {
      return { ...acc, [cur.context]: { ...getFile(cur.file) } }
    }
    if (cur.json) {
      return { ...acc, [cur.context]: (cur.json) }
    }
    return { ...acc }
  }, {})

  return json
}

export default makeDictionary
