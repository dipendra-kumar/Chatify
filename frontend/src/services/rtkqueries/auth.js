import API_URL from "../../api-url";

export const login = (build) => {
  return build.mutation({
    query: (params) => ({
      url: `${API_URL.LOGIN}`,
      data: params.data,
      method: "POST",
    }),
  });
};

export const signup = (build) => {
  return build.mutation({
    query: (params) => ({
      url: `${API_URL.REGISTER}`,
      data: params.data,
      method: "POST",
    }),
  });
};

export const searchUser = (build) => {
  return build.mutation({
    query: (params) => ({
      url: `${API_URL.SEARCHUSER}`,
      data: params.data,
      method: "POST",
    }),
  });
};

export const showChats = (build) => {
  return build.query({
    query: (params) => ({
      url: `${API_URL.SHOWCHATS}`,
      method: "GET",
    }),
  });
};

export const fetchMessages = (build) => {
  return build.mutation({
    query: (params) => ({
      url: `${API_URL.FETCHMESSAGES}`,
      data: params.data,
      method: "POST",
    }),
  });
};

export const sendMessage = (build) => {
  return build.mutation({
    query: (params) => ({
      url: `${API_URL.SENDMESSAGES}`,
      data: params.data,
      method: "POST",
    }),
  });
};

export const completeprofile = (build) => {
  return build.mutation({
    query: (params) => ({
      url: "complete-profile",
      data: params.data,
      method: "PATCH",
    }),
  });
};
export const forgetpassword = (build) => {
  return build.mutation({
    query: (params) => ({
      url: "forgot-password",
      data: params.data,
      method: "PATCH",
    }),
  });
};

// export const resetforgetpassword = (build) => {
//   return build.mutation({
//     query: (params) => ({
//       url: "reset-forgot-password",
//       data: params.data,
//       method: "PATCH",
//     }),
//   });
// };
// export const otpverification = (build) => {
//   return build.mutation({
//     query: (params) => ({
//       url: "validate-otp",
//       data: params.data,
//       method: "PATCH",
//     }),
//   });
// };
