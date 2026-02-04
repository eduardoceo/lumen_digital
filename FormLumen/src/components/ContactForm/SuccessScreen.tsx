import { Check, Sparkles, MessageCircle } from 'lucide-react';

interface SuccessScreenProps {
  logoUrl?: string;
}

const SuccessScreen = ({ logoUrl }: SuccessScreenProps) => {
  const whatsappLink =
    'https://wa.me/5547991414884?text=Olá!%20Acabei%20de%20enviar%20meus%20dados%20no%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20as%20soluções%20da%20Lumen.';

  return (
    <div className="text-center fade-in px-4">
      {/* Logo */}
      <div className="flex justify-center mb-10">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt="Logo"
            className="h-14 w-auto object-contain"
          />
        ) : (
          <div className="h-12 w-40 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground text-sm">
            Lumen Assessoria Digital
          </div>
        )}
      </div>

      {/* Check */}
      <div className="mb-10 inline-flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center success-checkmark">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <Check
              className="w-8 h-8 text-primary-foreground"
              strokeWidth={3}
            />
          </div>
        </div>
      </div>

      {/* Título */}
      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
        Obrigado!
      </h2>

      {/* Texto */}
      <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto mb-12">
        Recebemos suas informações. Nossa equipe entrará em contato em breve.
      </p>

      {/* Atendimento prioritário */}
      <div className="mb-14 max-w-xl mx-auto">
        <div className="relative rounded-3xl p-10 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-2xl">
          {/* Badge */}
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-white text-green-600 text-xs font-bold uppercase tracking-wide shadow-md">
            Prioritário
          </span>

          <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            ⚡ Atendimento Prioritário
          </h3>

          <p className="text-base md:text-lg opacity-95 mb-8">
            Quer ser atendido <strong>mais rápido</strong> e sem espera?  
            Fale agora direto com nosso time no WhatsApp.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full px-6 py-5 rounded-2xl bg-white text-green-600 text-lg font-bold hover:scale-[1.03] transition-transform"
          >
            <MessageCircle className="w-6 h-6" />
            Falar no WhatsApp agora
          </a>
        </div>
      </div>

      {/* Info final */}
      <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-muted-foreground">
        <Sparkles className="w-5 h-5 text-primary" />
        <span>Tempo médio de resposta: até 24h</span>
      </div>
    </div>
  );
};

export default SuccessScreen;
