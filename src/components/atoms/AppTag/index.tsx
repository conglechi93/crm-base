import { Tag } from 'antd'
import { TagProps } from './interface'
import styles from './style.module.scss'

const AppTag = (props: TagProps) => {
  switch (props.variant) {
    case 'empty':
      return (
        <Tag>
          <span className={styles.empty}>{props.children}</span>
        </Tag>
      )
    case 'pending':
      return (
        <Tag>
          <span className={styles.pending}>{props.children}</span>
        </Tag>
      )
    case 'publish':
      return (
        <Tag>
          <span className={styles.publish}>{props.children}</span>
        </Tag>
      )
    case 'suspend':
      return (
        <Tag>
          <span className={styles.suspend}>{props.children}</span>
        </Tag>
      )
    case 'locked':
      return (
        <Tag>
          <span className={styles.locked}>{props.children}</span>
        </Tag>
      )
    default:
      return null
  }
  // return <Tag>{props.children}</Tag>
}

export default AppTag
