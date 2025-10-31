import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "O que é o Peano Corporate?",
    answer: "O Peano Corporate é um cartão corporativo gratuito para simplificar seus gastos corporativos. Ele foi criado para empresas que buscam mais controle financeiro, gestão de despesas inteligente e tecnologia de ponta. Tudo em uma única plataforma."
  },
  {
    question: "Quais são os principais benefícios do Peano Corporate?",
    answer: "Sem anuidade e sem taxa de emissão. Controle de gastos em tempo real via aplicativo. Emissão instantânea de cartões físicos e virtuais. Limites configuráveis por colaborador, centro de custo ou categoria. Dashboard completo para análise e relatórios de despesas."
  },
  {
    question: "Como solicitar o Peano Corporate?",
    answer: "O processo é 100% digital. Basta preencher o formulário no site e aguardar o contato do nosso time. Após a aprovação, você poderá emitir cartões e começar a usar imediatamente."
  },
  {
    question: "Quais tipos de despesas podem ser pagas com o cartão corporativo?",
    answer: "Despesas operacionais, assinaturas de software, viagens corporativas, compras de suprimentos e pagamentos de fornecedores. Tudo o que faz parte da rotina do seu negócio."
  },
  {
    question: "O Peano Corporate possui anuidade ou custos escondidos?",
    answer: "Não. O Peano Corporate é totalmente gratuito — sem anuidade, sem mensalidade e sem taxa de emissão para o cartão virtual."
  },
  {
    question: "Como gerenciar os gastos realizados com o Peano Corporate?",
    answer: "Todos os gastos ficam disponíveis em tempo real no painel de controle. Você pode categorizar despesas, definir limites por equipe e gerar relatórios automáticos, sem precisar de planilhas manuais."
  },
  {
    question: "É possível integrar o Peano Corporate com outros sistemas de gestão?",
    answer: "Sim. A plataforma Peano permite integrações com ERPs, CRMs e sistemas financeiros, automatizando o fluxo de dados e conciliando despesas de forma inteligente."
  },
  {
    question: "O que fazer em caso de perda ou roubo do cartão?",
    answer: "Você pode bloquear o cartão imediatamente pelo aplicativo ou pelo painel web. Nosso suporte 24h está disponível para auxiliar na reemissão do cartão e na segurança da sua conta."
  }
];

export function FAQ() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl mb-4 text-[#44216a]">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600">
            Tire suas dúvidas sobre o Peano Corporate
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white border border-gray-200 rounded-2xl px-6 overflow-hidden"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="text-lg text-[#44216a] pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
