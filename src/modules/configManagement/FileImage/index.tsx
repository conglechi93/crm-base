import {Col, Row, Upload} from 'antd';
import React from 'react';
import ImgCrop from 'antd-img-crop';
import useData from './useFileImage';
import AppTypo from '../../../components/atoms/AppTypo';
import {AppTableContainer} from '@crema';
import AppModal from 'components/molecules/AppModal';
import PickListFilter from 'components/organism/ConfigurationManagement/PickListFilter';

const FileImage = () => {
  const {
    columns,
    tableData,
    isLoading,
    currentPage,
    setCurrentPage,
    total,
    pageSize,

    isOpen,
    setIsOpen,
    modalData,
    submitModal,

    handleUploadItem,
    form,
    handleSearch,
    allowedFileTypes,
  } = useData();
  return (
    <>
      <Row
        justify={'space-between'}
        gutter={[16, 16]}
        align={'bottom'}
        className={''}
      >
        <Col flex={'auto'}>
          <PickListFilter form={form} onSubmitForm={handleSearch} />
        </Col>
        <Col flex={'none'}>
          <ImgCrop
            quality={1}
            modalTitle='Chỉnh sửa'
            modalClassName='cover-img-crop'
            onModalOk={handleUploadItem}
            aspectSlider
            rotationSlider
            showReset
            resetText='Đặt lại'
            modalOk='Xác nhận'
            modalCancel='Hủy'
          >
            <Upload
              className='representati_upload_btn'
              name='uploadImage'
              listType='picture-card'
              showUploadList={false}
              maxCount={1}
              accept={allowedFileTypes.join(',')}
            >
              Tải ảnh lên
            </Upload>
          </ImgCrop>
        </Col>
      </Row>
      <AppTypo variant='span'>
        <ul>
          <li>Hỗ trợ file: PNG, JPG, JPEG.</li>
          <li>Dung lượng tối đa: 2MB/ảnh</li>
        </ul>
      </AppTypo>

      <AppModal
        openModal={isOpen}
        setOpenModal={setIsOpen}
        title={modalData?.title}
        description={modalData?.description}
        handleSubmit={submitModal}
        submitText={modalData?.submitText}
        handleClose={modalData?.handleClose}
        closeText={modalData?.closeText}
        width={modalData?.width}
      />

      <AppTableContainer
        columns={columns}
        className=''
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

export default FileImage;
