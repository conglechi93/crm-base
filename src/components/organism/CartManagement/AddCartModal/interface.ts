export type AddCartModalTProps = {
  info: any;
  isOpen?: boolean;
  setIsOpen: (isOpen: boolean) => void;
  description?: any;
  current: number;
  setCurrent: (value: number) => void;
  submitText?: any;
  handleSubmit?: (e: any) => void;
  closeText?: any;
  handleClose?: () => void;
  zIndex?: number;
};
