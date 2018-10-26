const main = (langCode) => (
  langCode !== 'en'
    ? require(`./${langCode}.json`)
    : {}
);

export default main;
