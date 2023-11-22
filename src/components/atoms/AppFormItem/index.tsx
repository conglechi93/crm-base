import { Form } from 'antd'

import styles from './style.module.scss'
import AppTypo from '../AppTypo'

type AppFormItemProps = {
  children?: React.ReactNode
  name?: string
  label?: string | React.ReactNode
  required?: boolean
  preserve?: boolean
  valuePropName?: string
  rules?: Array<any>
  hidden?: boolean
}

const AppFormItem = (props: AppFormItemProps) => {
  const {
    children,
    name,
    label,
    required,
    preserve,
    valuePropName,
    rules,
    hidden,
  } = props
  return (
    <Form.Item
      {...props}
      name={name}
      hidden={hidden}
      // required={required}
      className={styles.app_form_item}
      preserve={preserve}
      label={
        typeof label === 'string' ? (
          <AppTypo variant="p-md-med">{label}</AppTypo>
        ) : (
          label
        )
      }
      valuePropName={valuePropName}
      rules={rules}
    >
      {children}
    </Form.Item>
  )
}
export default AppFormItem
