'use client'

import { createContext, useMemo, useCallback, PropsWithChildren } from 'react'
import { Spinner, SpinnerSize } from '@fluentui/react'
import { MsalProvider } from '@azure/msal-react'
import { useSessionStorage } from 'react-use'
import {
    RefreshTokens,
    RefreshIfNone,
    useMsalClient,
} from '../../hooks/useMsalClient'

export enum TokenTypes {
    DEFAULT,
    COMMUNITY,
    EMPLOYEE,
}

export interface AppContextProps {
    MStoken?: string
    BEtoken?: string
    getToken(type: TokenTypes): string | undefined
    refreshToken: RefreshTokens
    refreshIfNone: RefreshIfNone
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps)

const useSessionToken = (key: string) =>
    useSessionStorage<string | undefined>(key)

export const AppProvider: React.FC<PropsWithChildren> = (props) => {
    const [MStoken, setMStoken] = useSessionToken('MStoken')
    const [BEtoken, setBEtoken] = useSessionToken('BEtoken')
  

    const {
        error,
        client,
        refreshTokens: refreshToken,
        refreshIfNone,
    } = useMsalClient({
        tokens: [MStoken, BEtoken],
        onLogin(token1, token2) {
            setMStoken(token1)
            setBEtoken(token2)
       
        },
        onLogout() {
            setMStoken(undefined)
            setBEtoken(undefined)
           
        },
    })

    const getToken = useCallback(
        (type: TokenTypes) => {
            switch (type) {
          
                default:
                    return BEtoken
            }
        },
        [BEtoken]
    )

    const value: AppContextProps = useMemo(
        () => ({
            MStoken,
            BEtoken,
           
            getToken,
            refreshToken,
            refreshIfNone,
        }),
        [
            MStoken,
            BEtoken,
            getToken,
            refreshToken,
            refreshIfNone,
        ]
    )

    const hasTokens = Boolean(
        MStoken && BEtoken 
    )

    return !client ? null : (
        <AppContext.Provider value={value}>
            <MsalProvider instance={client}>
                {error && (
                    <>
                        <p style={{ textAlign: 'center' }}>{error}</p>
                        <p style={{ textAlign: 'center' }}>
                            Refresh the page to try again
                        </p>
                    </>
                )}
                {!error && !hasTokens && (
                    <Spinner
                        style={{ marginTop: '1em' }}
                        size={SpinnerSize.large}
                    />
                )}
                {!error && hasTokens && props.children}
            </MsalProvider>
        </AppContext.Provider>
    )
}
