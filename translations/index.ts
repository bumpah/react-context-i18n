const main = (langCode: string): object => (
  langCode !== 'en' ?
  require(`./${langCode}.json`)
  : {}
)

export default main
