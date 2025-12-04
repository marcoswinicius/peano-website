import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PeanoLogo from "../imports/PeanoLogo";

type Stage = "closed" | "greet" | "askName" | "askEmail" | "askPhone" | "thanks";

type Message = {
  type: "bot" | "user";
  text: string;
};

export default function LeadChat() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("closed");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const hasGreeted = useRef(false);

  const peanoBlue = "#2FB8F7";
  const peanoDark = "#312C38";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  // Show typing for 2s, then greet. Guard with ref to handle React StrictMode double-invoke.
  useEffect(() => {
    if (open && stage === "closed" && !hasGreeted.current) {
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setMessages([{ type: "bot", text: "Olá! Boas-vindas à Peano! Em que posso te ajudar?" }]);
        setStage("greet");
        hasGreeted.current = true;
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [open, stage]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    // Add user message
    setMessages((prev) => [...prev, { type: "user", text: trimmedInput }]);
    setInputValue("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      if (stage === "greet") {
        // First user message - ask for name
        setMessages((prev) => [...prev, { type: "bot", text: "Antes de começarmos, poderia me informar seu nome?" }]);
        setStage("askName");
      } else if (stage === "askName") {
        // User provided name - ask for email
        setName(trimmedInput);
        setMessages((prev) => [...prev, { type: "bot", text: `Prazer em conhecê-lo ${trimmedInput}, poderia me informar o seu e-mail?` }]);
        setStage("askEmail");
      } else if (stage === "askEmail") {
        // User provided email - ask for phone
        setEmail(trimmedInput);
        setMessages((prev) => [...prev, { type: "bot", text: `${name}, agora pra finalizar, poderia me informar seu número de telefone?` }]);
        setStage("askPhone");
      } else if (stage === "askPhone") {
        // User provided phone - finish
        setMessages((prev) => [...prev, { type: "bot", text: `Obrigado pelas informações ${name}, em breve um de nossos consultores irá contatá-lo` }]);
        setStage("thanks");
      }
    }, 800);
  };

  return (
    <div className="lead-chat-fixed">
      {/* Floating button */}
      {!open && (
        <button
          aria-label="Abrir chat"
          onClick={() => setOpen(true)}
          className="lead-chat-button rounded-full"
          style={{ backgroundColor: peanoBlue, color: "white", width: 56, height: 56 }}
        >
          <span style={{ fontSize: 24, lineHeight: 1 }}>💬</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="lead-chat-panel rounded-2xl overflow-hidden flex flex-col"
          style={{ width: 340, height: 500, backgroundColor: peanoDark, filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.25))" }}
        >
          <div className="lead-chat-header px-4 py-3 text-white flex items-center justify-between">
                    {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <PeanoLogo width={100} fill="white" />
        </motion.div>
            <button 
              onClick={() => { 
                setOpen(false); 
                setStage("closed"); 
                setMessages([]);
                setInputValue("");
                setName("");
                setEmail("");
                hasGreeted.current = false;
              }} 
              className="lead-close-button text-white"
              aria-label="Fechar chat"
            >
              ✕
            </button>
          </div>

          {/* Messages area */}
            <div className="lead-chat-messages p-6 text-white space-y-3 flex-1 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              msg.type === "bot" ? (
                <BotBubble key={index}>{msg.text}</BotBubble>
              ) : (
                <UserBubble key={index}>{msg.text}</UserBubble>
              )
            ))}
            {typing && <TypingBubble text="Digitando..." />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area - fixed at bottom */}
          {stage !== "thanks" && (
            <div className="lead-chat-footer p-6 border-t border-white/10 overflow-hidden">
              <form onSubmit={handleSendMessage} className="flex items-stretch gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="lead-input flex-1 min-w-0 w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20"
                  placeholder="Digite sua mensagem..."
                  disabled={false}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="lead-submit-button shrink-0 px-4 py-2 rounded-lg font-medium text-white"
                  style={{ backgroundColor: peanoBlue }}
                >
                  Enviar
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="bot-bubble rounded-lg px-3 py-2 max-w-[85%]">
      {children}
    </div>
  );
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-auto max-w-[85%]">
      <div 
        className="rounded-lg px-3 py-2 text-white" 
        style={{ backgroundColor: "#2FB8F7" }}
      >
        {children}
      </div>
    </div>
  );
}

function TypingBubble({ text }: { text: string }) {
  return (
    <div className="bot-bubble rounded-lg px-3 py-2 flex items-center gap-2 max-w-[85%]">
      <span className="typing-dot inline-block size-2 rounded-full bg-white/60" />
      <span className="typing-dot inline-block size-2 rounded-full bg-white/60" />
      <span className="typing-dot inline-block size-2 rounded-full bg-white/60" />
      <span className="text-white/80 text-sm ml-1">{text}</span>
    </div>
  );
}
