// Validation utilities

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length >= 10 && cleaned.length <= 11
}

export const validateCpf = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, '')
  
  if (cleaned.length !== 11) return false
  if (/^(\d)\1+$/.test(cleaned)) return false
  
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i)
  }
  
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.charAt(9))) return false
  
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i)
  }
  
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.charAt(10))) return false
  
  return true
}

export const validateCnpj = (cnpj: string): boolean => {
  const cleaned = cnpj.replace(/\D/g, '')
  
  if (cleaned.length !== 14) return false
  if (/^(\d)\1+$/.test(cleaned)) return false
  
  let sum = 0
  let weight = 2
  
  for (let i = 11; i >= 0; i--) {
    sum += parseInt(cleaned.charAt(i)) * weight
    weight = weight === 9 ? 2 : weight + 1
  }
  
  let remainder = sum % 11
  const firstDigit = remainder < 2 ? 0 : 11 - remainder
  if (firstDigit !== parseInt(cleaned.charAt(12))) return false
  
  sum = 0
  weight = 2
  
  for (let i = 12; i >= 0; i--) {
    sum += parseInt(cleaned.charAt(i)) * weight
    weight = weight === 9 ? 2 : weight + 1
  }
  
  remainder = sum % 11
  const secondDigit = remainder < 2 ? 0 : 11 - remainder
  if (secondDigit !== parseInt(cleaned.charAt(13))) return false
  
  return true
}

export const validateRequired = (value: string | number | null | undefined): boolean => {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (typeof value === 'number') return !isNaN(value)
  return true
}

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength
}

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength
}

export const validateMinValue = (value: number, minValue: number): boolean => {
  return value >= minValue
}

export const validateMaxValue = (value: number, maxValue: number): boolean => {
  return value <= maxValue
}

export const validateRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max
}

export const validateDateRange = (startDate: string, endDate: string): boolean => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  return start <= end
}

export const validateFutureDate = (date: string): boolean => {
  const inputDate = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return inputDate >= today
}

export const validatePastDate = (date: string): boolean => {
  const inputDate = new Date(date)
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  return inputDate <= today
}

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const validatePassword = (password: string): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Senha deve ter pelo menos 8 caracteres')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra maiúscula')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra minúscula')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Senha deve conter pelo menos um número')
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Senha deve conter pelo menos um caractere especial')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateForm = (data: Record<string, any>, rules: Record<string, any>): {
  isValid: boolean
  errors: Record<string, string[]>
} => {
  const errors: Record<string, string[]> = {}
  
  Object.keys(rules).forEach(field => {
    const value = data[field]
    const fieldRules = rules[field]
    const fieldErrors: string[] = []
    
    if (fieldRules.required && !validateRequired(value)) {
      fieldErrors.push('Campo obrigatório')
    }
    
    if (value && fieldRules.email && !validateEmail(value)) {
      fieldErrors.push('E-mail inválido')
    }
    
    if (value && fieldRules.phone && !validatePhone(value)) {
      fieldErrors.push('Telefone inválido')
    }
    
    if (value && fieldRules.cpf && !validateCpf(value)) {
      fieldErrors.push('CPF inválido')
    }
    
    if (value && fieldRules.cnpj && !validateCnpj(value)) {
      fieldErrors.push('CNPJ inválido')
    }
    
    if (value && fieldRules.minLength && !validateMinLength(value, fieldRules.minLength)) {
      fieldErrors.push(`Deve ter pelo menos ${fieldRules.minLength} caracteres`)
    }
    
    if (value && fieldRules.maxLength && !validateMaxLength(value, fieldRules.maxLength)) {
      fieldErrors.push(`Deve ter no máximo ${fieldRules.maxLength} caracteres`)
    }
    
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors
    }
  })
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}