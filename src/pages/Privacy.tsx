import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  const sections = [
    {
      title: "Quais dados coletamos",
      items: [
        "Dados de contato (nome, e-mail, telefone) enviados em formulários ou chat.",
        "Dados técnicos mínimos para segurança (IP, logs de acesso).",
        "Preferências de comunicação fornecidas por você.",
      ],
    },
    {
      title: "Para que usamos",
      items: [
        "Responder solicitações e propostas comerciais.",
        "Cumprir obrigações legais e prevenir fraude.",
        "Melhorar a experiência do site e nossos serviços.",
      ],
    },
    {
      title: "Compartilhamento",
      items: [
        "Prestadores de serviços essenciais (ex.: e-mail transacional) sob contrato e confidencialidade.",
        "Autoridades, quando houver obrigação legal ou ordem específica.",
      ],
    },
    {
      title: "Seus direitos (LGPD)",
      items: [
        "Confirmar se tratamos seus dados e pedir acesso.",
        "Corrigir, anonimizar ou excluir dados quando aplicável.",
        "Revogar consentimento e se opor a tratamentos permitidos por lei.",
        "Solicitar portabilidade e informações sobre compartilhamento.",
      ],
    },
    {
      title: "Retenção",
      items: [
        "Mantemos dados apenas pelo tempo necessário para os fins declarados ou para cumprimento legal/contratual.",
      ],
    },
    {
      title: "Segurança",
      items: [
        "Controles técnicos e administrativos para proteger dados contra acesso indevido, perda ou alteração.",
      ],
    },
    {
      title: "Contato do DPO/Privacidade",
      items: [
        "E-mail: privacidade@peano.com.br",
        "Use o formulário de contato para exercer direitos de titular.",
      ],
    },
  ];

  return (
    <div className="privacy-page">
      <section className="privacy-section">
        <div className="privacy-bg" />
        <div className="privacy-pattern" />

        <button
          type="button"
          aria-label="Voltar"
          className="contact-back-btn"
          onClick={() => {
            if (typeof window !== "undefined") {
              const wasPrivacy = window.location.hash === "#/privacidade" || window.location.hash === "#privacidade";
              if (wasPrivacy) {
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

        <div className="privacy-inner">
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className="privacy-heading"
          >
            <h1 className="privacy-title">Política de Privacidade</h1>
            <p className="privacy-subtitle">
              Esta política descreve como tratamos seus dados pessoais em conformidade com a LGPD.
            </p>
          </motion.div>
          <div className="privacy-cards">
            {sections.map((section) => (
              <motion.div
                key={section.title}
                className="privacy-card"
                initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="privacy-card-title">{section.title}</h2>
                <ul className="privacy-card-list">
                  {section.items.map((item) => (
                    <li key={item} className="privacy-card-item">
                      <span className="privacy-bullet" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
