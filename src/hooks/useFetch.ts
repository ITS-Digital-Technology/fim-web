'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import { AppContext, TokenTypes } from '../app/contexts/AppContext'
import { createDebug } from '../utils/debug'
import { FetchDataOpts, useFetchData } from './useFetchData'
import { devLocalUpn, isDev } from '../apiConfig'

export { TokenTypes } from '../app/contexts/AppContext'

export type IFetchProps = Partial<FetchDataOpts> & {
    url: string
    body?: string
    query?: Record<string, string>
    disableAutoFetch?: boolean
    tokenType?: TokenTypes
    headers?: { [key: string]: string }
    keepalive?: boolean
    ignore401?: boolean
}

type FetchAPIOpts = {
    url?: string
    query?: Record<string, string>
    body?: string
    silent?: boolean
}
type FetchAPI<T> = (opts?: FetchAPIOpts) => Promise<T | undefined>

export type IFetchResponse<T = any> = {
    isLoading: boolean
    isError: boolean
    data?: T
    errorMessage: string | undefined
    fetchAPI: FetchAPI<T>
    invalidateCache(): void
}

type Failure = [string, number, Error?]

export const postHeaders = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
}

const authHeaders = (token: string | undefined): Record<string, string> => {
    if (isDev) {
        return { 'x-eh-neu-upn': devLocalUpn }
    }
    return { Authorization: `Bearer ${token}` }
}

const debug = createDebug('useFetch')

export default function useFetch<T = any>({
    url,
    method = 'GET',
    dataType = 'json',
    tokenType = TokenTypes.DEFAULT,
    keepalive,
    caching: cached,
    ...props
}: IFetchProps): IFetchResponse<T> {
    const { BEtoken, getToken, refreshToken, refreshIfNone } =
        useContext(AppContext)

    const [isLoading, setIsLoading] = useState(!props.disableAutoFetch)
    const [failure, setFailure] = useState<Failure>()

    const fail = useCallback((message: string, status: number, error?: Error, silent?: boolean) => {
        debug.error(status, message, error)
        setFailure([silent ? '' : message, status, error])
    }, [])

    const [data, fetchData, invalidateCache] = useFetchData<T>({
        method,
        dataType,
        timeout: props.timeout,
        caching: cached,
    })

    const fetchAPI: FetchAPI<T> = async (opts) => {
        setIsLoading(!opts?.silent)
        setFailure(undefined)

        const token = getToken(tokenType, url)
        await refreshIfNone(token)

        const options = {
            method,
            body: opts?.body ?? props.body,
            headers: { ...(token ? authHeaders(token) : {}), ...props.headers },
            keepalive,
        }

        const queryString = String(
            new URLSearchParams({
                ...props.query,
                ...opts?.query,
            })
        )
        const finalURL = opts?.url ?? (queryString ? `${url}?${queryString}` : url)

        try {
            const data = await fetchData(finalURL, options)
            if (data instanceof Response) {
                if (data.status === 401) {
                    fail('Invalid token', 401, undefined, true)
                    if (!props.ignore401) {
                        await refreshToken()
                    }
                } else {
                    const message = await getErrorMessage(data)
                    fail(message ?? `Can't load data 1`, data.status)
                }
            } else {
                return data
            }
        } catch (e) {
            fail(`Can't load data 2`, 500, e as Error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(
        () => {
            if (!props.disableAutoFetch && BEtoken ) {
                fetchAPI()
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return {
        isLoading,
        isError: Boolean(failure),
        data,
        errorMessage: failure?.[0],
        fetchAPI,
        invalidateCache: () => invalidateCache(url),
    }
}

async function getErrorMessage(resp: Response): Promise<string | undefined> {
    const response = await resp.json()
    return (
        response?.error?.message ??
        response?.errors?.[0]?.message ??
        response?.errors?.[0]?.errorMessage ??
        (response?.error && JSON.stringify(response.error)) ??
        (response?.errors && JSON.stringify(response.errors))
    )
}
