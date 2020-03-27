import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [redirect, setRedirect] = useState(false);

  // const ENDPOINT = "localhost:5000";
  const ENDPOINT = "https://chattrbox-server.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, error => {
      if (error) {
        Swal.fire({ icon: "error", title: "Oops", text: error });
        setRedirect(true);
      }
    });
    return name => {
      socket.emit("disconnect", { name });
      setRedirect(false);
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages(messages => [...messages, message]);
    });
  }, []);

  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, error => {
        if (error) {
          Swal.fire({ icon: "error", title: "Oops", text: error.messag });
        } else {
          setMessage("");
        }
      });
    }
  };

  return (
    <div>
      {redirect ? <Redirect to="/" /> : null}
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
