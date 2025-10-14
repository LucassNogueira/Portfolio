import { atom } from 'jotai'
import { ContactFormState } from '@/types'

export const contactFormStateAtom = atom<ContactFormState>({
  isSubmitting: false,
  successMessage: '',
  errorMessage: ''
})
