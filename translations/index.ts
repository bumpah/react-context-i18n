const main = (langCode: string) => (
  langCode !== 'en' ?
  require(`./${langCode}.json`)
  : {}
)

export default main
