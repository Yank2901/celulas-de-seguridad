import React from "react";

const ChatMessage = ({ code, message }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: code === 0 ? "row-reverse" : "row",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      {code === 1 && (
        <img
          src="https://via.placeholder.com/50"
          alt="Avatar"
          style={{ marginRight: "10px" }}
        />
      )}
      <div
        style={{
          backgroundColor: code === 0 ? "green" : "gray",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
          maxWidth: "70%",
        }}
      >
        {message}
      </div>
    </div>
  );
}

export default ChatMessage;