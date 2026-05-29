import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  exp: number; // expiry time (seconds)
};

export function getTokenExpiry(token: string): number | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.exp * 1000; // convert to ms
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const expiry = getTokenExpiry(token);

  if (!expiry) return true;

  return Date.now() > expiry;
}