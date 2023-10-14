import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import HolidayApi from '../EndPoints/HolidayApi.ts';
import { authentificationKeys, holidayKeys } from '../Querykeys.ts';
import { Login } from '../Models/Login.ts';

export const useCreateAccount = () => {
  const client = useQueryClient();
  return useMutation((newAccount: Register) => HolidayApi.createAccount(newAccount), {
    onSuccess: () => {
      // L'invalidation se fait asynchronement mais ne renvoie pas de données, donc pas besoin du .then()
      client.invalidateQueries(authentificationKeys.all);
    },
  });
};

export const useLoginAccount = () => {
  const client = useQueryClient();
  return useMutation((loginData: Login) => HolidayApi.loginAccount(loginData), {
    onSuccess: () => {
      // L'invalidation se fait asynchronement mais ne renvoie pas de données, donc pas besoin du .then()
      client.invalidateQueries(authentificationKeys.all);
    },
  });
};

export const useGetAUser = (token: string) => {
  return useQuery({
    queryKey: authentificationKeys.all,
    queryFn: () => HolidayApi.getUserData().then((content) => content.data),
    initialData: null,
    enabled: !!token,
  });
};
