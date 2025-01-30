import { useEffect, useState } from 'react'
import useMsGraph, { MsGraphOpts } from './useMsGraph'

type Me = { id: string }

const apiOpts: MsGraphOpts = {
    caching: { scenario: 'long-lived' },
}

export const useMsGraphMe = (): Me | undefined => {
    const [me, setMe] = useState<Me>()

    const msGraphClient = useMsGraph()

    useEffect(() => {
        msGraphClient
            .api('/me', apiOpts)
            .get()
            .then((res) => setMe(res))
            .catch(console.error)
    }, [msGraphClient])

    return me
}
