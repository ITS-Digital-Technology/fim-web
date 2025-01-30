export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
export const isDev = process.env.NEXT_PUBLIC_IS_DEV ?? false;
export const devLocalUpn = process.env.NEXT_PUBLIC_DEV_LOCAL_UPN ?? "";
export const clientId = process.env.NEXT_PUBLIC_AAD_APP_CLIENT_ID ?? "";
export const tenantId = process.env.NEXT_PUBLIC_AAD_APP_TENANT_ID ?? "";
export const redirectUrl = process.env.NEXT_PUBLIC_AAD_APP_REDIRECT_URI ?? "";
export const beApiScope = process.env.NEXT_PUBLIC_BE_API_SCOPE ?? "";
export const apiPath = {
  Applications: "applications",
  GetUserDetails: "GetUserDetails",
  GetFooter: "GetFooter",
  My: "profile/my",
};
