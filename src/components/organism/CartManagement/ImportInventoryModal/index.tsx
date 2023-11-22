import AppModal from 'components/molecules/AppModal';
import ImportInventoryContent from '../ImportInventoryContent';
import {useEffect, useState} from 'react';
import {removeState} from 'utils/LocalStore';
import {modalInfo} from 'shared/constants/AppVariables';

type PropsTypes = {
  info: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  current: number;
  setCurrent: (value: number) => void;
  submitText?: any;
  closeText?: any;
  handleClose?: () => void;
  zIndex?: number;
};

const ImportInventoryModal = (props: PropsTypes) => {
  const {info, isOpen, setIsOpen, current, setCurrent} = props;
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const {type} = info;
    switch (type) {
      case modalInfo.inventory.import.type: {
        setTitle('Tải lên mặt hàng');
        break;
      }
      default:
        break;
    }
  }, [info]);

  const [title, setTitle] = useState('');

  const handleSubmit = async (): Promise<void> => {
    if (current == 1) {
      return;
    }
    setCurrent(current + 1);
  };

  const handleClose = (): void => {
    if (current == 0) {
      setIsOpen(false);
      setCurrent(0);
      handleRemoveState();
      return;
    }
    setCurrent(current - 1);
  };

  const handleRemoveState = (): void => {
    const {draftString} = info;
    removeState([draftString]);
  };
  return (
    <AppModal
      title={title}
      openModal={isOpen}
      submitText='Tiếp tục'
      closeText='Quay lại'
      setOpenModal={setIsOpen}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      onClosable={handleRemoveState}
      width={968}
      disabled={disabled}
    >
      <ImportInventoryContent
        info={info}
        current={current}
        setDisabled={setDisabled}
      />
    </AppModal>
  );
};

export default ImportInventoryModal;
