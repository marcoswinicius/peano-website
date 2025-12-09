import { Check } from "lucide-react";
import { motion } from "framer-motion";
import whiteCardImg from "../assets/white-card.png";
import blackCardImg from "../assets/black-card.png";

const cards = [
  {
    name: "Peano White",
    image: whiteCardImg,
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
    image: blackCardImg,
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
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
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
              className="group bg-white rounded-2xl bg-red-500 p-8 border border-gray-200/50 shadow-xl transition-all duration-500"
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              whileHover={{ y: -12 }}
            >
              {/* Card image */}
              <motion.div 
                className="w-full aspect-[1.586] rounded-2xl mb-8 shadow-2xl overflow-hidden"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <img 
                  src={card.image} 
                  alt={card.name}
                  className="w-full h-full object-cover"
                />
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
