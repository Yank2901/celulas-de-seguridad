import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";

const ChatMessage = ({
  userId,
  userName,
  content,
  code,
  color,
  userLogged,
}) => {
  const isLogged = userId === userLogged;
  const notifications = [
    {
      message: "ha notificado una actividad sospechosa 🚨",
      color: "#FF9999",
      code: "2",
    },
    {
      message: "ha notificado un robo 🚨",
      color: "#FFFF99",
      code: "3",
    },
    {
      message: "ha notificado una alerta de seguridad en las calles 🚓",
      color: "#9999FF",
      code: "4",
    },
    {
      message: "ha notificado una alerta de seguridad escolar 🚸",
      color: "#CC99CC",
      code: "5",
    },
    {
      message: "ha notificado un incendio 🔥",
      color: "#FFCC99",
      code: "6",
    },
  ];

  // Buscar el color correspondiente al código
  const notificationColor = notifications.find((item) => item.code === code)?.color || "#f5f5f5";
  const notificationMessage = notifications.find((item) => item.code === code)?.message;

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
            backgroundColor: color,
            marginRight: "10px",
          }}
        >
          {userName.charAt(0)}
        </Avatar>
      )}
      {code === "0" ? (
        <div
          style={{
            backgroundColor: isLogged ? "#d2f5ba" : "#f5f5f5",
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
      ) : (
        <div
          style={{
            backgroundColor: notificationColor,
            color: "black",
            padding: "10px",
            borderRadius: "10px",
            maxWidth: "40%",
            textAlign: "center",
            margin: "0 auto",
            
          }}
        >
          <strong>{userName}</strong>
          <p>{notificationMessage}</p>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
