import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Question } from './types';

interface QuestionStepProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack?: () => void;
  stepNumber: number;
  totalSteps: number;
  isAnimating: boolean;
}

const QuestionStep = ({
  question,
  value,
  onChange,
  onNext,
  onBack,
  stepNumber,
  totalSteps,
  isAnimating,
}: QuestionStepProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!isAnimating && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isAnimating, stepNumber]);

  useEffect(() => {
    if (question.validation) {
      setIsValid(question.validation(value));
    } else {
      setIsValid(value.trim().length > 0);
    }
  }, [value, question]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValid) {
      e.preventDefault();
      onNext();
    }
  };

  const renderInput = () => {
    if (question.type === 'select' && question.options) {
      const isLargeList = question.options.length > 5;
      
      return (
        <div className={`mt-8 ${isLargeList ? 'grid grid-cols-1 md:grid-cols-2 gap-3' : 'space-y-3'}`}>
          {question.options.map((option, index) => {
            const letter = String.fromCharCode(97 + index); // a, b, c, d...
            return (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setTimeout(onNext, 300);
                }}
                className={`w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all duration-300 text-base md:text-lg ${
                  value === option
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-muted hover:border-muted-foreground/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all text-sm font-medium ${
                    value === option ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/50'
                  }`}>
                    {value === option ? <Check className="w-4 h-4" /> : letter.toUpperCase()}
                  </span>
                  <span className="flex-1">{option}</span>
                </span>
              </button>
            );
          })}
        </div>
      );
    }

    return (
      <input
        ref={inputRef}
        type={question.type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={question.placeholder}
        className="form-input-minimal"
        autoComplete={question.type === 'email' ? 'email' : 'off'}
      />
    );
  };

  return (
    <div className={`${isAnimating ? 'question-exit' : 'question-enter'}`}>
      {stepNumber > 0 && onBack && (
        <div className="mb-6">
          <button
            onClick={onBack}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      )}
      
      <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2 leading-tight">
        {question.label}
      </h2>

      {question.subtitle && (
        <p className="text-muted-foreground text-base md:text-lg mb-6">{question.subtitle}</p>
      )}

      {renderInput()}

      {question.type !== 'select' && (
        <div className="mt-12">
          <button
            onClick={onNext}
            disabled={!isValid}
            className="btn-next text-primary-foreground"
          >
            {stepNumber === totalSteps - 1 ? 'Enviar' : 'Continuar'}
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <p className="mt-4 text-sm text-muted-foreground">
            ou pressione <span className="text-foreground font-medium">Enter ↵</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionStep;
