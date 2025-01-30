import { useEffect, useState } from 'react'
import useMsGraph, { MsGraphOpts } from './useMsGraph'

const apiOpts: MsGraphOpts = {
    caching: { scenario: 'long-lived' },
}

const useMsGraphPhoto = (path: string) => {
    const [photo, setPhoto] = useState<string>()

    const msGraphClient = useMsGraph()

    useEffect(() => {
        msGraphClient
            .api(path, apiOpts)
            .get()
            .then((res) => setPhoto(URL.createObjectURL(res)))
            .catch(console.error)
    }, [msGraphClient, path])

    return photo
}

export const useProfilePhoto = (upn?: string) => {
    return useMsGraphPhoto(`/users/${upn}/photo/$value`)
}

export const useMePhoto = () => {
    return useMsGraphPhoto('/me/photo/$value')
}
