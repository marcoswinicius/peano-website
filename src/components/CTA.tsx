import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="margin-b border-b border-white py-20 lg:py-32 bg-[#44216a] text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-6xl mb-6">
          Pronto para transformar a gestão de despesas da sua empresa?
        </h2>
        
        <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          Junte-se às empresas que já eliminaram os reembolsos e ganharam controle total sobre seus gastos corporativos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-[#2FB8F7] hover:bg-[#2FB8F7]/90 text-white text-lg px-8">
            <a href="#/contato" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Peça seu cartão agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white text-lg px-8">
            <a href="#/contato" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Agendar demonstração
            </a>
          </Button>
        </div>

        <p className="text-sm text-gray-300 mt-8">
          Sem análise de crédito complicada • Setup em minutos • Suporte em português
        </p>
      </div>
    </section>
  );
}
