import { Check } from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    name: "Peano Blue",
    color: "from-[#2FB8F7] to-[#6858F9]",
    chipColor: "bg-white/20",
    features: [
      "Cartão virtual para compras online e assinaturas de softwares.",
      "Criação instantânea via plataforma Peano.",
      "Limites configuráveis por transação.",
      "Ideal para marketing digital e ferramentas SaaS.",
      "Bloqueio e desbloqueio em tempo real."
    ]
  },
  {
    name: "Peano White",
    color: "from-gray-100 to-white",
    chipColor: "bg-gray-400/30",
    textDark: true,
    features: [
      "Cartão ideal para compras do dia a dia e despesas operacionais.",
      "Zero anuidade para sempre.",
      "Controle de gastos em tempo real via app.",
      "Emissão instantânea de cartões para colaboradores.",
      "Categorização automática de despesas."
    ]
  },
  {
    name: "Peano Black",
    color: "from-[#44216a] to-[#5f5275]",
    chipColor: "bg-white/20",
    features: [
      "Cartão premium para executivos com benefícios exclusivos e limites elevados.",
      "Cashback de até 2% em todas as compras corporativas.",
      "Acesso exclusivo a salas VIP em aeroportos.",
      "Seguro viagem internacional incluso.",
      "Concierge 24/7 para reservas e serviços."
    ]
  }
];

export function CardTypes() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl mb-4 text-[#44216a]">
            Um cartão para cada <span className="bg-gradient-to-r from-[#2FB8F7] to-[#6858F9] bg-clip-text text-transparent">tipo de gasto</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha o cartão Peano ideal para suas necessidades empresariais. Flexibilidade e controle total para sua empresa.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="group bg-white rounded-3xl p-8 border border-gray-200/50 shadow-xl transition-all duration-500"
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              whileHover={{ y: -12 }}
            >
              {/* Card mockup */}
              <motion.div 
                className={`w-full aspect-[1.586] bg-gradient-to-br ${card.color} rounded-2xl p-6 mb-8 shadow-2xl relative overflow-hidden`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent"></div>
                
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-black/10 blur-2xl"></div>
                
                {/* Logo */}
                <div className={`relative text-sm font-semibold mb-10 ${card.textDark ? 'text-gray-700' : 'text-white/95'}`}>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                    </div>
                    <span className="tracking-wider">PEANO</span>
                  </div>
                </div>

                {/* Chip with realistic design */}
                <div className={`relative w-14 h-11 ${card.chipColor} rounded-lg mb-10 overflow-hidden`}>
                  <div className="absolute inset-1 grid grid-cols-3 gap-0.5 p-1">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className={`rounded-sm ${card.textDark ? 'bg-gray-600/40' : 'bg-white/30'}`}></div>
                    ))}
                  </div>
                  <div className={`absolute inset-0 border ${card.textDark ? 'border-gray-600/20' : 'border-white/20'} rounded-lg`}></div>
                </div>

                {/* Decorative wave pattern */}
                <div className="absolute right-0 bottom-0 w-48 h-48 opacity-10 pointer-events-none">
                  <svg viewBox="0 0 200 200" className={card.textDark ? 'text-gray-400' : 'text-white'}>
                    <path fill="currentColor" d="M0,100 Q50,80 100,100 T200,100 L200,200 L0,200 Z" />
                  </svg>
                </div>

                {/* Card number */}
                <div className={`relative text-lg font-mono tracking-[0.3em] ${card.textDark ? 'text-gray-700' : 'text-white/95'} mb-4`}>
                  •••• •••• •••• 8742
                </div>

                {/* Cardholder info */}
                <div className={`relative flex justify-between items-end ${card.textDark ? 'text-gray-700' : 'text-white/90'}`}>
                  <div>
                    <div className="text-xs opacity-70 mb-1">Titular</div>
                    <div className="text-sm font-medium">NOME EMPRESA</div>
                  </div>
                  <div className="text-xs opacity-70">12/28</div>
                </div>

                {/* Mastercard logo - improved */}
                <div className="absolute bottom-6 right-6 flex items-center gap-0">
                  <div className="w-9 h-9 rounded-full bg-[#EB001B] shadow-lg"></div>
                  <div className="w-9 h-9 rounded-full bg-[#F79E1B] shadow-lg -ml-4"></div>
                </div>
              </motion.div>

              {/* Card info */}
              <h3 className="text-2xl font-bold mb-2 text-[#44216a]">{card.name}</h3>
              <div className="h-1 w-16 bg-gradient-to-r from-[#2FB8F7] to-[#6858F9] rounded-full mb-6"></div>

              <motion.ul 
                className="space-y-4"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } }
                }}
              >
                {card.features.map((feature, featureIndex) => (
                  <motion.li 
                    key={featureIndex} 
                    className="flex items-start gap-4 group/item"
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#2FB8F7] to-[#6858F9] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md group-hover/item:scale-110 transition-transform">
                      <Check className="h-3.5 w-3.5 text-white stroke-[2.5]" />
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed flex-1">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
