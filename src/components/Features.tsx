import { FileText, Shield, CreditCard, BarChart3, Lock, Zap } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Relatórios de gastos em tempo real",
    description: "Acompanhe todas as despesas da sua empresa de forma centralizada e visualize relatórios detalhados que facilitam a gestão fiscal."
  },
  {
    icon: Shield,
    title: "Bloqueio por categoria",
    description: "Defina limites e bloqueie categorias específicas por cartão, garantindo que cada colaborador gaste apenas no que foi autorizado."
  },
  {
    icon: CreditCard,
    title: "Cartões virtuais e físicos",
    description: "Crie cartões virtuais para assinaturas e compras online, além de cartões físicos para despesas do dia a dia."
  },
  {
    icon: BarChart3,
    title: "Controle total de gastos",
    description: "Gerencie limites individuais, categorias permitidas e acompanhe cada transação em tempo real."
  },
  {
    icon: Lock,
    title: "Segurança e conformidade",
    description: "Dados criptografados e processos seguros para proteger as informações financeiras da sua empresa."
  },
  {
    icon: Zap,
    title: "Maximização de deduções fiscais",
    description: "Relatórios organizados que facilitam o trabalho do contador e identificam gastos dedutíveis de impostos."
  }
];

export function Features() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl mb-4 text-[#44216a]">
            Tudo que sua PME precisa em um só lugar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simplifique a gestão de despesas corporativas e elimine os processos manuais que consomem tempo e recursos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#44216a] to-[#5f5275] rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl mb-3 text-[#44216a]">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
