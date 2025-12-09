import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import PeanoLogo from "../imports/PeanoLogo";
import symbolPeano from "../assets/symbol-peano-outlined.png";

type Stage = "closed" | "greet" | "askName" | "askEmail" | "askPhone" | "thanks";

type Message = {
  id: string;
  type: "bot" | "user";
  text: string;
};

// Schemas de validação
const emailSchema = z.string().email("Hmm, esse e-mail parece inválido. Tente novamente.");
const phoneSchema = z.string().min(10, "O número parece curto demais. Digite com DDD, por favor.");

export default function LeadChat() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("closed");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  
  // Form data
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

  // Show typing for 2s, then greet.
  useEffect(() => {
    if (open && stage === "closed" && !hasGreeted.current) {
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        addMessage("bot", "Olá! Boas-vindas à Peano! Em que posso te ajudar?");
        setStage("greet");
        hasGreeted.current = true;
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [open, stage]);

  const addMessage = (type: "bot" | "user", text: string) => {
    setMessages((prev) => [...prev, { id: Math.random().toString(36).substr(2, 9), type, text }]);
  };

  const submitLeadToResend = async (data: { name: string; email: string; phone: string }) => {
    console.log("Preparing to send to Resend:", data);
    // Aqui você implementaria a chamada para sua API que conecta com o Resend
    // Exemplo:
    // await fetch('/api/send-email', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     from: 'onboarding@resend.dev',
    //     to: 'contato@peano.com.br',
    //     subject: 'Novo Lead via Chat',
    //     html: `<p>Nome: ${data.name}</p><p>Email: ${data.email}</p><p>Telefone: ${data.phone}</p>`
    //   })
    // });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    // Add user message immediately
    addMessage("user", trimmedInput);
    setInputValue("");
    setTyping(true);

    // Process response with delay
    setTimeout(() => {
      setTyping(false);

      if (stage === "greet") {
        // User sent their first message (intent), now ask for name
        addMessage("bot", "Antes de continuarmos, poderia me informar seu nome?");
        setStage("askName");
      } else if (stage === "askName") {
        // Validate Name (simple check)
        if (trimmedInput.length < 2) {
          addMessage("bot", "Poderia me informar seu nome completo, por favor?");
          return;
        }
        setName(trimmedInput);
        addMessage("bot", `Prazer, ${trimmedInput}! Agora, qual é o seu melhor e-mail para contato?`);
        setStage("askEmail");
      } else if (stage === "askEmail") {
        // Validate Email
        const result = emailSchema.safeParse(trimmedInput);
        if (!result.success) {
          addMessage("bot", result.error.errors[0].message);
          return;
        }
        setEmail(trimmedInput);
        addMessage("bot", "Perfeito! E para finalizar, qual seu número de WhatsApp ou telefone?");
        setStage("askPhone");
      } else if (stage === "askPhone") {
        // Validate Phone
        const result = phoneSchema.safeParse(trimmedInput.replace(/\D/g, "")); // remove non-digits for length check
        if (!result.success) {
          addMessage("bot", result.error.errors[0].message);
          return;
        }
        
        // Success!
        const phone = trimmedInput;
        addMessage("bot", `Obrigado, ${name}! Recebemos suas informações e um de nossos consultores entrará em contato em breve.`);
        setStage("thanks");

        // Send data
        submitLeadToResend({ name, email, phone });
      }
    }, 1000);
  };

  return (
    <div className="lead-chat-fixed">
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Abrir chat"
            onClick={() => setOpen(true)}
            className="lead-chat-button rounded-full flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: peanoBlue, width: 64, height: 64 }}
          >
            <img src={symbolPeano} alt="Chat" className="w-8 h-8 invert brightness-0" style={{ filter: "brightness(0) invert(1)" }} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="lead-chat-panel rounded-2xl overflow-hidden flex flex-col"
            style={{ width: 340, height: 500, backgroundColor: peanoDark, filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.25))" }}
          >
            <div className="lead-chat-header px-4 py-3 text-white flex items-center justify-between shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <PeanoLogo width={100} fill="white" />
              </motion.div>
              <button 
                onClick={() => { 
                  setOpen(false); 
                  // Optional: reset chat on close or keep history? 
                  // Keeping history for now, but resetting if stage is thanks could be good.
                  if (stage === "thanks") {
                     setStage("closed");
                     setMessages([]);
                     hasGreeted.current = false;
                  }
                }} 
                className="lead-close-button text-white hover:bg-white/10 rounded-full p-1 transition-colors"
                aria-label="Fechar chat"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Messages area */}
            <div className="lead-chat-messages p-6 text-white space-y-4">
              <AnimatePresence mode="popLayout">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.type === "bot" ? (
                      <BotBubble>{msg.text}</BotBubble>
                    ) : (
                      <UserBubble>{msg.text}</UserBubble>
                    )}
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex justify-start"
                  >
                    <TypingBubble text="Digitando..." />
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            {stage !== "thanks" && (
              <div className="lead-chat-footer p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2 w-full">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="lead-input flex-1 min-w-0 px-4 py-2.5 rounded-full bg-white/10 text-white placeholder-white/40 border border-white/10 focus:border-[#2FB8F7] focus:ring-1 focus:ring-[#2FB8F7] transition-all outline-none text-sm h-10"
                    placeholder="Digite sua mensagem..."
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="lead-submit-button shrink-0 size-10 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    style={{ backgroundColor: peanoBlue }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="bot-bubble rounded-2xl rounded-tl-none px-4 py-3 max-w-[85%] w-fit text-sm leading-relaxed shadow-sm bg-white/10 border border-white/5">
      {children}
    </div>
  );
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="rounded-2xl rounded-tr-none px-4 py-3 max-w-[85%] w-fit text-sm leading-relaxed shadow-sm text-white" 
      style={{ backgroundColor: "#2FB8F7" }}
    >
      {children}
    </div>
  );
}

function TypingBubble({ text }: { text: string }) {
  return (
    <div className="bot-bubble rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 max-w-[85%] bg-white/10 border border-white/5">
      <motion.span 
        animate={{ opacity: [0.4, 1, 0.4] }} 
        transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
        className="size-1.5 rounded-full bg-white/70" 
      />
      <motion.span 
        animate={{ opacity: [0.4, 1, 0.4] }} 
        transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
        className="size-1.5 rounded-full bg-white/70" 
      />
      <motion.span 
        animate={{ opacity: [0.4, 1, 0.4] }} 
        transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
        className="size-1.5 rounded-full bg-white/70" 
      />
      <span className="text-white/50 text-xs ml-2">{text}</span>
    </div>
  );
}
