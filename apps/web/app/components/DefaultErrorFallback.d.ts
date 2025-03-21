import type React from 'react'

type ErrorFallbackProps<E extends Error = Error> = {
  error: E
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
}
export declare const DefaultErrorFallback: ({
  error,
  children,
  title,
  description
}: ErrorFallbackProps) => React.JSX.Element
export declare const NavigateToHomeButton: () => React.JSX.Element
type ErrorDetailsAccordionProps = {
  error: Error
}
export declare const ErrorDetailsAccordion: React.FC<ErrorDetailsAccordionProps>
export {}
//# sourceMappingURL=DefaultErrorFallback.d.ts.map
