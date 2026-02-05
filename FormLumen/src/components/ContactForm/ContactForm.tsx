import { useState, useEffect } from 'react'
import { Question, FormData } from './types'
import ProgressBar from './ProgressBar'
import QuestionStep from './QuestionStep'
import SuccessScreen from './SuccessScreen'
import logoLumen from '/logo-lumen.png'


const FORM_NAME = 'contact'

const questions: Question[] = [
  { id: 'nome', label: 'Seu nome completo?', placeholder: 'Digite seu nome completo', type: 'text' },
  {
    id: 'email',
    label: 'Qual é o seu melhor e-mail?',
    placeholder: 'seu@email.com',
    type: 'email',
    validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  },
  { id: 'telefone', label: 'Qual é o seu telefone?', placeholder: '(11) 99999-9999', type: 'tel' },
  { id: 'cargo', label: 'Qual é o seu cargo?', type: 'select', options: ['Dono', 'Sócio', 'Gerente'] },
  {
    id: 'inicio',
    label: 'Quando você pretende começar esse projeto?',
    type: 'select',
    options: ['Agora', 'Próximos 7 dias', 'Nas próximas 2-4 semanas', 'Só estou avaliando'],
  },
  {
    id: 'faturamento',
    label: 'Qual o faturamento mensal da sua empresa?',
    subtitle: 'Informação privada.',
    type: 'select',
    options: [
      'Abaixo de R$20 mil',
      'R$20 mil a R$30 mil',
      'R$30 mil a R$40 mil',
      'R$40 mil a R$50 mil',
      'R$50 mil a R$70 mil',
      'R$70 mil a R$100 mil',
      'R$100 mil a R$200 mil',
      'R$200 mil a R$300 mil',
      'R$300 mil a R$400 mil',
      '+ de R$500 mil',
    ],
  },
]

interface ContactFormProps {
  logoUrl?: string
}

const ContactForm = ({ logoUrl }: ContactFormProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [shouldSubmit, setShouldSubmit] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
    inicio: '',
    faturamento: '',
  })

  const currentQuestion = questions[currentStep]

  const handleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  const handleSubmitNetlify = async (data: FormData) => {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': FORM_NAME,
        ...data,
      }).toString(),
    })
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
        setIsAnimating(false)
      }, 300)
    } else {
      // último passo → aguardar revenue antes de enviar
      setShouldSubmit(true)
    }
  }

  // 🚀 ENVIO GARANTIDO APÓS O STATE ATUALIZAR
  useEffect(() => {
    if (shouldSubmit && formData.faturamento) {
      setIsAnimating(true)
      handleSubmitNetlify(formData).then(() => {
        setIsComplete(true)
        setIsAnimating(false)
      })
    }
  }, [shouldSubmit, formData.faturamento])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!isComplete && <ProgressBar current={currentStep} total={questions.length} />}

      {/* FORM OCULTO NETLIFY */}
      <form
        name={FORM_NAME}
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        hidden
      >
        <input type="hidden" name="form-name" value={FORM_NAME} />
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="nome" value={formData.nome} />
        <input type="hidden" name="email" value={formData.email} />
        <input type="hidden" name="telefone" value={formData.telefone} />
        <input type="hidden" name="cargo" value={formData.cargo} />
        <input type="hidden" name="inicio" value={formData.inicio} />
        <input type="hidden" name="faturamento" value={formData.faturamento} />
      </form>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {!isComplete && (
            <div className="flex justify-center mb-12">
              <img
                src={logoLumen}
                alt="Lumen Assessoria Digital"
                className="h-24 w-auto"
              />


            </div>
          )}

          {isComplete ? (
            <SuccessScreen logoUrl={logoUrl} />
          ) : (
            <QuestionStep
              question={currentQuestion}
              value={formData[currentQuestion.id]}
              onChange={handleChange}
              onNext={handleNext}
              onBack={currentStep > 0 ? handleBack : undefined}
              stepNumber={currentStep}
              totalSteps={questions.length}
              isAnimating={isAnimating}
            />
          )}
        </div>
      </div>

      {!isComplete && (
        <footer className="py-6 px-6 text-center">
          <p className="text-sm text-muted-foreground">
            Seus dados estão seguros conosco
          </p>
        </footer>
      )}
    </div>
  )
}

export default ContactForm
