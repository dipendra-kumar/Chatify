import { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  // const [user, setUser] = useState();
  // const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  const history = useHistory();

  useEffect(() => {
    // const userInfo = localStorage.getItem("userInfo");
    // setUser(userInfo);
  }, [history]);

  return (
    <ChatContext.Provider
      value={{ chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
