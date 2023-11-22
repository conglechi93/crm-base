import React from 'react'
import { Input } from 'antd'
import { InputProps } from './interface'
import styles from './style.module.scss'

const AppInput: React.FC<InputProps> = (props) => {
  const { type, defaultValue, disabled } = props
  return type == 'text' ? (
    <Input
      {...props}
      defaultValue={defaultValue}
      disabled={disabled}
      className={styles.app_input}
    />
  ) : type == 'textarea' ? (
    <Input.TextArea
      {...props}
      rows={4}
      defaultValue={defaultValue}
      disabled={disabled}
      className={styles.app_input}
    />
  ) : (
    <Input.Password {...props} className={styles.app_input} />
  )
}

export default AppInput
