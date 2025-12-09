import { DollarSign, FileText, TrendingUp, Smartphone } from "lucide-react";
import artboard1 from "../assets/artboard1.png";
import artboard2 from "../assets/artboard2.png";
import artboard3 from "../assets/artboard3.png";
import symbolPeano from "../assets/peano.png";
import { motion } from "framer-motion";

export function FeatureCards() {
  // Simple, reusable variants
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
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
    <section className="py-20 lg:py-32 relative overflow-hidden bg-transparent">
      
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
          >
            <motion.h2 className="text-4xl lg:text-5xl mb-6 text-white" variants={item}>
              Transforme a gestão financeira da sua empresa
            </motion.h2>
            <motion.p className="text-xl text-gray-300 max-w-3xl mx-auto" variants={item}>
              Descubra como a Tamborine pode simplificar e otimizar todos os processos de pagamento da sua empresa com tecnologia de ponta.
            </motion.p>
          </motion.div>

          {/* 3 Cards em cima */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
          {/* Card 1 */}
          <motion.div className="card-bg-gradient backdrop-blur-sm rounded-lg overflow-hidden border border-white/10" variants={item}>
            <div className="h-64 card-bg-1" />
            <div className="p-6">
              <h3 className="text-xl mb-3 text-white">Controle antes do gasto acontecer</h3>
              <p className="text-gray-200">
                Defina limites por centro de custo, categoria, equipe ou funcionário. Evite gastos fora da política da empresa e mantenha o orçamento sob controle em tempo real.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div className="card-bg-gradient backdrop-blur-sm rounded-lg overflow-hidden border border-white/10" variants={item}>
            <div className="h-64 card-bg-2" />
            <div className="p-6">
              <h3 className="text-xl mb-3 text-white">Adeus planilhas e relatórios manuais</h3>
              <p className="text-gray-200">
                Centralize suas despesas e automatize conciliações. O sistema identifica, categoriza e organiza cada gasto, sem papelada e sem retrabalho.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div className="card-bg-gradient backdrop-blur-sm rounded-lg overflow-hidden border border-white/10" variants={item}>
            <div className="h-64 card-bg-3" />
            <div className="p-6">
              <h3 className="text-xl mb-3 text-white">Gestão inteligente e economia real</h3>
              <p className="text-gray-200">
                Acompanhe os gastos corporativos com dashboards dinâmicos e relatórios automáticos. Identifique oportunidades de redução de custos e melhore a performance financeira da sua empresa.
              </p>
            </div>
          </motion.div>
          </motion.div>

          {/* Card horizontal */}
          <motion.div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10" variants={item} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <div className="grid lg:grid-cols-2 gap-0 items-center">
              <motion.div className="p-8 lg:p-10" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                <motion.div className="w-12 h-12 bg-[#2FB8F7] rounded-lg flex items-center justify-center mb-6" variants={item}>
                  <Smartphone className="h-6 w-6 text-white" />
                </motion.div>
                <motion.h3 className="text-2xl lg:text-3xl mb-4 text-white" variants={item}>
                  Baixe o app da Peano
                </motion.h3>
                <motion.p className="text-lg text-gray-200 mb-6" variants={item}>
                  Gerencie todos os gastos corporativos da sua empresa direto do seu celular. Disponível para iOS e Android.
                </motion.p>
                
                <motion.div className="flex flex-col sm:flex-row gap-4" variants={item}>
                  <a 
                    href="#" 
                    className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Disponível na</div>
                      <div className="text-sm">App Store</div>
                    </div>
                  </a>
                  
                  <a 
                    href="#" 
                    className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Disponível no</div>
                      <div className="text-sm">Google Play</div>
                    </div>
                  </a>
                </motion.div>
              </motion.div>
              <motion.div className="h-96 relative flex items-end justify-center overflow-visible" variants={item} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                <div className="w-full h-full card-bg-cellphone scale-125 translate-y-[35%] absolute top-8" />
                <div className="absolute top-10 left-8 z-10">
                  <motion.div className="card-floating-symbol" variants={item} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                    <img src={symbolPeano} alt="Peano Symbol" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
