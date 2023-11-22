import {useEffect, useState} from 'react';
import {Form, Menu, Popover, Tooltip} from 'antd';

import Image from 'next/image';
import {useRouter} from 'next/router';
import {
  onCreateInventoryTable,
  onDeleteInventoryTable,
  onGetInventoryTableList,
  onUpdateInventoryTable,
} from 'redux/actions/CartManagement';
import {createInventoryDataSource} from 'utils/LocalStore';
import {AiOutlineMore} from 'react-icons/ai';
import {
  onDeleteInventory,
  onGetInventoryByTableId,
  onGetInventoryDetailById,
} from 'redux/actions/Inventory';
import ViewInventoryTable from 'components/organism/CartManagement/ViewInventoryTable';
import AddInventoryTable from 'components/organism/CartManagement/AddInventoryTable';
import {modalInfo} from 'shared/constants/AppVariables';
import {useAppDispatch} from 'redux/hook';

const useInventoryTable = () => {
  const pageSize = 10;
  const [form] = Form.useForm();
  const [inventoryForm] = Form.useForm();
  const router = useRouter();
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [cartSelectDisabled, setCartSelectDisabled] = useState(false);

  const [searchParams, setSearchParams] = useState({
    page: currentPage,
    pageSize: pageSize,
    search: '',
    cartId: '',
  });

  const [modalData, setModalData] = useState<any>({
    title: '',
    description: <></>,
    submitText: '',
    handleClose: () => {},
    closeText: '',
  });
  const [inventoryTableData, setInventoryTableData] = useState({});
  const [submitType, setSubmitType] = useState('');

  // Add Inventory Modal
  const [isOpenInventoryModal, setIsOpenInventoryModal] = useState(false);
  const [isOpenImportInventoryModal, setIsOpenImportInventoryModal] =
    useState(false);

  const [modalStep, setModalStep] = useState(0);
  const [inventoryTableCurrent, setInventoryTableCurrent] = useState({
    id: '',
    cartId: '',
    cartName: '',
    inventoryTableCode: '',
    inventoryTableName: '',
  });
  const [addInventoryInfo, setAddInventoryInfo] = useState({});

  // Can
  const [columns, setColumns] = useState<any>([]);
  const [isViewInventoryTable, setIsViewInventoryTable] = useState(false);
  const [inventoryData, setInventoryData] = useState<any>([]);
  const [inventoryInfo, setInventoryInfo] = useState<any>({});
  const [isRefreshInventory, setIsRefreshInventory] = useState(false);
  const [inventoryTableName, setInventoryTableName] = useState('');
  const [showInventoryTableView, setShowInventoryTableView] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      let newSearchParam;
      const id = router.query?.id;
      const cartName = router.query?.cartName;
      if (id && cartName) {
        form.setFieldsValue({
          cartId: {
            value: id,
            label: cartName,
          },
        });
        newSearchParam = {
          cartId: id && id.toString(),
        };
        delete router.query?.id;
        delete router.query?.cartName;
        setCartSelectDisabled(true);
      }

      const res = await onGetInventoryTableList({
        ...searchParams,
        page: currentPage,
        ...newSearchParam,
      });
      setTableData(res?.elements ?? []);
      setColumns([
        {
          title: 'Mã bảng hàng',
          width: 120,
          dataIndex: 'inventoryTableCode',
          key: '1',
        },
        {
          title: 'Tên bảng hàng',
          width: 120,
          dataIndex: 'inventoryTableName',
          key: '2',
          ellipsis: {
            showTitle: false,
          },
        },
        {
          title: 'Tên giỏ hàng',
          dataIndex: 'cartName',
          key: '3',
          width: 120,
          ellipsis: {
            showTitle: false,
          },
        },
        {
          title: 'Loại bất động sản',
          dataIndex: 'estateTypeName',
          key: '4',
          width: 120,
        },
        {
          title: 'Trạng thái',
          dataIndex: 'propertyList',
          key: '5',
          width: 120,
        },
        {
          title: 'Thao tác',
          key: 'action',
          width: 100,
          render: (_: any, record: any) => {
            let content = (
              <div style={{display: 'flex'}}>
                <Menu
                  className='popover-menu'
                  onClick={(item) => {
                    handleAction(item.key, record);
                  }}
                >
                  <Menu.Item key={1}>Xem chi tiết</Menu.Item>
                  <Menu.Item key={2}>Chỉnh sửa</Menu.Item>
                  <Menu.Item key={3}>Thêm mới mặt hàng</Menu.Item>
                  <Menu.Item key={4}>Import mặt hàng</Menu.Item>
                  {/* <Menu.Item key={5}>Xem mặt hàng</Menu.Item> */}
                  <Menu.Item key={6} disabled={record.isHasData}>
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
      ]);
      setTotal(res?.total ?? 0);
      setIsLoading(false);
    };
    getData();
  }, [currentPage, isRefresh, searchParams]);

  /**
   * Can - 16/11/2023 - View Inventory Table
   */
  useEffect(() => {
    if (isViewInventoryTable) {
      const fetchApi = async () => {
        const res =
          (await onGetInventoryByTableId(inventoryTableCurrent.id, {
            page: 1,
            pageSize: 50,
          })) || [];
        if (res) {
          setInventoryData(res);
          setTotal(res?.total ?? 0);
        }
      };
      fetchApi();
    }
  }, [isViewInventoryTable, inventoryTableCurrent, isRefreshInventory]);

  useEffect(() => {
    if (inventoryData) {
      const dataSource: any = [];
      let dataColums: any = [];
      inventoryData?.elements?.forEach((item: any) => {
        const data = {
          id: item?.id,
          ...item?.data,
        };
        dataSource.push(data);
      });
      inventoryData?.columns?.forEach((item: any) => {
        const optionColumn = {
          key: item?.key,
          title: item?.title,
          dataIndex: item?.dataIndex,
          render: (text: any) => (
            <Tooltip title={text}>
              <div className='ellipsis-text'>{text}</div>
            </Tooltip>
          ),
        };
        dataColums.push(optionColumn);
      });
      dataColums.push({
        title: 'Thao tác',
        key: 'action',
        width: 150,
        render: (_: any, record: any) => {
          let content = (
            <div style={{display: 'flex'}}>
              <Menu
                className='popover-menu'
                onClick={(item) => {
                  handleActionInventory(item.key, record);
                }}
              >
                <Menu.Item key={1}>Xem chi tiết</Menu.Item>
                <Menu.Item key={2}>Chỉnh sửa</Menu.Item>
                <Menu.Item key={3}>Xóa</Menu.Item>
              </Menu>
            </div>
          );
          return (
            <Popover content={content} placement='topLeft'>
              <AiOutlineMore />
            </Popover>
          );
        },
      });
      setTableData(dataSource);
      setColumns(dataColums);
    }
  }, [inventoryData, isRefreshInventory]);

  const handleActionInventory = async (key: string, record: any) => {
    switch (key) {
      case '1': {
        const inventoryId = record.id;
        const res = await dispatch(onGetInventoryDetailById(inventoryId));
        const info = {
          draftString: modalInfo.inventory.view.draftString,
          type: modalInfo.inventory.view.type,
          action: () => {
            setIsOpen(false);
          },
        };
        createInventoryDataSource(
          inventoryTableCurrent,
          modalInfo.inventory.view.draftString,
        );
        setAddInventoryInfo(info);
        setIsOpenInventoryModal(true);
        break;
      }
      case '3':
        setInventoryInfo(record);
        setModalData({
          title: 'Xóa bảng hàng',
          description: 'Bạn có muốn xóa bảng hàng này không?',
          submitText: 'Đồng ý',
        });
        setSubmitType('delete-view-inventory');
        setIsOpen(true);
        break;

      default:
        break;
    }
  };

  const addItem = async () => {
    setIsOpen(true);
    setModalData({
      title: 'Thêm mới bảng hàng',
      description: <AddInventoryTable type='add' form={inventoryForm} />,
      submitText: 'Thêm',
      handleClose: () => {
        setIsOpen(false);
      },
      closeText: 'Hủy',
    });
    setSubmitType('add');
  };

  const handleSubmitModal = async () => {
    switch (submitType) {
      case 'add': {
        const payload = inventoryForm.getFieldsValue();
        const res = await dispatch(onCreateInventoryTable(payload));
        if (res) {
          setIsRefresh(!isRefresh);
          setIsOpen(false);
        }
        break;
      }
      case 'edit': {
        const payload = inventoryForm.getFieldsValue();
        const res = await dispatch(onUpdateInventoryTable(payload));
        if (res) {
          setIsRefresh(!isRefresh);
          setIsOpen(false);
        }
        break;
      }
      case 'view':
        setIsOpen(false);
        break;
      case 'delete': {
        const res = await dispatch(
          onDeleteInventoryTable(inventoryTableCurrent.id),
        );
        if (res) {
          setIsRefresh(!isRefresh);
          setIsOpen(false);
        }
        break;
      }
      case 'delete-view-inventory': {
        const res = await dispatch(onDeleteInventory(inventoryInfo.id));
        if (res) {
          setIsRefreshInventory(!isRefreshInventory);
          setIsOpen(false);
        }
        break;
      }
      default:
        break;
    }
  };

  const handleAction = (key: any, record: any) => {
    switch (key) {
      case '1':
        setIsOpen(true);
        setModalData({
          title: 'Chi tiết bảng hàng',
          description: <ViewInventoryTable data={record} />,
          // description: <ViewInventoryTable data={record} />,
          submitText: 'Đóng',
        });
        setSubmitType('view');
        break;
      case '2':
        setIsOpen(true);
        setInventoryTableCurrent(record);
        setModalData({
          title: 'Chỉnh sửa bảng hàng',
          description: <AddInventoryTable type='edit' form={inventoryForm} />,
          submitText: 'Lưu cập nhật',
        });
        setSubmitType('edit');
        break;
      case '3':
        const info = {
          draftString: modalInfo.inventory.add.draftString,
          type: modalInfo.inventory.add.type,
          action: () => {
            setIsOpen(false);
          },
        };
        setAddInventoryInfo(info);
        createInventoryDataSource(record, modalInfo.inventory.add.draftString);
        setIsOpenInventoryModal(true);
        break;
      case '4': {
        const info = {
          draftString: modalInfo.inventory.import.draftString,
          type: modalInfo.inventory.import.type,
          action: () => {
            setIsOpen(false);
          },
        };
        setModalStep(0);
        setAddInventoryInfo(info);
        createInventoryDataSource(
          record,
          modalInfo.inventory.import.draftString,
        );
        setIsOpenImportInventoryModal(true);
        break;
      }
      case '5': {
        if (record) {
          setShowInventoryTableView(true);
          setInventoryTableName(record?.inventoryTableName);
          setInventoryTableCurrent(record);
          setIsViewInventoryTable(true);
        }
        break;
      }
      case '6': {
        setInventoryTableCurrent(record);
        setModalData({
          title: 'Xóa bảng hàng',
          description: 'Bạn có muốn xóa bảng hàng này không?',
          submitText: 'Đồng ý',
        });
        setSubmitType('delete');
        setIsOpen(true);
        break;
      }
      default:
        break;
    }
  };

  const handleFilterInventoryTable = (values: any) => {
    setSearchParams({
      ...searchParams,
      ...values,
    });
  };

  const handleFilterInventoryTableView = (values: any) => {
    console.log('value search', values);
  };

  const handleImportInventoryFromFile = () => {
    const info = {
      draftString: modalInfo.inventory.import.draftString,
      type: modalInfo.inventory.import.type,
      action: () => {
        setIsOpen(false);
      },
    };
    setAddInventoryInfo(info);
    createInventoryDataSource(
      inventoryTableCurrent,
      modalInfo.inventory.import.draftString,
    );
    setModalStep(0);
    setIsOpenImportInventoryModal(true);
  };

  const handleAddInventory = () => {
    const info = {
      draftString: modalInfo.inventory.add.draftString,
      type: modalInfo.inventory.add.type,
      action: () => {
        setIsOpen(false);
      },
    };
    createInventoryDataSource(
      inventoryTableCurrent,
      modalInfo.inventory.add.draftString,
    );
    setAddInventoryInfo(info);
    setModalStep(0);
    setIsOpenInventoryModal(true);
  };

  return {
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

    // Can -- 16/11/2023
    inventoryTableName,
    showInventoryTableView,
    handleFilterInventoryTableView,
    handleAddInventory,
    handleImportInventoryFromFile,
  };
};

export default useInventoryTable;
