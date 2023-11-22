import React from 'react';
import AppButton from 'components/atoms/AppButton';
import useProperty from './useProperty';
import {Col, Row} from 'antd';
import AppModal from 'components/molecules/AppModal';
import PropertyFilter from 'components/organism/ConfigurationManagement/PropertyFilter';
import {pageSize} from 'shared/constants/AppConst';
import {AppTableContainer} from '@crema';

const Property = () => {
  const {
    tableData,
    currentPage,
    total,
    setCurrentPage,
    columns,
    isLoading,

    isOpen,
    setIsOpen,
    modalData,
    submitModal,

    addItem,

    form,
    handleSearch,
  } = useProperty();

  return (
    <div>
      {/* <AppPageMetadata title='Thuộc tính BĐS' /> */}
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
        width={600}
      />
      <Row justify={'space-between'} gutter={[16, 16]} align={'bottom'}>
        <Col flex={'auto'}>
          <PropertyFilter form={form} onSubmitForm={handleSearch} />
        </Col>
        <Col flex={'none'}>
          <AppButton type='primary' onClick={addItem}>
            Thêm thuộc tính
          </AppButton>
        </Col>
      </Row>
      <AppTableContainer
        className=''
        columns={columns}
        data={tableData}
        loading={isLoading}
        scroll={{x: 1000, y: 'calc(100vh - 290px)'}}
        current={currentPage}
        setCurrent={setCurrentPage}
        total={total}
        pageSize={pageSize.PROPERTY}
      />
    </div>
  );
};

export default Property;
