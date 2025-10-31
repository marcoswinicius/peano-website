import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Cadastre sua empresa",
    description: "Processo 100% digital e rápido. Em minutos você já pode começar a usar."
  },
  {
    number: "02",
    title: "Crie cartões para sua equipe",
    description: "Gere cartões virtuais ou físicos nominais para cada colaborador com limites personalizados."
  },
  {
    number: "03",
    title: "Defina regras e limites",
    description: "Configure categorias permitidas, valores máximos e bloqueios por cartão."
  },
  {
    number: "04",
    title: "Acompanhe em tempo real",
    description: "Visualize todas as transações, gere relatórios e tenha controle total dos gastos."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white via-purple-50/30 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #44216a 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#44216a]/10 to-[#6858F9]/10 text-[#44216a] text-sm font-medium border border-[#44216a]/20">
              Processo Simplificado
            </span>
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#44216a] via-[#5f5275] to-[#44216a] bg-clip-text text-transparent">
            Como funciona
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comece a usar o Peano em 4 passos simples
          </p>
        </motion.div>

        <div className="relative">
          {/* Flow line connecting all cards - Div approach for reliability */}
          <div className="block pointer-events-none absolute inset-x-[7%] top-[96px] z-20">
            {/* Static base line to guarantee visibility */}
            <div className="h-1 w-full rounded-full bg-gradient-to-r from-[#44216a] via-[#2FB8F7] to-[#6858F9]" />
            {/* Animated glow overlay */}
            <motion.div
              className="h-1 w-full rounded-full bg-gradient-to-r from-[#44216a] via-[#2FB8F7] to-[#6858F9] blur-md opacity-60"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.2 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="relative group"
                variants={cardVariants}
              >
                {/* Connector arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-[96px] -right-4 -translate-y-1/2 transform z-30 items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.0 + index * 0.2, duration: 0.4 }}
                      className="bg-white rounded-full p-1.5 shadow-lg ring-2 ring-[#2FB8F7]/20"
                    >
                      <ArrowRight className="h-5 w-5 text-[#2FB8F7]" strokeWidth={2.5} />
                    </motion.div>
                  </div>
                )}
              
              <div className="relative h-full bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-purple-100/50 group-hover:border-[#44216a]/20 group-hover:-translate-y-1">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#44216a]/0 to-[#6858F9]/0 group-hover:from-[#44216a]/5 group-hover:to-[#6858F9]/5 transition-all duration-300" />
                
                <div className="relative">
                  {/* Large number background */}
                  <div className="absolute -top-4 -left-2 text-[120px] font-bold leading-none bg-gradient-to-br from-[#44216a]/5 to-[#5f5275]/5 bg-clip-text text-transparent select-none">
                    {step.number}
                  </div>
                  
                  {/* Icon badge */}
                  <div className="relative mb-6 inline-flex">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2FB8F7] to-[#6858F9] rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                    <div className="relative w-14 h-14 bg-gradient-to-br from-[#2FB8F7] to-[#6858F9] rounded-2xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <CheckCircle2 className="h-7 w-7 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold mb-3 text-[#44216a] group-hover:text-[#2FB8F7] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </div>
    </section>
  );
}
