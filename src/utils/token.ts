import {
    Configuration,
    PublicClientApplication,
    AccountInfo,
    InteractionRequiredAuthError,
    AuthError,
} from '@azure/msal-browser'
import {
    clientId,
    tenantId,
    redirectUrl,
    beApiScope,
} from '../apiConfig'

const MSGraphScopes = [
    'email',
]
const BEscopes = [beApiScope]

export const configuration: Configuration = {
    auth: {
        clientId: clientId,
        authority: `https://login.microsoftonline.com/${tenantId}`,
        redirectUri: redirectUrl,
        // postLogoutRedirectUri: logoutRedirectUrl,
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: 'localStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
}

async function initializeAuthFlow(
    client: PublicClientApplication,
    msalAccount: AccountInfo | undefined,
    scopes: string[]
) {
    const tokenRequest = {
        scopes,
        account: msalAccount,
    }

    // Try ssoSilent first for enabled cookies scenario
    if (!msalAccount) {
        try {
            const ssoAuth = await client.ssoSilent(tokenRequest)
            return ssoAuth.accessToken
        } catch (ssoErr) {
            if (ssoErr instanceof InteractionRequiredAuthError || ssoErr instanceof AuthError) {
                // fallback to redirect when silent call fails
                console.log(`Acquiring token by redirect ...`)
                await client.acquireTokenRedirect(tokenRequest)
            }
        }
    }

    try {
        const silentAuthResult = await client.acquireTokenSilent(tokenRequest)
        return silentAuthResult.accessToken
    } catch (authErr) {
        console.warn(authErr)
        if (authErr instanceof InteractionRequiredAuthError || authErr instanceof AuthError) {
            // fallback to redirect when silent call fails
            console.log(`Acquiring token by redirect ...`)
            await client.acquireTokenRedirect(tokenRequest)
        }
    }
}

export async function initializeAuth(
    client: PublicClientApplication,
    msalAccount: AccountInfo | undefined
) {
    return Promise.all([
        initializeAuthFlow(client, msalAccount, MSGraphScopes),
        initializeAuthFlow(client, msalAccount, BEscopes),
    ]).catch(err => {
        console.error(err)
        return []
    })
}
