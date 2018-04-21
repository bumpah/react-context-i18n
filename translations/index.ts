
const main = (langCode = 'en') => (
  langCode !== 'en' ?
  require(`./${langCode}.json`)
  : {}
)

export default main
