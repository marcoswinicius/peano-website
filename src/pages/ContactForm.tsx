import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; message: string }>(null);

  const validate = () => {
    const emailOk = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
    const phoneOk = /[0-9()\-+\s]{8,}/.test(phone);
    return emailOk && phoneOk;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!validate()) {
      setStatus({ ok: false, message: "Preencha um email e telefone válidos." });
      return;
    }
    setSubmitting(true);

    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });
      const data = await resp.json();
      if (!resp.ok || !data?.ok) {
        throw new Error(data?.error || "Falha ao enviar");
      }
      setStatus({ ok: true, message: "Recebemos seus dados! Retornaremos em breve." });
      setEmail("");
      setPhone("");
    } catch (err) {
      setStatus({ ok: false, message: "Não foi possível enviar agora. Tente novamente." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-section">
        <div className="contact-bg" />
        <div className="contact-pattern" />

        <button
          type="button"
          aria-label="Voltar"
          className="contact-back-btn"
          onClick={() => {
            console.log("[ContactForm] back button clicked", typeof window !== "undefined" ? window.location.hash : "no-window");
            if (typeof window !== "undefined") {
              const wasContact = window.location.hash === "#/contato" || window.location.hash === "#contato";
              if (wasContact) {
                window.location.hash = "#";
                return;
              }
              if (window.history.length > 1) {
                window.history.back();
                return;
              }
              window.location.hash = "#";
            }
          }}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="contact-inner">
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className="contact-heading"
          >
            <h1 className="contact-title">Fale com a gente</h1>
            <p className="contact-subtitle">Deixe seu contato e retornaremos rapidamente.</p>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="contact-form"
          >
            <div className="contact-grid" style={{ display: "grid", gap: "1.25rem" }}>
              <div className="contact-field">
                <Label htmlFor="email" className="contact-label">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="voce@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="contact-input"
                />
              </div>
              <div className="contact-field">
                <Label htmlFor="phone" className="contact-label">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="contact-input"
                />
              </div>

              {status && (
                <div className={`contact-status ${status.ok ? "ok" : "error"}`}>{status.message}</div>
              )}

              <div className="contact-buttons">
                <Button
                  size="lg"
                  className="btn-primary"
                  disabled={submitting}
                >
                  {submitting ? "Enviando..." : "Enviar"}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="btn-secondary"
                  onClick={() => {
                    setEmail("");
                    setPhone("");
                    setStatus(null);
                  }}
                >
                  Limpar
                </Button>
              </div>

              <div className="contact-privacy-note">
                <p>Seus dados são tratados conforme a LGPD e usados apenas para retorno comercial.</p>
                <p>
                  Consulte a nossa <a href="#/privacidade" className="contact-privacy-link">Política de Privacidade</a> antes de enviar.
                </p>
              </div>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
