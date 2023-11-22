import {useState} from 'react';

import {Form, Image, Menu, Popover, Tooltip} from 'antd';

// import Image from 'next/image';
import {useDispatch} from 'react-redux';
import {OPEN_TOAST} from 'types';
import {AiOutlineMore} from 'react-icons/ai';

const useData = () => {
  const pageSize = 10;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  // const [tableData, setTableData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<any>({
    title: '',
    description: '',
    submitText: '',
    handleClose: () => {},
    closeText: '',
  });
  const [submitType, setSubmitType] = useState('');
  const [submitData, setSubmitData] = useState({});
  const [currentRecord, setCurrentRecord] = useState<any>({});

  const [searchParams, setSearchParams] = useState({
    page: currentPage,
    pageSize: pageSize,
    search: '',
  });
  const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  const checkFileType = (file: any) => {
    const isFileTypeAllowed = allowedFileTypes.includes(file.type);
    if (!isFileTypeAllowed) {
      let toastProps = {
        message: 'Thông báo',
        description: 'Chỉ được tải lên các tệp ảnh PNG, JPG, hoặc JPEG!',
        type: 'success',
      };
      dispatch({
        type: OPEN_TOAST,
        payload: toastProps,
      });
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      let toastProps = {
        message: 'Thông báo',
        description: 'Chỉ được tải lên có dung lượng tối đa 2MB',
        type: 'success',
      };
      dispatch({
        type: OPEN_TOAST,
        payload: toastProps,
      });
      return false;
    }
    return isFileTypeAllowed && isLt2M;
  };

  // useEffect(() => {
  //   setIsLoading(true)
  //   const getData = async () => {
  //     const res = await onGetPickList({
  //       ...searchParams,
  //       page: currentPage,
  //     })

  //     setTableData(res?.elements ?? [])
  //     setTotal(res?.total ?? 1)
  //     setIsLoading(false)
  //   }
  //   getData()
  // }, [currentPage, isRefresh, searchParams])

  const handleUploadItem = (item: any) => {
    console.log(item);
    const isFileTypeAllowed = checkFileType(item);
    // if (item && isFileTypeAllowed) {
    //   const image = item
    //   const type = AttachmentType.AVATAR_IMG
    //   const res = await onUploadShopAvatar(image, type)
    //   setDataImageAvatar(res)
    // }
  };

  const submitModal = async () => {
    if (submitType === 'delete') {
      console.log('delete');
      // const res = await dispatch(onDeletePickList(currentRecord.id))
      // if (res) {
      //   setIsRefresh(!isRefresh)
      //   setIsOpen(false)
      // }
    }
  };

  const handleAction = async (key: any, record: any) => {
    setCurrentRecord(record);
    switch (key) {
      case '1':
        try {
          await navigator.clipboard.writeText(record.nameImage);
          let toastProps = {
            message: 'Thông báo',
            description: 'Sao chép thành công',
            type: 'success',
          };
          dispatch({
            type: OPEN_TOAST,
            payload: toastProps,
          });
          return;
        } catch (error) {
          let toastProps = {
            message: 'Thông báo',
            description: 'Sao chép thất bại',
            type: 'error',
          };
          dispatch({
            type: OPEN_TOAST,
            payload: toastProps,
          });
          return;
        }
        break;
      case '2':
        setIsOpen(true);
        setModalData({
          title: 'Xóa dữ liệu',
          description: 'Bạn có muốn xóa dữ liệu danh sách này không',
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

  const tableData = [
    {
      key: '1',
      image: (
        <Image src='https://static.vars.vn/media/images/no-image-v6.png' />
        // <Image
        //   src='https://static.vars.vn/media/images/no-image-v6.png'
        //   width={70}
        //   height={70}
        //   alt=''
        // ></Image>
      ),
      nameImage: 'BĐS-001.png',
      timeUpdate: '11:00 22/11/2023',
      sizeImage: '3 KB',
    },
  ];

  const columns = [
    {
      title: '',
      width: 50,
      dataIndex: 'image',
      key: '1',
    },
    {
      title: 'Tên ảnh',
      width: 120,
      dataIndex: 'nameImage',
      key: '2',
      render: (titleImage: string) => (
        <Tooltip placement='topLeft' title={titleImage}>
          {titleImage}
        </Tooltip>
      ),
    },
    {
      title: 'Thời gian cập nhật',
      width: 120,
      dataIndex: 'timeUpdate',
      key: '3',
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
      title: 'Dung lượng',
      dataIndex: 'sizeImage',
      key: '4',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (descriptionText: string) => (
        <Tooltip placement='topLeft' title={descriptionText}>
          {descriptionText}
        </Tooltip>
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
              <Menu.Item key={1} disabled={record.isUsed}>
                Sao chép ảnh
              </Menu.Item>
              <Menu.Item key={2} disabled={record.isUsed}>
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
  };
};
export default useData;
