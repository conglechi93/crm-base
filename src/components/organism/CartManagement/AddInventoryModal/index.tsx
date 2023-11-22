import AppModal from 'components/molecules/AppModal';
import AddInventoryContent from '../AddInventoryContent';
import {useState} from 'react';
import {removeState} from 'utils/LocalStore';

type PropsTypes = {
  info: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: any;
  current: number;
  setCurrent: (value: number) => void;
  submitText?: any;
  closeText?: any;
  handleClose?: () => void;
  zIndex?: number;
};

const AddInventoryModal = (props: PropsTypes) => {
  const {info, title, isOpen, setIsOpen, current, setCurrent} = props;
  const [disabled, setDisabled] = useState(false);
  const handleSubmit = async (): Promise<void> => {
    if (current == 1) {
      const {draftString, type} = info;
      switch (type) {
        default:
          break;
      }
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
    <div>
      <AppModal
        title={title}
        openModal={isOpen}
        submitText='Tiếp tục'
        closeText='Quay lại'
        setOpenModal={setIsOpen}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        onClosable={handleRemoveState}
        width={1000}
        disabled={disabled}
      >
        <AddInventoryContent
          info={info}
          current={current}
          setCurrent={setCurrent}
          setDisabled={setDisabled}
        />
      </AppModal>
    </div>
  );
};

export default AddInventoryModal;
