import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./Axios";
import {
  login,
  signup,
  searchUser,
  showChats,
  fetchMessages,
  sendMessage,
  resetforgetpassword,
} from "./rtkqueries/auth";

const appService = createApi({
  reducerPath: "app",
  baseQuery: axiosBaseQuery({}),

  endpoints: (build) => ({
    login: login(build),
    signup: signup(build),
    searchUser: searchUser(build),
    showChats: showChats(build),
    fetchMessages: fetchMessages(build),
    sendMessage: sendMessage(build),
    // resetforgetpassword: resetforgetpassword(build),
  }),
});
export const {
  useSignupMutation,
  useLoginMutation,
  useSearchUserMutation,
  useLazyShowChatsQuery,
  useFetchMessagesMutation,
  useSendMessageMutation,
  // useResetforgetpasswordMutation,
} = appService;
export default appService;
