// import AppProgress from '@/components/molecules/AppProgress'
import { useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import styles from './style.module.scss'

type PropsTypes = {
  info: any
  current: number
  setCurrent?: (value: number) => void
  setDisabled: (value: boolean) => void
}
const ImportInventoryContent = (props: PropsTypes) => {
  const { info, current, setDisabled } = props

  const [formId, setFormId] = useState('')

  return (
    <div className={styles.import_inventory_content}>
      {/* <AppProgress current={current} items={items} /> */}
      {
        {
          0: (
            <Step1
              info={info}
              setDisabled={setDisabled}
              setFormId={setFormId}
            />
          ),
          1: <Step2 info={info} formId={formId} setDisabled={setDisabled} />,
        }[current]
      }
    </div>
  )
}

export default ImportInventoryContent
