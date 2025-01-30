'use client'

const localStorageKey = 'DEBUG'
const splitRx = / ?, ?/g
const wildcard = '*'

const isEnabled = (name: string) => {
    const configuration = localStorage.getItem(localStorageKey)
    const enabled = configuration?.split(splitRx) ?? []
    return enabled.some((_) => _ === wildcard || name.startsWith(_))
}

type Logger = (...args: unknown[]) => void

const logger = (out: Logger, name: string, prefix: string) => {
    return (...args: unknown[]) => {
        if (isEnabled(name)) {
            out(prefix, ...args)
        }
    }
}

type Debug = Logger & { error: Logger }

/**
 * Creates a logger that outputs to the console
 * only if `DEBUG` value in `localStorage` matches its name.
 *
 * To enable a logger with name `useFetch`
 * set localStorage `DEBUG` to `useFetch`
 *
 * To enable loggers with names `useFetch` and `useMsGraph`
 * set `localStorage` `DEBUG` to `useFetch,useMsGraph`
 *
 * To enable all loggers
 * set `localStorage` `DEBUG` to `*`
 *
 * @example
 * const debug = createDebug('useHook')
 * debug('info') // outputs to `console.debug`
 * debug.error('fail') // outputs to `console.error`
 *
 * @param name
 */
export const createDebug = (name: string): Debug => {
    const debug = logger(console.debug, name, `[${name}]`)
    const error = logger(console.error, name, `[${name}][ERROR]`)
    return Object.assign(debug, { error })
}
