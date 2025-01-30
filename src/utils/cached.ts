import { cachified, CacheEntry } from '@epic-web/cachified'
import { LRUCache } from 'lru-cache'

/** A volatile cache, cleared on a page refresh */
const memCache = new LRUCache<string, CacheEntry>({ max: 99 })

type CacheOpts = {
    /**
     * [milliseconds] time to live
     *
     * If `ttl` is exceeded, a read from the cache will
     * need to wait until a value is refetched.
     */
    ttl: number
    /**
     * [milliseconds] stale while revalidate
     *
     * After `ttl` has been exceeded, for given `swr` milliseconds,
     * a read from the cache will return immediately a stale value,
     * while the cache would attempt to refetch and update a value in a background.
     */
    swr?: number
    /**
     * [milliseconds] stale refresh timeout
     *
     * Wait `srt` milliseconds before attempting a refetch
     * in a "stale while revalidate" scenario.
     */
    srt?: number
}

const scenarios = {
    'long-lived': {
        ttl: 30_000_000,
        swr: 0,
        srt: 0,
    },
    'short-lived': {
        ttl: 30_000,
        swr: 1_000_000,
        srt: 0,
    },
    'short-lived-lazy': {
        ttl: 30_000,
        swr: 1_000_000,
        srt: 5_000,
    },
}

export type CachingOpts = CacheOpts | { scenario: keyof typeof scenarios }

type CachedOpts<T> = CachingOpts & {
    key: string
    produce(): Promise<T>
}

export const cached = <T>(options: CachedOpts<T>): Promise<T> => {
    const { key, produce, ...rest } = options
    const opts = 'scenario' in rest ? scenarios[rest.scenario] : rest
    return cachified<T>({
        key,
        cache: memCache,
        ttl: opts.ttl,
        swr: opts.swr,
        staleRefreshTimeout: opts.srt,
        getFreshValue: produce,
    })
}

export const invalidateCache = (key: string) => memCache.delete(key)
