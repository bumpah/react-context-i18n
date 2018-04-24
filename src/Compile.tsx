
export interface Props {
  file?: string,
  json?: {},
  context?: string,
}

// const compileJson = (array: Props): object => {
function compileJson(array: Props[]) {
  const keepTrack: {
    defaulted: boolean,
  } = {
    defaulted: false,
  }

  const json: {} = array.reduce( (acc: {}, cur: Props): {} => {
    if ( !cur.context && keepTrack.defaulted ) { return acc }
    if ( !cur.context && cur.file ) {
      keepTrack.defaulted = true
      const def: {} = require(cur.file)
      return {  ...acc, default: def }
    }
    if ( cur.json ) {
      return cur.context ?
        { ...acc, [cur.context]: cur.json } :
        { ...acc, default: cur.json }
    }
    return { ...acc, [cur.context]: {...require(cur.file)}}
  }, {})

  return json
}

export default compileJson
