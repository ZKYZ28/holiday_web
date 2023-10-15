import { decodeJwt, JWTPayload } from 'jose';

type JwtPayloadType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  exp: number;
  sub: string;
};

function decodePayloadJwt(token: string): JwtPayloadType {
  if (!token) {
    throw new Error('Le JWT est invalide')!;
  }
  const claims: JWTPayload = decodeJwt(token);
  return {
    id: claims.nameid as string,
    firstName: claims.name as string,
    lastName: claims.name as string,
    email: claims.email as string,
    exp: claims.exp as number,
    sub: claims.sub as string,
  };
}

function isInvalidToken(tokenExp: number) {
  return tokenExp * 1000 < new Date().getTime();
}

export { decodePayloadJwt, isInvalidToken };
export type { JwtPayloadType };
