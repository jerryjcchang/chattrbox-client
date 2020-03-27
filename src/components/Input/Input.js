import React from "react";

import "./Input.css";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="form" onSubmit={e => sendMessage(e)}>
      <input
        className="input"
        type="text"
        placeholder="Your message here..."
        value={message}
        onChange={e => {
          setMessage(e.target.value);
        }}
        onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
      />
      <button type="submit" className="sendButton">
        Send
      </button>
    </form>
  );
};

export default Input;
