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
