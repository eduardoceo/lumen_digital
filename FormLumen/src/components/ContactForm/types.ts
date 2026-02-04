export type QuestionType = 'text' | 'email' | 'tel' | 'select'

export interface Question {
  id: keyof FormData
  label: string
  type: QuestionType
  placeholder?: string
  subtitle?: string
  options?: string[]
  validation?: (value: string) => boolean
}

export interface FormData {
  nome: string
  telefone: string
  empresa: string
  cargo: string
  inicio: string
  faturamento: string
}
