import React, {useEffect, useState} from 'react';
import {Col, Form, Menu, Popover, Row, Tooltip} from 'antd';
import Image from 'next/image';
import {useDispatch} from 'react-redux';
import {onGetPropertyList} from 'redux/actions/property';
import {
  onCreateCartForm,
  onDeleteCartForm,
  onExportCartForm,
  onGetCartFormList,
  onUpdateCartForm,
} from 'redux/actions/ConfigManagement';
import {isNullOrUndefinedOrEmpty} from 'utils/FormHelper';
import AddFormCartForm from 'components/organism/ConfigurationManagement/AddFormCartForm';

const useCart = () => {
  const pageSize = 10;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [property, setProperty] = useState<any[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<any>({
    title: '',
    description: '',
    submitText: '',
    handleClose: () => {},
    closeText: '',
  });
  const [submitType, setSubmitType] = useState('');

  const [propertyIdList, setPropertyIdList] = useState<string[]>([]);
  const [formName, setFormName] = useState<string>('');
  const [formDesc, setFormDesc] = useState<string>('');
  const [currentRecord, setCurrentRecord] = useState<any>({});

  const [addStep, setAddStep] = useState(1);

  const [searchParams, setSearchParams] = useState({
    page: currentPage,
    pageSize: pageSize,
    search: '',
  });

  useEffect(() => {
    const getProperty = async () => {
      const res = await onGetPropertyList({
        page: 1,
        pageSize: 30,
      });
      let data: any[] = [];
      res?.elements?.forEach(
        (element: {
          id: number;
          propertyLabel: string;
          propertyName: string;
          isSystem: boolean;
          isRequire: boolean;
        }) => {
          data.push({
            key: element.id,
            title: element.propertyLabel,
            description: element.propertyName,
            disabled: element.isSystem && element.isRequire,
            isSystem: element.isSystem,
          });
        },
      );
      setProperty(data);
    };
    getProperty();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const res = await onGetCartFormList({
        ...searchParams,
        page: currentPage,
      });
      setTableData(res?.elements ?? []);
      setTotal(res?.total ?? 1);
      setIsLoading(false);
    };
    getData();
  }, [currentPage, isRefresh, searchParams]);

  const handleChangeProperty = (newTargetKeys: string[]) => {
    setPropertyIdList(newTargetKeys);
  };

  useEffect(() => {
    const inValid = isNullOrUndefinedOrEmpty(formName);
    setModalData({
      ...modalData,
      disabled: inValid,
    });
  }, [formName]);

  const submitModal = async () => {
    if (submitType === 'add') {
      if (addStep === 1) {
        setAddStep(2);
        setModalData({
          title: 'Chọn thông tin biểu mẫu',
          description: (
            <AddFormCartForm
              formName={''}
              setFormName={setFormName}
              formDesc={formDesc}
              setFormDesc={setFormDesc}
            />
          ),
          disabled: true,
          submitText: 'Thêm',
          handleClose: () => setIsOpen(false),
          closeText: 'Hủy',
        });
      } else if (addStep === 2) {
        const defaultProperty = property
          .filter((item) => item.disabled === true)
          .map((item) => item.key);

        const res = await dispatch(
          onCreateCartForm({
            formName,
            formDesc,
            shopId: 1,
            propertyIdList: propertyIdList.filter(
              (item) => !defaultProperty.includes(item),
            ),
          }),
        );
        if (res) {
          setIsOpen(false);
          setIsRefresh((prevState) => !prevState);
          setAddStep(1);
        }
      }
    }
    if (submitType === 'edit') {
      if (addStep === 1) {
        setAddStep(2);
        setModalData({
          title: 'Chọn thông tin biểu mẫu',
          description: (
            <AddFormCartForm
              formName={formName}
              setFormName={setFormName}
              formDesc={formDesc}
              setFormDesc={setFormDesc}
            />
          ),
          submitText: 'Thêm',
          handleClose: () => setIsOpen(false),
          closeText: 'Hủy',
        });
      } else if (addStep === 2) {
        const defaultProperty = property
          .filter((item) => item.disabled === true)
          .map((item) => item.key);
        const res = await dispatch(
          onUpdateCartForm({
            id: currentRecord.id,
            formCode: currentRecord.formCode,
            formName,
            formDesc,
            shopId: 1,
            propertyIdList: propertyIdList.filter(
              (item) => !defaultProperty.includes(item),
            ),
          }),
        );
        if (res) {
          setIsOpen(false);
          setIsRefresh((prevState) => !prevState);
          setAddStep(1);
        }
      }
    }
    if (submitType === 'delete') {
      const res = await dispatch(onDeleteCartForm(currentRecord.id));
      if (res) {
        setIsOpen(false);
        setIsRefresh((prevState) => !prevState);
      }
    }
    if (submitType === 'export') {
      console.log('currentRecord', currentRecord);
      const res = await onExportCartForm(currentRecord.inventoryTableId);
      if (res) {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.xlsx');
        document.body.appendChild(link);
        link.click();
        // link.parentNode?.removeChild(link)
      }
    }
  };

  const addItem = () => {
    setIsOpen(true);
    setAddStep(1);
    const defaultSelected = property
      .filter((item) => item.isSystem === true)
      .map((item) => item.key);
    setModalData({
      width: 620,
      title: 'Chọn thông tin biểu mẫu',
      description: (
        <AppTransfer
          dataSource={property}
          selected={defaultSelected}
          getTargetValue={handleChangeProperty}
        />
      ),
      submitText: 'Tiếp tục',
      handleClose: () => setIsOpen(false),
      closeText: 'Hủy',
    });
    setSubmitType('add');
  };

  const handleAction = async (key: any, record: any) => {
    setCurrentRecord(record);
    switch (key) {
      case '1':
        const res = await onGetCartFormById(record.id);
        const col = res?.propertyList?.map((item: any) => {
          return {
            title: item.propertyName,
            dataIndex: item.propertyName,
          };
        });
        const data = [{key: 1}, {key: 2}, {key: 3}, {key: 4}];
        setModalData({
          title: 'Xem trước biểu mẫu',
          width: 968,
          description: (
            <>
              <AppTableContainer
                data={data}
                columns={col}
                bordered
                className=''
              />
            </>
          ),
          handleClose: () => setIsOpen(false),
          closeText: 'Đóng',
          submitText: 'Tải biểu mẫu',
        });
        setSubmitType('export');
        setIsOpen(true);
        break;
      case '2':
        let selected: string[] = [];
        record?.propertyList?.forEach((element: {id: string}) => {
          selected.push(element.id);
        });
        setFormName(record?.formName);
        setFormDesc(record?.formDesc);
        setIsOpen(true);
        setModalData({
          width: 620,
          title: 'Xác nhận',
          description: (
            <AppTransfer
              dataSource={property}
              selected={selected}
              getTargetValue={handleChangeProperty}
            />
          ),
          submitText: 'Đồng ý',
          handleClose: () => setIsOpen(false),
          closeText: 'Hủy',
        });
        setSubmitType('edit');
        break;
      case '3':
        setIsOpen(true);
        setModalData({
          title: 'Xác nhận',
          description: `Bạn có muốn xoá biểu mẫu ${record?.formCode} ra khỏi danh sách không?`,
          submitText: 'Đồng ý',
          handleClose: () => setIsOpen(false),
          closeText: 'Hủy',
        });
        setSubmitType('delete');
        break;
      case '4':
        let duplicateSelected: string[] = [];
        record?.propertyList?.forEach((element: {id: string}) => {
          duplicateSelected.push(element.id);
        });
        setFormName(record?.formName);
        setFormDesc(record?.formDesc);
        setIsOpen(true);
        setModalData({
          title: 'Xác nhận',
          description: (
            <AppTransfer
              dataSource={property}
              selected={duplicateSelected}
              getTargetValue={handleChangeProperty}
            />
          ),
          submitText: 'Đồng ý',
          handleClose: () => setIsOpen(false),
          closeText: 'Hủy',
        });
        setSubmitType('add');
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
      title: 'Mã biểu mẫu',
      width: 100,
      dataIndex: 'formCode',
      key: '1',
    },
    {
      title: 'Tên biểu mẫu',
      width: 500,
      dataIndex: 'formName',
      key: '2',
      ellipsis: {
        showTitle: false,
      },
      render: (titleText: string) => (
        <Tooltip placement='topLeft' title={titleText}>
          {titleText}
        </Tooltip>
      ),
    },
    {
      title: 'Dữ liệu biểu mẫu',
      dataIndex: 'propertyList',
      key: '3',
      width: 150,
      render: (propertyList: Array<any>) => (
        <AppTag variant='empty'>{'Trống'}</AppTag>
      ),
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
              <Menu.Item key={1}>Xem trước biểu mẫu</Menu.Item>
              <Menu.Item key={2}>Chỉnh sửa</Menu.Item>
              <Menu.Item key={3}>Xóa</Menu.Item>
              <Menu.Item key={4}>Nhân bản</Menu.Item>
            </Menu>
          </div>
        );
        return (
          <Popover content={content} placement='topLeft'>
            <Image
              src={TempIcon}
              style={{cursor: 'pointer'}}
              width={20}
              height={20}
              alt=''
            />
          </Popover>
        );
      },
    },
  ];

  return {
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
  };
};

export default useCart;
