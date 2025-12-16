import { Check } from "lucide-react";
import { Button } from "./ui/button";

const plans = [
  {
    name: "Standard",
    price: "0",
    description: "Perfeito para começar",
    features: [
      "Cartões virtuais e físicos",
      "Relatórios de gastos",
      "Bloqueio por categoria",
      "Controle de limites",
      "Acesso ao Mastercard Surpreenda",
      "Suporte por email"
    ],
    highlighted: false
  },
  {
    name: "Black",
    price: "54",
    description: "Para empresas que querem mais",
    features: [
      "Tudo do Standard, mais:",
      "Limite ampliado",
      "Benefícios premium Mastercard",
      "Suporte prioritário",
      "Relatórios avançados",
      "Cartão com design exclusivo"
    ],
    highlighted: true
  }
];

export function Pricing() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl mb-4 text-[#44216a]">
            Planos transparentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha o plano ideal para sua empresa. Sem taxas escondidas, sem surpresas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-[#44216a] to-[#5f5275] text-white shadow-2xl transform scale-105'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="inline-block bg-[#2FB8F7] text-white px-4 py-1 rounded-full text-sm mb-4">
                  Mais popular
                </div>
              )}
              
              <h3 className={`text-2xl mb-2 ${plan.highlighted ? 'text-white' : 'text-[#44216a]'}`}>
                {plan.name}
              </h3>
              
              <p className={`mb-6 ${plan.highlighted ? 'text-gray-200' : 'text-gray-600'}`}>
                {plan.description}
              </p>
              
              <div className="mb-8">
                <span className="text-5xl">R$ {plan.price}</span>
                <span className={`text-lg ${plan.highlighted ? 'text-gray-200' : 'text-gray-600'}`}>
                  /mês por cartão
                </span>
              </div>

              <Button
                asChild
                className={`w-full mb-8 ${
                  plan.highlighted
                    ? 'bg-white text-[#44216a] hover:bg-gray-100'
                    : 'bg-[#44216a] text-white hover:bg-[#5f5275]'
                }`}
                size="lg"
              >
                <a href="#/contato">Começar agora</a>
              </Button>

              <ul className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.highlighted ? 'bg-white/20' : 'bg-[#44216a]/10'
                    }`}>
                      <Check className={`h-3 w-3 ${plan.highlighted ? 'text-white' : 'text-[#44216a]'}`} />
                    </div>
                    <span className={plan.highlighted ? 'text-gray-100' : 'text-gray-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Precisa de um plano customizado para sua empresa? <a href="#/contato" className="text-[#44216a] hover:underline">Fale com nosso time</a>
          </p>
        </div>
      </div>
    </section>
  );
}
