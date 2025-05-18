import React from 'react'

type ErrorBoundaryProps<E extends Error = Error> = {
  fallback: React.ReactNode | ((error: E, reset: () => void) => React.ReactNode)
  onReset?: () => void
  children: React.ReactNode
}

type ErrorBoundaryState<E extends Error = Error> = { error: E | null }

export class ErrorBoundary<E extends Error = Error> extends React.Component<
  ErrorBoundaryProps<E>,
  ErrorBoundaryState<E>
> {
  override state = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  resetError = () => {
    this.setState({ error: null })
    if (this.props.onReset) this.props.onReset()
  }

  override render() {
    const { error } = this.state
    if (error) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(error, this.resetError)
      }
      return this.props.fallback
    }
    return this.props.children
  }
}
