import {useMutation, useQueryClient} from "@tanstack/react-query";
import {mailKeys} from "../Querykeys.ts";
import {Mail} from "../Models/Mail.ts";
import MailRequestsApi from "../EndPoints/Requests/MailRequestsApi.ts";

export const useSendMail = () => {
  const client = useQueryClient();
  return useMutation((mail: Mail) => MailRequestsApi.sendMail(mail), {
    onSuccess: () => {
      client.invalidateQueries(mailKeys.all);
    },
  });
};
