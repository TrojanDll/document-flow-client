import { apiSlice } from "./../../app/api/apiSlice";
import { IEmailBody } from "../../types/Types";

export const emailApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<void, IEmailBody>({
      query: (emailBody: IEmailBody) => ({
        url: "/api/mailer/send-message",
        method: "POST",
        body: {
          ...emailBody,
        },
      }),
    }),
  }),
});

export const { useSendMessageMutation } = emailApiSlice;
