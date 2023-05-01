const namespaces = "api";

const API_URL = {
  LOGIN: `${namespaces}/user/login`,
  REGISTER: `${namespaces}/user`,
  SEARCHUSER: `${namespaces}/user/search`,
  SHOWCHATS: `${namespaces}/chats`,
  FETCHMESSAGES: `${namespaces}/messages/fetchMessages`,
  SENDMESSAGES: `${namespaces}/messages`,
  FORGOT_PASSWORD: `${namespaces}/auth/forgot-password`,
};

export default API_URL;
