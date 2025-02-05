import { JwtPayload, jwtDecode as decode } from "jwt-decode";

type Decoded<T> = ReturnType<typeof decode<T>>;

export const jwtDecode = <T = JwtPayload>(token?: string): Decoded<T> => {
  return token ? decode<T>(token) : ({} as T);
};

export const isTokenAbsent = (token?: string): boolean => {
  return !token;
};
