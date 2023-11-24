import {pageSize} from 'shared/constants/AppConst';

import {Form, Menu, Popover} from 'antd';
import {useEffect, useState} from 'react';
import {cartModalInfo, modalInfo} from 'shared/constants/AppVariables';

import {useRouter} from 'next/router';
import {useAppDispatch} from 'redux/hook';
import {
  onDeleteCart,
  onGetCartById,
  onGetCartList,
} from 'redux/actions/CartManagement';
import {saveState} from 'utils/LocalStore';
import {APP_ROUTE} from 'shared/constants/AppRoute';
import {AiOutlineMore} from 'react-icons/ai';

const useCart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [searchParams, setSearchParams] = useState({
    page: currentPage,
    pageSize: pageSize.CART,
  });

  // Add Cart Modal
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState({});

  // App Modal
  const [isOpenAppModal, setIsOpenAppModal] = useState(false);
  const [appModalData, setAppModalData] = useState({
    title: '',
    description: '',
    submitText: '',
    handleSubmit: () => {},
    closeText: '',
    handleClose: () => {},
  });

  // Add Inventory Modal

  const [inventoryModalInfo, setInventoryModalInfo] = useState({});
  const [isOpenInventoryModal, setIsOpenInventoryModal] = useState(false);
  const [inventoryModalStep, setInventoryModalStep] = useState(0);

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const res = await onGetCartList({
        ...searchParams,
        page: currentPage,
      });
      setTableData(res?.elements ?? []);
      setTotal(res?.total ?? 0);
      setIsLoading(false);
    };
    getData();
  }, [currentPage, isRefresh, searchParams]);

  const handleFilterCart = (values: any) => {
    console.log('values', values);
    setSearchParams({
      ...searchParams,
      ...values,
    });
  };

  const handleAddCart = () => {
    const info = {
      draftString: cartModalInfo.add.draftString,
      type: cartModalInfo.add.type,
      action: () => {
        setIsOpen(false);
        setIsRefresh(!isRefresh);
      },
    };
    const data = {
      shopId: 1,
    };
    createDataSource(data, cartModalInfo.add.draftString);
    setCurrentStep(0);
    setInfo(info);
    setIsOpen(true);
  };

  const createDataSource = (data: any, draftString: string) => {
    const dataSource = {
      id: data.id,
      shopId: data.shopId,
      cartName: data.cartName,
      cartCode: data.cartCode,
      description: data.description,
    };
    saveState(draftString, dataSource);
  };

  const createInventoryDataSource = (data: any, draftString: string) => {
    const dataSource = {
      cartId: data.id,
      cart: {
        value: data.cartCode,
        key: data.cartCode,
        label: data.cartName,
      },
      province: data.city
        ? {
            value: data.city.code,
            key: data.city.code,
            label: data.city.name,
          }
        : null,
    };
    saveState(draftString, dataSource);
  };

  const handleAction = async (key: any, record: any) => {
    switch (key) {
      case '1': {
        // View cart
        const cardId = record.id;
        const res = await onGetCartById(cardId);
        createDataSource(res, cartModalInfo.view.draftString);
        const info = {
          draftString: cartModalInfo.view.draftString,
          type: cartModalInfo.view.type,
          action: () => {
            setIsOpen(false);
          },
        };
        setCurrentStep(0);
        setInfo(info);
        setIsOpen(true);
        break;
      }

      case '2': {
        // Edit cart
        const cardId = record.id;
        const res = await onGetCartById(cardId);
        createDataSource(res, cartModalInfo.edit.draftString);
        const info = {
          draftString: cartModalInfo.edit.draftString,
          type: cartModalInfo.edit.type,
          action: () => {
            setIsOpen(false);
            setIsRefresh(!isRefresh);
          },
        };
        setCurrentStep(0);
        setInfo(info);
        setIsOpen(true);
        break;
      }

      case '4':
        // View inventory table
        router.push({
          pathname: APP_ROUTE.cart_management.inventory_table,
          query: {id: record.id, cartName: record.cartName},
        });
        break;
      case '3': {
        // Add inventory
        const info = {
          draftString: modalInfo.inventory.add.draftString,
          type: modalInfo.inventory.add.type,
          action: () => {
            setIsOpen(false);
          },
        };
        createInventoryDataSource(record, modalInfo.inventory.add.draftString);
        setInventoryModalInfo(info);
        setInventoryModalStep(0);
        setIsOpenInventoryModal(true);
        break;
      }
      case '5':
        // Delete cart
        const cartId = record.id;
        const modalData = {
          title: 'Thông báo',
          description: `Bạn có chắc chắn muốn xóa giỏ hàng này?`,
          submitText: 'Đồng ý',
          handleSubmit: async () => {
            const res = await dispatch(onDeleteCart(cartId));
            if (res) {
              setIsRefresh(!isRefresh);
              setIsOpenAppModal(false);
            }
          },
          closeText: 'Hủy',
          handleClose: () => {
            setIsOpenAppModal(false);
          },
        };
        setAppModalData(modalData);
        setIsOpenAppModal(true);
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      title: 'Mã giỏ hàng',
      width: 100,
      dataIndex: 'cartCode',
      key: '1',
    },
    {
      title: 'Tên giỏ hàng  ',
      width: 100,
      dataIndex: 'cartName',
      key: '2',
    },
    {
      title: 'Khu vực',
      width: 100,
      dataIndex: 'area',
      key: '3',
    },
    {
      title: 'Thao tác',
      key: '4',
      width: 100,
      render: (_: any, record: any) => {
        let content = (
          <div style={{display: 'flex'}}>
            <Menu className='popover-menu'>
              <Menu.Item key={1} onClick={(e) => handleAction(e.key, record)}>
                Xem chi tiết
              </Menu.Item>
              <Menu.Item
                key={2}
                // disabled={!record.isHasData}
                onClick={(e) => handleAction(e.key, record)}
              >
                Chỉnh sửa
              </Menu.Item>
              {/* <Menu.Item
                key={3}
                disabled={!record.isHasData}
                onClick={(e) => handleAction(e.key, record)}
              >
                Thêm mới mặt hàng
              </Menu.Item> */}
              {/* <Menu.Item key={4} onClick={(e) => handleAction(e.key, record)}>
                Xem bảng hàng
              </Menu.Item> */}
              <Menu.Item
                key={5}
                disabled={!record.isHasData}
                onClick={(e) => handleAction(e.key, record)}
              >
                Xóa
              </Menu.Item>
            </Menu>
          </div>
        );
        return (
          <Popover content={content} placement='topLeft'>
            <AiOutlineMore />
          </Popover>
        );
      },
    },
  ];
  return {
    form,
    isLoading,
    currentPage,
    setCurrentPage,
    total,
    tableData,
    columns,
    handleFilterCart,
    handleAddCart,

    // Modal
    info,
    isOpen,
    setIsOpen,
    currentStep,
    setCurrentStep,

    isOpenAppModal,
    setIsOpenAppModal,
    appModalData,

    isOpenInventoryModal,
    setIsOpenInventoryModal,
    inventoryModalStep,
    setInventoryModalStep,
    inventoryModalInfo,
  };
};
export default useCart;
