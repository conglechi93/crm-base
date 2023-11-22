import {useEffect, useState} from 'react';

import {Form, Menu, Popover} from 'antd';
import Image from 'next/image';
import {pageSize} from 'shared/constants/AppConst';
import AppTypo from 'components/atoms/AppTypo';
import {useDispatch} from 'react-redux';
import {
  onCreateProperty,
  onDeleteProperty,
  onGetPropertyList,
  onUpdateProperty,
} from 'redux/actions/property';
import AddForm from 'components/organism/ConfigurationManagement/AddPropertyForm';
import {AiOutlineMore} from 'react-icons/ai';

const useProperty = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<any>({
    title: '',
    description: '',
    submitText: '',
    handleClose: () => {},
    closeText: '',
  });
  const [isOpenSubModal, setIsOpenSubModal] = useState(false);
  const [subModalData, setSubModalData] = useState<any>({
    title: '',
    description: '',
    submitText: '',
    handleClose: () => {},
    closeText: '',
  });
  const [isRefresh, setIsRefresh] = useState(false);
  const [submitData, setSubmitData] = useState({});
  const [currentRecord, setCurrentRecord] = useState<any>({});
  const [submitType, setSubmitType] = useState('');

  const [disabled, setDisabled] = useState(true);

  const [searchParams, setSearchParams] = useState({
    page: currentPage,
    pageSize: pageSize.PROPERTY,
    search: '',
    isSystem: null,
  });

  useEffect(() => {
    setIsLoading(true);
    const getProperty = async () => {
      const res = await onGetPropertyList({
        ...searchParams,
        page: currentPage,
      });
      setTableData(res?.elements ?? []);
      setTotal(res?.total ?? 1);
      setIsLoading(false);
    };
    getProperty();
  }, [currentPage, isRefresh, searchParams]);

  useEffect(() => {
    setModalData({...modalData, disabled: disabled});
  }, [disabled]);

  const onChangeAddForm = (data: any, isValid?: boolean) => {
    setSubmitData(data);
    setDisabled(!isValid);
  };

  const submitModal = async () => {
    if (submitType === 'delete') {
      const res = await dispatch(onDeleteProperty(currentRecord?.id));
      if (res) {
        setIsRefresh(!isRefresh);
        setIsOpen(false);
      }
      return;
    }
    if (submitType === 'add') {
      const res = await dispatch(onCreateProperty({...submitData, shopId: 1}));
      if (res) {
        setIsRefresh(!isRefresh);
        setIsOpen(false);
      }
    }
    if (submitType === 'edit') {
      const res = await dispatch(
        onUpdateProperty({
          ...submitData,
          shopId: 1,
          id: currentRecord?.id,
        }),
      );
      if (res) {
        setIsRefresh(!isRefresh);
        setIsOpen(false);
      }
    }
  };

  const submitSubModal = async () => {};

  const addItem = () => {
    setIsOpen(true);
    setSubmitData({});
    setModalData({
      title: 'Chọn thông tin biểu mẫu',
      description: <AddForm onSubmit={onChangeAddForm} />,
      submitText: 'Tiếp tục',
      disabled: disabled,
      handleClose: () => setIsOpen(false),
      closeText: 'Hủy',
    });
    setSubmitType('add');
  };

  const handleAction = async (key: any, record: any) => {
    setCurrentRecord(record);
    switch (key) {
      case '1':
        setIsOpen(true);
        setSubmitData({});
        setModalData({
          title: 'Chỉnh sửa thuộc tính',
          description: (
            <AddForm onSubmit={onChangeAddForm} isEdit={true} data={record} />
          ),
          disabled: disabled,
          submitText: 'Lưu',
          handleClose: () => setIsOpen(false),
          closeText: 'Hủy',
        });
        setSubmitType('edit');
        break;
      case '2':
        setIsOpen(true);
        setModalData({
          title: 'Xác nhận',
          description: `Bạn có muốn xoá thuộc tính ${record?.propertyName} ra khỏi danh sách không?`,
          submitText: 'Đồng ý',
          handleClose: () => setIsOpen(false),
          closeText: 'Hủy',
        });
        setSubmitType('delete');
        break;

      default:
        break;
    }
  };

  const handleSearch = (value: any) => {
    setSearchParams({
      ...searchParams,
      ...value,
    });
  };

  const columns = [
    {
      title: 'Mã thuộc tính',
      width: 150,
      dataIndex: 'propertyCode',
      key: '1',
    },
    {
      title: 'Tên thuộc tính',
      dataIndex: 'propertyName',
      key: '2',
    },
    {
      title: 'Kiểu dữ liệu',
      dataIndex: 'dataType',
      key: '3',
      render: (dataType: any) => (
        <AppTypo variant='p-md-med'>{dataType?.typeName}</AppTypo>
      ),
    },
    {
      title: 'Tên hiển thị',
      dataIndex: 'propertyLabel',
      key: '4',
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
              <Menu.Item key={1}>Chỉnh sửa</Menu.Item>
              {!record.isSystem && <Menu.Item key={2}>Xóa</Menu.Item>}
            </Menu>
          </div>
        );
        return !record.isSystem ? (
          <Popover content={content} placement='topLeft'>
            <AiOutlineMore />
          </Popover>
        ) : (
          <></>
        );
      },
    },
  ];

  return {
    tableData,
    currentPage,
    total,
    setCurrentPage,
    pageSize,
    columns,
    isLoading,

    isOpen,
    setIsOpen,
    modalData,
    submitModal,

    isOpenSubModal,
    setIsOpenSubModal,
    subModalData,
    submitSubModal,

    addItem,

    form,
    handleSearch,
  };
};

export default useProperty;
