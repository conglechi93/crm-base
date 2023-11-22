import React, { ChangeEvent } from 'react'
import { Select } from 'antd'

import styles from './style.module.scss'

const { Option } = Select

interface AppSelectProps {
  options: { label: string; value: any; id?: string }[]
  placeholder?: string
  defaultValue?: any
  value?: any
  onChange?: (value: any, option?: any) => void
  disabled?: boolean
  defaultActiveFirstOption?: boolean
  suffixIcon?: boolean
}

const AppSelect: React.FC<AppSelectProps> = ({
  options,
  placeholder,
  defaultValue,
  onChange,
  value,
  disabled,
  defaultActiveFirstOption,
  suffixIcon,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement>,
    option?: any,
  ): void => {
    if (onChange) {
      onChange(e, option)
    }
  }

  return (
    <Select
      className={styles.app_select}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={handleChange}
      style={{ width: '100%' }}
      value={value}
      disabled={disabled}
      defaultActiveFirstOption={defaultActiveFirstOption}
      suffixIcon={suffixIcon}
    >
      {options.map((option) => (
        <Option
          key={option.value}
          value={option.value}
          label={option.label}
          id={option.id}
        >
          {option.label}
        </Option>
      ))}
    </Select>
  )
}

export default AppSelect
