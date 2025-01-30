'use client'

import { WritableObservable, observable } from 'micro-observables'
import { useCallback, useMemo, useRef } from 'react'

type Observed = {
    observable: WritableObservable<unknown>
    unsubscribe?(): void
}

export type Observables = ReturnType<typeof useObservables>

export const useObservables = () => {
    const observables = useRef<Record<string, Observed>>({})

    const getObserved = useCallback(<T>(key: string) => {
        if (observables.current[key] === undefined) {
            observables.current[key] = {
                observable: observable(undefined as T),
            }
        }
        return observables.current[key]
    }, [])

    return useMemo(
        () => ({
            set<T>(key: string, data: T) {
                getObserved(key).observable.set(data)
            },
            subscribe<T>(key: string, callback: (data: T) => void) {
                const observed = getObserved(key)
                observed.unsubscribe = observed.observable.subscribe((data) =>
                    callback(data as T)
                )
            },
            unsubscribe(key: string) {
                getObserved(key).unsubscribe?.()
            },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )
}
