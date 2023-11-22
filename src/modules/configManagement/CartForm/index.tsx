import React from 'react';
import {Col, Row} from 'antd';
import useCart from './useCartForm';
import AppModal from 'components/molecules/AppModal';
import FormFilter from 'components/organism/ConfigurationManagement/FormFilter';
import AppButton from 'components/atoms/AppButton';
import {AppTableContainer} from '@crema';

const CartForm = () => {
  const {
    isLoading,
    columns,
    tableData,
    currentPage,
    setCurrentPage,
    total,
    pageSize,
    isOpen,
    setIsOpen,
    modalData,
    addItem,
    submitModal,

    form,
    handleSearch,
  } = useCart();

  return (
    <>
      <AppModal
        openModal={isOpen}
        setOpenModal={setIsOpen}
        title={modalData?.title}
        description={modalData?.description}
        handleSubmit={submitModal}
        submitText={modalData?.submitText}
        handleClose={modalData?.handleClose}
        closeText={modalData?.closeText}
        disabled={modalData?.disabled}
        width={modalData?.width}
      />
      <Row justify={'space-between'} gutter={[16, 16]} align={'bottom'}>
        <Col flex={'auto'}>
          <FormFilter form={form} onSubmitForm={handleSearch} />
        </Col>
        <Col flex={'none'}>
          <AppButton type='primary' onClick={addItem}>
            Thêm biểu mẫu
          </AppButton>
        </Col>
      </Row>
      <AppTableContainer
        className='configuration_management_table'
        columns={columns}
        data={tableData}
        loading={isLoading}
        scroll={{x: 1000, y: 'calc(100vh - 290px)'}}
        current={currentPage}
        setCurrent={setCurrentPage}
        total={total}
        pageSize={pageSize}
      />
    </>
  );
};

export default CartForm;
