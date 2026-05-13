import { useState } from "react";
import "../css/Chatbot.css";
import chatGif from '../assets/Ai Robot Vector Art.gif'

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMsg = { role: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);
        try {
            const res = await fetch("http://localhost:4000/api/v1/chatbot/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input })
            });
            const data = await res.json();
            const botMsg = { role: "bot", text: data.reply || "No response" };
            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: "bot", text: "Error connecting to server" }
            ]);
        }
        setLoading(false);
    };
    return (
        <>
            <div className="chat-icon" onClick={() => setOpen(!open)}>
                <img src={chatGif}></img>
            </div>
            {open && (
                <div className="chat-box">
                    <div className="chat-header">
                        AI Assistant
                        <span onClick={() => setOpen(false)}>✖</span>
                    </div>
                    <div className="chat-body">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={msg.role === "user" ? "msg user" : "msg bot"}
                            >
                                {msg.text}
                            </div>
                        ))}

                        {loading && <div className="msg bot">Typing...</div>}
                    </div>
                    <div className="chat-footer">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type message..."
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </>
    );
}