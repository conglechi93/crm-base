export type InputProps = {
  type: 'text' | 'password' | 'textarea'
  placeholder?: string
  className?: string
  defaultValue?: any
  value?: any
  disabled?: boolean
  onChange?: (e: any) => void
  suffix?: React.ReactNode
  maxLength?: number
  minLength?: number
}
