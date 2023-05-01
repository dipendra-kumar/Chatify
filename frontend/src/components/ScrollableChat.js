import React, { useEffect, useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameUser,
  isSameSender,
  isSameSenderMargin,
} from "../config/ChatLogics";
import { Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";


const ScrollableChat = ({ messages }) => {

  let userInfo = useSelector(state => state.getAin1Slice.getUserData);
  const [cardViewIsActive, setCardViewIsActive] = useState(false)

  const enlargeImage = (m) => {
    window.open(m.content);
  }

  const openCardView = (e) => {
    e.preventDefault();
    setCardViewIsActive(!cardViewIsActive);

  };

  return (
    <ScrollableFeed   >
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {isSameSender(messages, m, i, userInfo._id)}

            <span
              style={{
                backgroundColor: `${m.sender._id === userInfo._id ? "#3182CE" : "#c9d4d6"
                  }`,
                color: `${m.sender._id === userInfo._id ? "#ffffff" : "#000000"
                  }`,
                padding: "3px",
                borderRadius: "5px",
                paddingRight: "10px",
                paddingLeft: "10px",
                maxWidth: "75%",
                marginRight: "15px",
                marginLeft: isSameSenderMargin(messages, m, i, userInfo._id),
                marginTop: isSameUser(messages, m, i, userInfo._id) ? 3 : 10,

              }}
            >
              {m.contentType == "text" ? (
                m.content
              ) : (
                <Image
                  className="image-rendering"
                  width={"250px"}
                  marginTop={"5px"}
                  marginBottom={"5px"}
                  borderRadius={"5px"}
                  src={m.content}
                  cursor={"pointer"}

                />
              )}

            </span>
          </div>
        ))
      }
    </ScrollableFeed >
  );
};
export default ScrollableChat;
