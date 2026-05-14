declare module '*.css'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.webp'

declare module 'vitest' {
  interface Matchers<R> {
    toHaveNoViolations(): R
  }
}

export {}
