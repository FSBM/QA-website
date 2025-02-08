import React from "react";

interface Props{
    type?: string;
    content?:string;
}



const ChatMessage: React.FC<Props> = ({ type, content }) => {
  return (
    <div className={`chat-message ${type}`}>
      <div className="message-content">
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;