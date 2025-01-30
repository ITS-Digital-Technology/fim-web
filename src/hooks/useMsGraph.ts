'use client'

import { Client, GraphRequest } from '@microsoft/microsoft-graph-client'
import { useContext, useMemo } from 'react'
import { AppContext } from '@/app/contexts/AppContext'
import { createDebug } from '@/utils/debug'
import { CachingOpts, cached } from '@/utils/cached'
import { Observables, useObservables } from './useObservables'
export type MsGraphOpts = {
    caching?: CachingOpts & {
        key?: string
    }
}

type CachableClient = Omit<Client, 'api'> & {
    api(
        path: string,
        opts?: MsGraphOpts
    ): Omit<GraphRequest, 'get'> & {
        get<T = any>(): Promise<T>
    }
}

const fullURL = (req: GraphRequest) =>
    // @ts-ignore
    new URL(GraphRequest.prototype.buildFullUrl.call(req))

/**
 * Returns a msgraph-client instance
 */
export default function useMsGraph(): CachableClient {
    const { MStoken = '', refreshIfNone } = useContext(AppContext)

    const observables = useObservables()

    const client = useMemo(
        () =>
            Client.initWithMiddleware({
                authProvider: {
                    getAccessToken: async () => {
                        await refreshIfNone(MStoken)
                        return MStoken
                    },
                },
            }),
        [MStoken, refreshIfNone]
    )

    return useMemo(
        () => ({
            api(path: string, opts?: MsGraphOpts) {
                const req = client.api(path)
                if (opts?.caching) {
                    req.get = cachableGet(
                        client,
                        () => fullURL(req),
                        opts.caching,
                        observables
                    )
                }
                return req
            },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [client]
    )
}

const debug = createDebug('useMsGraph:cache')

function cachableGet<T>(
    client: Client,
    getURL: () => URL,
    opts: NonNullable<MsGraphOpts['caching']>,
    observables: Observables
) {
    return function (): Promise<T> {
        return {
            async then(callback: (value: T) => void): Promise<void> {
                const url = getURL()
                const key = opts.key ?? url.pathname
                observables.unsubscribe(key)
                observables.subscribe<T>(key, (data) => {
                    debug(key, 'observable', data)
                    callback(data)
                })
                try {
                    const data = await cached({
                        ...opts,
                        key,
                        async produce() {
                            const data = await client.api(String(url)).get()
                            debug(key, 'produced', data)
                            observables.set(key, data)
                            return data as T
                        },
                    })
                    debug(key, 'returned', data)
                    observables.set(key, data)
              
                } catch (e) {
             

                    const message = (e as Error).message
                    if (message.includes('Failed to fetch')) {
                        throw e
                    } else {
                        debug.error(message)
                    }
                }
            },
        } as Promise<T>
    }
}
