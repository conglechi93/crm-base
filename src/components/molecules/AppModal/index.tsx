import {memo} from 'react';

import {Col, Modal, Row} from 'antd';

import {ModalProps} from './interface';
import styles from './style.module.scss';
import AppButton from 'components/atoms/AppButton';

const ViewModal = (props: ModalProps) => {
  const {
    openModal,
    setOpenModal,
    title,
    description,
    subDescription,
    children,
    disabled,
    width,
    onClosable,
    handleClose,
    closeText,
    handleSubmit,
    submitText,
    zIndex = 12,
  } = props;
  return (
    <Modal
      centered
      className={styles.modal}
      classNames={{
        content: styles.content,
        header: styles.header,
        body: styles.body,
        footer: styles.footer,
      }}
      onCancel={() => {
        if (onClosable) {
          onClosable();
        }
        setOpenModal(false);
      }}
      open={openModal}
      width={width}
      title={title}
      destroyOnClose
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
                  onClick={() => handleSubmit()}
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
      {description}
      {subDescription}
      {children}
    </Modal>
  );
};

export default memo(ViewModal);
