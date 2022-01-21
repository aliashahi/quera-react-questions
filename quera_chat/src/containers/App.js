import React, { useState } from "react";
import MessageForm from "../components/MessageForm/MessageForm";
import MessageList from "../components/MessageList/MessageList";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);

  const onMessageSend = async (my_message) => {
    setMessages([...messages, { me: true, body: my_message }]);
    try {
      const req = await fetch(`http://localhost:3001/message/${my_message}`);
      const { message } = await req.json();
      const new_message = {
        me: false,
        body: message,
      };
      setMessages([...messages, { me: true, body: my_message }, new_message]);
    } catch (e) {}
  };

  return (
    <div className="App">
      <MessageList messages={messages} />
      <MessageForm onMessageSend={onMessageSend} />
    </div>
  );
}

export default App;
