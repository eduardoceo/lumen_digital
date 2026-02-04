import { Check, Sparkles, MessageCircle } from 'lucide-react';

interface SuccessScreenProps {
  logoUrl?: string;
}

const SuccessScreen = ({ logoUrl }: SuccessScreenProps) => {
  const whatsappLink =
    'https://wa.me/5547991414884?text=Olá!%20Acabei%20de%20enviar%20meus%20dados%20no%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20as%20soluções%20da%20Lumen.';

  return (
    <div className="text-center fade-in">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        {logoUrl ? (
          <img src={logoUrl} alt="Logo" className="h-14 w-auto object-contain" />
        ) : (
          <div className="h-12 w-32 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground text-sm">
            Lumen Assessoria Digital
          </div>
        )}
      </div>

      {/* Check */}
      <div className="mb-8 inline-flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center success-checkmark">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
            <Check className="w-7 h-7 text-primary-foreground" strokeWidth={3} />
          </div>
        </div>
      </div>

      <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
        Obrigado!
      </h2>

      <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto mb-10">
        Recebemos suas informações. Nossa equipe entrará em contato em breve.
      </p>

      {/* Atendimento prioritário */}
      <div className="mb-10">
        <p className="text-sm font-semibold text-foreground mb-2">
          Atendimento prioritário
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Quer agilizar? Fale direto com nosso time no WhatsApp.
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition"
        >
          <MessageCircle className="w-5 h-5" />
          Falar no WhatsApp agora
        </a>
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
