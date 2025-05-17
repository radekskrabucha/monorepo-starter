export type NoEmpty<T> = T extends null | false | undefined ? never : T

export type StringWithAutoCompleteOptions<T extends string> = (string & {}) | T

export type ArrayElementType<T> = T extends readonly (infer U)[] ? U : never

export type StringUnion<T> = {
  [K in keyof T]: T[K] extends string
    ? T[K]
    : T[K] extends object
      ? StringUnion<T[K]>
      : never
}[keyof T]

export type NumbersToStrings<T> = T extends number
  ? string
  : T extends object
    ? { [K in keyof T]: NumbersToStrings<T[K]> }
    : T

export type UnknownToAny<T> = {
  [K in keyof T]: unknown extends T[K]
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any
    : T[K] extends object
      ? UnknownToAny<T[K]>
      : T[K]
}

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
