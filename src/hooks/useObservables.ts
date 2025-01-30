'use client'

import { WritableObservable, observable as createObservable } from 'micro-observables'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const useObservable = <T>(callback: (data: T) => void) => {
    const [observable] = useState(() => createObservable(undefined as T))

    useEffect(
        () => observable.subscribe(callback),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return observable
}

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
                observable: createObservable(undefined as T),
            }
        }
        return observables.current[key]
    }, [])

    useEffect(
        () => () => {
            Object.values(observables.current).forEach((o) => o.unsubscribe?.())
        },
        []
    )

    return useMemo(
        () => ({
            set<T>(key: string, data: T) {
                getObserved(key).observable.set(data)
            },
            subscribe<T>(key: string, callback: (data: T) => void) {
                const observed = getObserved(key)
                observed.unsubscribe = observed.observable.subscribe((data) => {
                    callback(data as T)
                })
            },
            unsubscribe(...keys: string[]) {
                for (const key of keys) {
                    getObserved(key).unsubscribe?.()
                }
            },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )
}
