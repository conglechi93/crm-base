import {Col, Modal, Row} from 'antd';
import {useEffect, useState} from 'react';
import {AddCartModalTProps} from './interface';
import AppButton from 'components/atoms/AppButton';
import styles from './style.module.scss';
import {loadState, removeState} from 'utils/LocalStore';
import {cartModalInfo} from 'shared/constants/AppVariables';
import AddCartContent from '../AddCartContent';
import {onAddNewCart, onEditCart} from 'redux/actions/CartManagement';
import {useAppDispatch} from 'redux/hook';

const AddCartModal = (props: AddCartModalTProps) => {
  const {info, isOpen, setIsOpen, current, setCurrent, zIndex = 12} = props;
  const [title, setTitle] = useState<any>();
  const [submitText, setSubmitText] = useState<any>();
  const [closeText, setCloseText] = useState<any>();
  const [disabled, setDisabled] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const {draftString} = info;
    switch (info.type) {
      case cartModalInfo.add.type: {
        setSubmitText('Tạo giỏ hàng');
        setCloseText('Quay lại');
        setTitle('Tạo giỏ hàng');
        break;
      }
      case cartModalInfo.edit.type: {
        setSubmitText('Chỉnh sửa');
        setCloseText('Quay lại');
        setTitle('Chỉnh sửa giỏ hàng');
        break;
      }
      case cartModalInfo.view.type: {
        setSubmitText('Đồng ý');
        setCloseText('Quay lại');
        setTitle('Xem giỏ hàng');
        break;
      }
    }
  }, [info]);

  const handleRemoveState = (): void => {
    const {draftString} = info;
    removeState([draftString]);
    setIsOpen(false);
    setCurrent(0);
  };

  const handleClose = (): void => {
    handleRemoveState();
  };

  const handleSubmit = async () => {
    const {draftString, type} = info;
    switch (type) {
      case cartModalInfo.add.type: {
        const dataSource = loadState(draftString);
        const res = await dispatch(onAddNewCart(dataSource));
        if (res) {
          info.action();
        }
        break;
      }
      case cartModalInfo.view.type:
        info.action();
        break;
      case cartModalInfo.edit.type: {
        const dataSource = loadState(draftString);
        const res = await dispatch(onEditCart(dataSource));
        if (res) {
          info.action();
        }
        info.action();
        break;
      }
    }

    // if (current == 2) {
    //   const { draftString, type } = info
    //   switch (type) {
    //     case cartModalInfo.add.type: {
    //       const dataSource = loadState(draftString)
    //       const res = await dispatch(onAddNewCart(dataSource))
    //       if (res) {
    //         info.action()
    //       }
    //       break
    //     }
    //     case cartModalInfo.view.type:
    //       info.action()
    //       break
    //     case cartModalInfo.edit.type: {
    //       const dataSource = loadState(draftString)
    //       const res = await dispatch(onEditCart(dataSource))
    //       if (res) {
    //         info.action()
    //       }
    //       info.action()
    //       break
    //     }
    //   }
    //   return
    // }
    // setCurrent(current + 1)
  };

  return (
    <Modal
      centered
      open={isOpen}
      title={title}
      destroyOnClose
      onCancel={handleRemoveState}
      className={styles.add_cart_modal}
      classNames={{
        header: styles.header,
        content: styles.content,
        body: styles.body,
        footer: styles.footer,
      }}
      footer={
        submitText || closeText ? (
          <Row gutter={[8, 8]} justify={'end'}>
            {closeText && (
              <Col flex={'none'}>
                <AppButton type='primary' ghost={true} onClick={handleClose}>
                  {closeText}
                </AppButton>
              </Col>
            )}

            {submitText && (
              <Col flex={'none'}>
                <AppButton
                  disabled={disabled}
                  type='primary'
                  onClick={handleSubmit}
                >
                  {submitText}
                </AppButton>
              </Col>
            )}
          </Row>
        ) : (
          false
        )
      }
      zIndex={zIndex}
    >
      <AddCartContent info={info} setDisabled={setDisabled} />
    </Modal>
  );
};

export default AddCartModal;
