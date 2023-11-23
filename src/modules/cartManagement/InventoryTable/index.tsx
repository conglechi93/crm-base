import {Col, Row} from 'antd';
import {useIntl} from 'react-intl';
import useInventoryTable from './useInventoryTable';
import AppTypo from 'components/atoms/AppTypo';
import AppModal from 'components/molecules/AppModal';
import AddInventoryModal from 'components/organism/CartManagement/AddInventoryModal';
import ImportInventoryModal from 'components/organism/CartManagement/ImportInventoryModal';
import InventoryTableFilter from 'components/organism/CartManagement/InventoryTableFilter';
import AppButton from 'components/atoms/AppButton';
import {AppTableContainer} from '@crema';
import IntlMessages from '@crema/utility/IntlMessages';

const InventoryTable = () => {
  const {messages} = useIntl();

  const {
    isLoading,
    columns,
    tableData,
    currentPage,
    setCurrentPage,
    total,
    pageSize,
    addItem,

    isOpen,
    setIsOpen,
    modalData,
    handleSubmitModal,

    form,
    handleFilterInventoryTable,

    isOpenInventoryModal,
    isOpenImportInventoryModal,
    setIsOpenImportInventoryModal,
    setIsOpenInventoryModal,
    modalStep,
    setModalStep,

    cartSelectDisabled,
    addInventoryInfo,
  } = useInventoryTable();
  return (
    <div>
      <AppTypo variant='p-xl-semi'>
        <IntlMessages id='common.inventoryTable' />
        {/* {messages['common.inventoryTable'] as string} */}
      </AppTypo>
      <AppModal
        openModal={isOpen}
        setOpenModal={setIsOpen}
        title={modalData?.title}
        description={modalData?.description}
        handleSubmit={handleSubmitModal}
        submitText={modalData?.submitText}
        handleClose={modalData?.handleClose}
        closeText={modalData?.closeText}
        width={968}
      />
      <AddInventoryModal
        info={addInventoryInfo}
        title={'Thêm mới mặt hàng'}
        isOpen={isOpenInventoryModal}
        setIsOpen={setIsOpenInventoryModal}
        current={modalStep}
        setCurrent={setModalStep}
      />
      <ImportInventoryModal
        info={addInventoryInfo}
        isOpen={isOpenImportInventoryModal}
        setIsOpen={setIsOpenImportInventoryModal}
        current={modalStep}
        setCurrent={setModalStep}
      />
      <Row justify={'space-between'} gutter={[16, 16]} align={'bottom'}>
        <Col flex={'auto'}>
          <InventoryTableFilter
            form={form}
            onSubmitForm={handleFilterInventoryTable}
            cartSelectDisabled={cartSelectDisabled}
          />
        </Col>
        <Col xs={24}>
          <Row gutter={[16, 16]} justify={'end'}>
            <Col flex={'none'}>
              <AppButton type='primary' onClick={addItem}>
                {messages['common.addInventoryTable'] as string}
              </AppButton>
            </Col>
          </Row>
        </Col>
      </Row>
      <AppTableContainer
        className=''
        columns={columns}
        data={tableData}
        loading={isLoading}
        scroll={{x: 1500}}
        current={currentPage}
        setCurrent={setCurrentPage}
        total={total}
        pageSize={pageSize}
      />
    </div>
  );
};
export default InventoryTable;
