import useCart from './useCart';
import CartFilter from 'components/organism/CartManagement/CartFilter';
import {Col, Row} from 'antd';
import AppButton from 'components/atoms/AppButton';
import {pageSize} from 'shared/constants/AppConst';
import AddCartModal from 'components/organism/CartManagement/AddCartModal';
import AppModal from 'components/molecules/AppModal';
import AddInventoryModal from 'components/organism/CartManagement/AddInventoryModal';
import {AppTableContainer} from '@crema';
import {useRouter} from 'next/router';

const Cart = () => {
  const router = useRouter();
  if (router.isFallback) {
    return <></>;
  }
  const {
    form,
    isLoading,
    currentPage,
    setCurrentPage,
    total,
    tableData,
    columns,
    handleFilterCart,
    handleAddCart,

    //Modal
    info,
    isOpen,
    setIsOpen,
    currentStep,
    setCurrentStep,

    // App Modal
    isOpenAppModal,
    setIsOpenAppModal,
    appModalData,

    isOpenInventoryModal,
    setIsOpenInventoryModal,
    inventoryModalStep,
    setInventoryModalStep,
    inventoryModalInfo,
  } = useCart();

  return (
    <div>
      <AddCartModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        current={currentStep}
        setCurrent={setCurrentStep}
        info={info}
      />
      <AddInventoryModal
        title={'Thêm mới mặt hàng'}
        isOpen={isOpenInventoryModal}
        setIsOpen={setIsOpenInventoryModal}
        current={inventoryModalStep}
        setCurrent={setInventoryModalStep}
        info={inventoryModalInfo}
      />
      <AppModal
        openModal={isOpenAppModal}
        setOpenModal={setIsOpenAppModal}
        title={appModalData?.title}
        description={appModalData?.description}
        handleSubmit={appModalData?.handleSubmit}
        submitText={appModalData?.submitText}
        handleClose={appModalData?.handleClose}
        closeText={appModalData?.closeText}
      />
      <Row gutter={[16, 16]} align={'bottom'}>
        <Col flex={'auto'}>
          <CartFilter form={form} onSubmitForm={handleFilterCart} />
        </Col>
        <Col flex={'150px'}>
          <AppButton type='primary' onClick={handleAddCart}>
            Thêm giỏ hàng
          </AppButton>
        </Col>
      </Row>

      <AppTableContainer
        className=''
        columns={columns}
        data={tableData}
        total={total}
        pageSize={pageSize.CART}
        loading={isLoading}
        current={currentPage}
        setCurrent={setCurrentPage}
        scroll={{x: 1000, y: 'calc(100vh - 290px)'}}
      />
    </div>
  );
};
export default Cart;
