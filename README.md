# react-context-i18n

[![Build Status](https://travis-ci.org/bumpah/react-context-i18n.svg?branch=master)](https://travis-ci.org/bumpah/react-context-i18n) [![Coverage Status](https://coveralls.io/repos/github/bumpah/react-context-i18n/badge.svg)](https://coveralls.io/github/bumpah/react-context-i18n) [![devDependencies Status](https://david-dm.org/bumpah/react-context-i18n/dev-status.svg)](https://david-dm.org/bumpah/react-context-i18n?type=dev)

### Uses new React Context API so requires use of React version >=16.3.0
React translation component inspired by react-gettext component.
Only uses React as peer dependency and no other dependencies



### NEW FEATURES

Inject JSX and translations inside translatable content

```
// Example dictionary
const json = {
  'Click link': 'press me',
  'Trans me!': 'im a link',
}

<I18 vars={[
  () => <a href="#"><I18 t="Trans me!"/></a>
]}>Click link ${link}</I18>

// => `press me <a href="#">im a link</a>
```


## Basic use

Component exposes `ConsumeLanguage` & `withLanguageContext`

ConsumeLanguage is React Component which does translation

withLanguageContext is Funtion HOC which provides translation Context


### example default usage
```
import { ConsumeLanguage as I18, withLanguageContext } from 'react-context-i18'

const translatables = {
  test: 'testi',
}

const App = () => (
 <div>
   <I18>test</I18>
 </div>
)

const Comp = withLanguageContext(translatables)(App)

# App provides text 'testi'
```

### Inject variable and match object key with placeholders text
```
const translatables = {
  'test ${username}': 'testi ${username}',
}

const App = () => (
 <div>
   <I18 vars={{username: 'jest'}}>test ${username}</I18>
 </div>
)
# Provides 'testi jest'
```
### Inject variables from array and only care ${} with anything inside 
```
# OR with array
const App = () => (
 <div>
   <I18 vars={['jest']}>test ${username}</I18>
 </div>
)
# Provides same output 'testi jest'
```
### Add custom prefix or suffix to string which won't affect to translation
```
const translatables = {
  test: 'testi',
}

const Wrapper = () => (
  <div>
    <Trans text="test" s=" suffix" p="prefix " />
  </div>
)
# Provides 'prefix testi suffix', and doesn't try translate prefix or suffix opinnions
# Alternative pre="prefix" suf="suffix" OR suffix="suffix" prefix="prefix"
```

### Translate with different context 
```
const translatables = {
  'test ${username}': 'testi ${username}',
  reservation: {
    'test ${username}': 'reservation test ${username}',
  }
}

const Wrapper = () => (
  <div>
    <Trans text="test ${username}" vars={{username: 'jest'}} context="reservation" />
  </div>
)
# Provides 'reservation test jest'
```

### Preferrably use this kind of translatables markup
```
{
  default: {
    // [non-context-translations]
    name: "1"
  },
  reservation: {
    // [context 1]
    name: "2"
  },
  payment: {
    // [context 2]
    name: "3"
  }
}
```

- 0.0.3

There is now also new `makeDictionary` -function exposed which takes Array with formed as 

```
const dicJson = [
  { json: { someting: 'to convert' } },
  { json: { someting: 'else to convert' } , context: 'pay'},
]
```

and returns JSON Object which can be consumed by `withLanguageContext` -function.

