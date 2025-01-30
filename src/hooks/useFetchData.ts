'use client'

import { WritableObservable } from 'micro-observables'
import { noop } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { createDebug } from '@/utils/debug'
import { CachingOpts, cached, invalidateCache } from '../utils/cached'
import { useObservable } from './useObservables'

const DefaultTimeout = 30000

type DataType = 'json' | 'image' | 'text' | 'blob' | 'none'

export type FetchDataOpts = {
    method: string
    dataType: DataType
    timeout?: number
    caching?: CachingOpts
}

type FetchData<T> = (url: string, options: RequestInit) => Promise<T | Response>

type InvalidateCache = (url: string) => void

export const useFetchData = <T = any>(
    opts: FetchDataOpts
): [T | undefined, FetchData<T>, InvalidateCache] => {
    const [state, setState] = useState<T>()

    const observable = useObservable<T>((data) => {
        if (data !== state && data !== undefined) {
            setState(data)
        }
    })

    const rawFetchData: FetchData<T> = useCallback(
        async (url, options) => {
            const controller = new AbortController()
            const timeout = setTimeout(() => controller.abort(), opts.timeout ?? DefaultTimeout)
            try {
                const resp = await window.fetch(url, {
                    ...options,
                    signal: controller.signal,
                })
                if (resp.status >= 200 && resp.status < 300) {
                    const data = await getData(resp, opts.dataType)
                    observable.set(data)
                    return data
                } else {
                    return resp
                }
            } finally {
                clearTimeout(timeout)
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    const [fetchData, invalidateCache] = useMemo(
        () =>
            opts.caching && opts.method === 'GET'
                ? cachedFetchData(observable, rawFetchData, opts.caching)
                : [rawFetchData, noop as InvalidateCache],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return [state, fetchData, invalidateCache]
}

async function getData(resp: Response, dataType: DataType) {
    switch (dataType) {
        case 'image':
            return URL.createObjectURL(await resp.blob())
        case 'text':
            return await resp.text()
        case 'blob':
            return await resp.blob()
        case 'none':
            return undefined
        default:
            return await resp.json()
    }
}

const debug = createDebug('useFetchData:cache')

function cachedFetchData<T>(
    observable: WritableObservable<T>,
    fetchData: FetchData<T>,
    opts: CachingOpts
): [FetchData<T>, InvalidateCache] {
    return [
        async (url: string, options: RequestInit) => {
            const data = await cached<T>({
                ...opts,
                key: url,
                async produce() {
                    const data = await fetchData(url, options)
                    debug(url, 'produced', data)
                    if (data instanceof Response) {
                        return undefined as T
                    } else {
                        observable.set(data)
                        return data
                    }
                },
            })
            debug(url, 'returned', data)
            observable.set(data)
            return data
        },
        invalidateCache,
    ]
}
