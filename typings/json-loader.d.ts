declare module '*.json' {
  const value: any
  export default value
}

declare module 'react' {
  function useState<T>(a: T): [T, () => void]
}