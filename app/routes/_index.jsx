
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { Form } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
let socket
export default function Index() {
  const [message, setMessage] = useState([])
  const [text, setText] = useState("")
  useEffect(()=>{
    socket = io()

    socket.on("receivemsg", function(recmessage){
      setMessage(prev => [...prev, recmessage])
    })

    return () => socket.off("receivemsg");
  },[])

  const submit = () =>{
    socket.emit("sendmsg", text);

  }
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
      <input onChange={(e) => setText(e.target.value)}/>
      <button onClick={submit}>submit</button>
      <ul>
        {message.map((messages, index)=>(
          <li key={index}>{messages}</li>
        ))}
      </ul>
    </div>
  );
}
