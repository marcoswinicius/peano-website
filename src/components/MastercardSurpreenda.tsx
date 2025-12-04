import { Gift, Plane, Coffee, Laptop } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    icon: Plane,
    title: "Viagens",
    description: "Descontos em hotéis, passagens e aluguel de carros"
  },
  {
    icon: Coffee,
    title: "Restaurantes",
    description: "Benefícios em estabelecimentos parceiros"
  },
  {
    icon: Laptop,
    title: "Softwares",
    description: "Economia em ferramentas de gestão e produtividade"
  },
  {
    icon: Gift,
    title: "Muito mais",
    description: "Centenas de parceiros e ofertas exclusivas"
  }
];

export function MastercardSurpreenda() {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }}>
            <motion.div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#44216a] to-[#5f5275] text-white px-4 py-2 rounded-full mb-6" variants={item}>
              <Gift className="h-5 w-5" />
              <span className="text-sm">Benefício exclusivo</span>
            </motion.div>
            
            <motion.h2 className="text-4xl lg:text-5xl mb-6 text-[#44216a]" variants={item}>
              Peano Corp + Mastercard Surpreenda
            </motion.h2>
            
            <motion.p className="text-xl text-gray-600 mb-6" variants={item}>
              Acumule pontos a cada compra e troque por benefícios exclusivos em mais de 100 parceiros Mastercard. Economize em tecnologia, viagens e serviços empresariais.
            </motion.p>

            <motion.p className="text-xl text-gray-600 mb-8" variants={item}>
              Cada compra vale 1 ponto — e você pode usá-los para obter até 50% de desconto em produtos e serviços essenciais para sua empresa.
            </motion.p>
          </motion.div>

          {/* Right content - Categories */}
          <motion.div className="grid grid-cols-2 gap-6" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#44216a] to-[#5f5275] rounded-xl flex items-center justify-center mb-4">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-[#44216a]">{category.title}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
