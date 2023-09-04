import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";

const ChatMessage = ({ userId, userName, content, code, color, userLogged }) => {
  const isLogged = userId === userLogged;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isLogged ? "row-reverse" : "row",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      {!isLogged && (
        <Avatar
          style={{
            backgroundColor: color, // Remove curly braces here
            marginRight: "10px",
          }}
        >
          {userName.charAt(0)}
        </Avatar>
      )}
      <div
        style={{
          backgroundColor:
            code === 0 ? (isLogged ? "#d2f5ba" : "#f5f5f5") : "#f5f5f5",
          color: "black",
          padding: "10px",
          borderRadius: "10px",
          maxWidth: "40%",
          textAlign: isLogged ? "right" : "left",
        }}
      >
        {!isLogged && <strong>{userName}</strong>}
        <p>{content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
