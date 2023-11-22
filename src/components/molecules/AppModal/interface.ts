export type ModalProps = {
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
  title?: string
  description?: string | React.ReactNode
  subDescription?: string
  handleSubmit: () => void
  handleClose?: () => void
  submitText?: string
  closeText?: string
  disabled?: boolean
  width?: number
  children?: React.ReactNode
  onClosable?: () => void
  zIndex?: number
}
