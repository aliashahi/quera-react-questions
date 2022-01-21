import React, { useRef } from "react";
import "./MessageForm.css";

function MessageForm({ onMessageSend }) {
  const input = useRef(null);
  function handleFormSubmit(event) {
    event.preventDefault();
    // if()
    const value = input.current.value;
    if (value && value.trim().length > 0) {
      onMessageSend(value);
      input.current.value = "";
    }
  }
  return (
    <form
      className="MessageForm"
      onSubmit={handleFormSubmit}
      data-testid="submit-message"
    >
      <div className="input-container">
        <input
          data-testid="input-message"
          type="text"
          autoFocus
          placeholder="پیام خود را اینجا بنویسید..."
          ref={input}
        />
      </div>
      <div className="button-container">
        <button type="submit">ارسال</button>
      </div>
    </form>
  );
}

export default MessageForm;
