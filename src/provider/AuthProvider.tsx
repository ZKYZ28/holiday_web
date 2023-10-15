import {createContext, FC, ReactNode, useCallback, useContext, useMemo, useState} from 'react';
import axiosInstance from '../api/axios.ts';
import { UserAuthentificated } from '../api/Models/UserAuthentificated.ts';
import { decodePayloadJwt, isInvalidToken, JwtPayloadType } from './utils/JwtUtils.ts';

const LS_TOKEN = 'token';

type AuthContextType = {
  token: string | undefined;
  user: UserAuthentificated | null;
  jwtTokenInfo: JwtPayloadType | null;
  setJwtToken: (token?: string) => void;
};

const initialValues = (() => {
  let token = localStorage.getItem(LS_TOKEN) ?? undefined;
  let payloadJwt = token ? decodePayloadJwt(token) : null;

  // S'il y a un token mais qu'il invalide autant redémarrer à neuf
  if (payloadJwt && payloadJwt.exp) {
    if(isInvalidToken(payloadJwt.exp)) {
      token = undefined;
      payloadJwt = null;
      localStorage.removeItem(LS_TOKEN);
    } else {
      // Si l'utilisateur se déconnecte mais a toujours un token valide dans son local storage
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }

  return {
    token,
    jwtTokenInfo: payloadJwt,
    user: payloadJwt
      ? {
          id: payloadJwt.id,
          firstName: payloadJwt.firstName,
          lastName: payloadJwt.lastName,
          email: payloadJwt.email,
        }
      : null,
  };
})();

const AuthContext = createContext<AuthContextType>({
  ...initialValues,
  setJwtToken: () => {},
});

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | undefined>(initialValues.token);
  const [user, setUser] = useState<UserAuthentificated | null>(initialValues.user);
  const [payloadJwt, setPayloadJwt] = useState<JwtPayloadType | null>(initialValues.jwtTokenInfo);

  const setJwtToken = useCallback((token?: string) => {
    if (token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem(LS_TOKEN, token);
      const claims = decodePayloadJwt(token);
      setPayloadJwt(claims);
      setUser({
        id: claims.id,
        firstName: claims.firstName,
        lastName: claims.lastName,
        email: claims.email,
      });
      //
    } else {
      delete axiosInstance.defaults.headers.common.Authorization;
      localStorage.removeItem(LS_TOKEN);
      setPayloadJwt(null);
      setUser(null);
    }
    setToken(token ?? undefined);
  }, []);

  const contextValue = useMemo<AuthContextType>(
    () => ({
      user,
      token,
      jwtTokenInfo: payloadJwt,
      setJwtToken: setJwtToken,
    }),
    [user, token, payloadJwt]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
