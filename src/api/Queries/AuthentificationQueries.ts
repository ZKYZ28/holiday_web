import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authentificationKeys } from '../Querykeys.ts';
import {Login} from '../Models/Login.ts';
import AuthentificationRequestsApi from '../EndPoints/Requests/AuthentificationRequestsApi.ts';
import {GoogleAuth} from "../Models/UserAuthentificated.ts";

export const useCreateAccount = () => {
  const client = useQueryClient();
  return useMutation((newAccount: Register) => AuthentificationRequestsApi.createAccount(newAccount), {
    onSuccess: () => {
      client.invalidateQueries(authentificationKeys.all);
    },
  });
};

export const useLoginAccount = () => {
  const client = useQueryClient();
  return useMutation((loginData: Login) => AuthentificationRequestsApi.loginAccount(loginData), {
    onSuccess: () => {
      client.invalidateQueries(authentificationKeys.all);
    },
  });
};

export const useLoginGoogle = () => {
  const client = useQueryClient();
  return useMutation((idToken: GoogleAuth) => AuthentificationRequestsApi.loginGoogle(idToken), {
    onSuccess: () => {
      client.invalidateQueries(authentificationKeys.all);
    },
  });
};
