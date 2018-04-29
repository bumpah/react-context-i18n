
export interface Props {
  file?: string,
  json?: {},
  context?: string,
}

const getFile = (filename: string) => require('./' + filename)

// const compileJson = (array: Props): object => {
function compileJson(array: Array<Props>) {
  const keepTrack: {
    defaulted: boolean,
  } = {
    defaulted: false,
  }

  const json: {} = array.reduce( (acc: {}, cur: Props): {} => {
    if ( !cur.context && keepTrack.defaulted ) { return acc }
    if ( !cur.context && cur.file ) {
      keepTrack.defaulted = true
      const def: {} = getFile(cur.file)
      return {  ...acc, default: def }
    }
    if ( cur.json ) {
      return cur.context ?
        { ...acc, [cur.context]: cur.json } :
        { ...acc, default: cur.json }
    }
    return { ...acc, [cur.context]: {...getFile(cur.file)}}
  }, {})

  return json
}

export default compileJson
