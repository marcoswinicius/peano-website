import PeanoLogo from "../imports/PeanoLogo";
import { Button } from "./ui/button";
import { ArrowRight, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  } as const;

  const rightCard = {
    hidden: { opacity: 0, y: 20, scale: 0.98, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 } },
  } as const;

  // Title: robust blur + fade-in (no clip-path to avoid visibility issues)
  const titleVariant = {
    hidden: { opacity: 0, y: 8, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  } as const;

  return (
    <section className="relative text-white overflow-hidden bg-transparent">
      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
        {/* Logo */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <PeanoLogo fill="white" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            className="space-y-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h1
              className="text-5xl lg:text-6xl tracking-tight"
              variants={titleVariant}
              initial="hidden"
              animate="show"
            >
              Simplifique o controle financeiro da sua empresa com o Peano Corp
            </motion.h1>
            <motion.p className="text-xl text-gray-200" variants={item}>
              O cartão corporativo que une tecnologia, gestão e autonomia. Controle gastos em tempo real, defina limites inteligentes e otimize sua operação com a mesma segurança de uma infraestrutura bancária.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4" variants={item}>
              <Button size="lg" className="bg-[#2FB8F7] hover:bg-[#2FB8F7]/90 text-white">
                Começar agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/20" variants={container}>
              {[
                { title: "Custo Zero", desc: "Cartão Standard" },
                { title: "Segurança Bancária", desc: "Infraestrutura robusta" },
                { title: "Suporte humanizado", desc: "Sempre disponível" },
                { title: "100% de disponibilidade", desc: "Sempre online" },
              ].map((s, i) => (
                <motion.div key={i} variants={item}>
                  <div className="text-2xl mb-1">{s.title}</div>
                  <div className="text-sm text-gray-300">{s.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right content - Card mockup */}
          <motion.div className="relative lg:pl-12" variants={rightCard} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <div className="relative">
              {/* Floating cards */}
              <motion.div
                className="absolute -top-8 -right-8 w-80 h-48 bg-gradient-to-br from-[#6858F9] to-[#2FB8F7] rounded-2xl shadow-2xl rotate-6 opacity-80"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 0.8 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                viewport={{ once: true }}
              />
              <motion.div
                className="relative w-80 h-48 bg-gradient-to-br from-[#2FB8F7] to-[#6858F9] rounded-2xl shadow-2xl p-6 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <CreditCard className="h-10 w-10 text-white/90" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-white/80 mb-1">Mastercard</div>
                    <div className="flex gap-1">
                      <div className="w-6 h-6 rounded-full bg-red-500 opacity-80" />
                      <div className="w-6 h-6 rounded-full bg-yellow-500 opacity-80 -ml-2" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-lg tracking-wider mb-2">•••• •••• •••• 8742</div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs text-white/70">Titular</div>
                      <div className="text-sm">João Silva</div>
                    </div>
                    <div className="text-xs text-white/70">PEANO</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
