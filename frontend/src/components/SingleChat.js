import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import "./SingleChat.css";
import { useToast, Button, Avatar } from "@chakra-ui/react";
import { getSender } from "../config/ChatLogics";
import { useEffect, useState } from "react";
import ScrollableChat from "./ScrollableChat";
import { ChatState } from "../Context/ChatProvider";
import io from "socket.io-client";
import {
  useFetchMessagesMutation,
  useSendMessageMutation,
} from "../services/appService";
import { showTooster } from "../helpers/tooster";
import Picker from 'emoji-picker-react';
import { useSelector } from "react-redux";


const ENDPOINT = "http://10.8.10.59:5002";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [fileInfo, setFileInfo] = useState([]);
  const [file, setFile] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const toast = useToast();
  const [fetchMessages, { data, isLoading, isSuccess, error, isError }] = useFetchMessagesMutation();
  const [sendMessage, { data: messageSent, isLoading: isSentMessageLoading, isSuccess: isSentMessageSucess, error: sentMessageError, isError: isSentMessageError, },] = useSendMessageMutation();
  const user = useSelector(state => state.getAin1Slice.getUserData);
  const selectedChat = useSelector(state => state.chatSlice.getSelectedChatData)

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    // eslint-disable-next-line
  }, []);

  const showMessages = async () => {
    if (!selectedChat) return;

    let chatData = {
      chatId: selectedChat._id,
    };

    let response = await fetchMessages({ data: chatData });

    setMessages(response.data);
    socket.emit("join chat", selectedChat._id);

  };

  const sendMessageData = async (event) => {
    if (event.type === "click" || event.key === "Enter") {
      try {
        setNewMessage("");
        const messageData = {
          content: file ? file : newMessage,
          contentType: file ? fileInfo.type : "text",
          chatId: selectedChat._id,
        };
        const { data } = await sendMessage({ data: messageData });
        setFetchAgain(!fetchAgain);
        if (file) {
          setFile(null);
        }
        if (data) {
          socket.emit("new message", data);
          setMessages([...messages, data]);
        }
      } catch (error) {
        showTooster({
          toast,
          message: "Failed to send the messages",
          status: "error",
        });
      }
    }
  };

  useEffect(() => {
    showMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chatId._id
      ) {
        setFetchAgain(!fetchAgain);
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;
  };

  const handleFileUpload = async (e) => {
    //for multiple file upload
    let images;
    if (e.target.files.length > 1) {
      images = e.target.files;
      console.log(images)
      for (let image in images) {
        setFileInfo(images[image])
        const base = await getBase64(images[image])
        console.log(base)
        renderImages(fileInfo)
      }

    } else {
      images = e.target.files[0];
      setFileInfo(images); //all image info
      const picture = await getBase64(images); // base64 conversion
      setFile(picture);

    }
  };

  function renderImages(imageInfo) {
    if (!imageInfo) {
      return
    }
    return <img
      width="150px"
      height="150px"
      src={URL.createObjectURL(imageInfo)}
    />
  }

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  }

  const handleFileClear = () => {
    setFile(null);
  };

  const onEmojiClick = (e) => {
    const msgObj = newMessage + e.emoji
    setNewMessage(msgObj)
  }

  return (
    <>
      {(!Array.isArray(selectedChat)) ? (
        <>
          <Text
            className="msg-user-name"
          >
            {messages && (
              <>
                <Avatar
                  margin={"8px"}
                  size={"sm"}
                  name={getSender(user, selectedChat.users)} />
                <b>{getSender(user, selectedChat.users)}</b>
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#eee"
            w="100%"
            h="90%"
            borderRadius="lg"
            overflowY="hidden"
          >
            <div className="messages">
              <ScrollableChat messages={messages} />
              {file && (
                <Box>
                  <Box
                    className="image-container"
                    display={"flex"}
                    as="span"
                    mr={4}
                  >
                    <label>{file.name}</label>
                    {renderImages(fileInfo)}
                  </Box>
                  <Button onClick={handleFileClear}>Clear</Button>
                </Box>
              )}
            </div>
            <FormControl
              display={"flex"}
              onKeyDown={(e) => sendMessageData(e)}
              id="first-name"
              isRequired
              mt={3}
              position={"relative"}
            ><Box>
                <label htmlFor="file-input">
                  <Button as="span"
                    textAlign={"center"}
                    position={"absolute"}
                    right={"110px"}
                    zIndex={99}
                    margin={"1px"}
                    borderRadius={"30px"}
                    backgroundColor={"transparent"}
                    _hover={""}
                  >
                    <i className="fa fa-paperclip" aria-hidden="true" style={{ marginRight: "5px", marginTop: "2px" }}></i>
                  </Button>
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e)}
                  style={{ display: "none" }}
                  multiple
                />
              </Box>
              {showEmojis && (
                <Box display={"flex"}
                  translateY={"-1"}
                  position={"absolute"}
                  zIndex={"99"}
                  bottom={"45px"}
                  right={"80px"}
                >
                  <Picker onEmojiClick={onEmojiClick} />
                </Box>
              )}
              <Input
                display={"flex"}
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
              <Button className="button" onClick={() => setShowEmojis(!showEmojis)}
                position={"absolute"}
                right={"77px"}
                zIndex={99}
                borderRadius={"30px"}
                backgroundColor="transparent"
              ><i className="fa fa-smile-o" aria-hidden="true" style={{ marginRight: "5px", marginTop: "2px" }} ></i></Button>
              <Button
                backgroundColor={"blue.500"}
                color={"white"}
                _hover={""}
                ml={3}
                paddingRight={"3px"}
                onClick={(e) => sendMessageData(e)}
                width={"60px"}
              ><i className="fa fa-paper-plane" aria-hidden="true" style={{ marginRight: "13px" }}></i>
              </Button>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3}>
            Click on a user to start conversion
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
