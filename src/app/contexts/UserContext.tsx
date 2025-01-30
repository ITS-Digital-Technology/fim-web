'use client'

import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { apiPath, baseUrl } from '../../apiConfig'
// import { IPerson } from '../../types/Person'
// import { jwtDecode } from '../../utils/jwt'
import useFetch from '../../hooks/useFetch'
import { AppContext } from './AppContext'

interface UserContextProps {
    user?: any
    isLoading: boolean
}

export const UserContext: React.Context<UserContextProps> = createContext<UserContextProps>(
    {} as UserContextProps
)

const createUser = (claims: any, userDetails?: any): any => {

    return {
        nuid: userDetails?.nuid,
        userId: userDetails?.userId,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails?.email,
        campusName: userDetails?.campusName
    }
}

export const UserProvider = ({ children }: any) => {

    // const { MStoken } = useContext(AppContext)
     const decodedJwt = ''

    const [user, setUser] = useState<any>()

    const { fetchAPI: getUserDetails, isLoading: isLoadingUser } = useFetch<string>({
        dataType: 'json',
        url: `${baseUrl}${apiPath.GetUserDetails}`,
        disableAutoFetch: true,
    })

    useEffect(() => {
        if (!user) {
            getUserDetails().then(
                resp => setUser(createUser(decodedJwt, resp))
            )
        }
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user]
    )

    const userProps: UserContextProps = useMemo (
        () => ({
            user,
            isLoading: isLoadingUser
            
        }),
        [
            user,
            isLoadingUser
        ]
    )

    return (
        <UserContext.Provider value={userProps}>
            {children}
        </UserContext.Provider>
    )
}
