import {useEffect, useState} from 'react';

import {Form} from 'antd';

import {AddFormType} from './interface';
import {onGetCartFormList} from 'redux/actions/ConfigManagement';
import {onGetCartList} from 'redux/actions/CartManagement';
import {onGetEstateTypes} from 'redux/actions/categories';
import {onGetInventoryByTableId} from 'redux/actions/Inventory';

const useViewInventoryTable = (props: AddFormType) => {
  const {data} = props;

  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();

  const [formOptions, setFormOptions] = useState([]);
  const [cartOptions, setCartOptions] = useState([]);
  const [estateTypeOptions, setEstateTypeOptions] = useState([]);
  const [columns, setColumns] = useState([
    {
      title: 'Mã MH',
      width: 100,
      dataIndex: 'inventoryCode',
      key: '1',
    },
    {
      title: 'Loại bất động sản',
      width: 100,
      dataIndex: 'estateType',
      key: '2',
    },
    {
      title: 'Tên giỏ hàng',
      width: 100,
      dataIndex: 'cartName',
      key: '3',
    },
    {
      title: 'Tên bảng hàng',
      width: 100,
      dataIndex: 'inventoryTableName',
      key: '4',
    },
    {
      title: 'Tiêu đề',
      width: 100,
      dataIndex: 'title',
      key: '5',
    },
    {
      title: 'Trạng thái',
      width: 100,
      dataIndex: 'title',
      key: '6',
    },
    {
      title: 'Đơn giá',
      width: 100,
      dataIndex: 'unit',
      key: '7',
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const res =
        (await onGetCartFormList({
          page: 1,
          pageSize: 50,
        })) || [];
      const res2 =
        (await onGetCartList({
          page: 1,
          pageSize: 50,
        })) || [];
      const res3 = (await onGetEstateTypes()) || [];
      setFormOptions(
        res?.elements?.map((item: any) => ({
          label: item.formName,
          value: item.id,
        })) ?? [],
      );
      setCartOptions(
        res2?.elements?.map((item: any) => ({
          label: item.cartName,
          value: item.id,
        })) ?? [],
      );

      setEstateTypeOptions(
        res3?.map((item: any) => ({
          label: item.name,
          value: item.code,
        })) ?? [],
      );
    };
    getData();
  }, []);

  const [total, setTotal] = useState(0);
  const [inventoryDataSource, setInventoryData] = useState([]);
  const fetchInventoryByTableId = async (inventoryTableId: string) => {
    if (!inventoryTableId) return;
    const res =
      (await onGetInventoryByTableId(inventoryTableId, {
        page: 1,
        pageSize: 50,
      })) || [];
    console.log('res', res);
    if (res) {
      setInventoryData(res);
      setTotal(res?.total ?? 0);
    }
  };

  useEffect(() => {
    if (data) {
      const inventoryTableId = data.id;
      fetchInventoryByTableId(inventoryTableId);
    }
    console.log('data', data);
    // const getInventoryTable = async () => {
    //   const res = await onGetInventoryTableById(data?.id)
    //   form.setFieldsValue({
    //     inventoryTableName: res?.inventoryTableName,
    //     cartId: res?.cartId,
    //     formId: res?.formData?.id,
    //     estateTypeId: res?.estateType
    //       ? {
    //           value: res?.estateType?.code,
    //           label: res?.estateType?.name,
    //         }
    //       : null,
    //   })

    //   const dataSource: any = []
    //   let dataColums: any = []
    //   inventoryData?.elements?.forEach((item: any) => {
    //     const data = {
    //       id: item?.id,
    //       ...item?.data,
    //     }
    //     dataSource.push(data)
    //   })
    //   inventoryData?.columns?.forEach((item: any) => {
    //     const optionColumn = {
    //       key: item?.key,
    //       title: item?.title,
    //       dataIndex: item?.dataIndex,
    //       render: (text: any) => (
    //         <Tooltip title={text}>
    //           <div className="ellipsis-text">{text}</div>
    //         </Tooltip>
    //       ),
    //     }
    //     dataColums.push(optionColumn)
    //   })
    //   dataColums.push({
    //     title: 'Thao tác',
    //     key: 'action',
    //     width: 150,
    //     render: (_: any, record: any) => {
    //       let content = (
    //         <div style={{ display: 'flex' }}>
    //           <Menu
    //             className="popover-menu"
    //             onClick={(item) => {
    //               handleActionInventory(item.key, record)
    //             }}
    //           >
    //             <Menu.Item key={1}>Xem chi tiết</Menu.Item>
    //             <Menu.Item key={2}>Chỉnh sửa</Menu.Item>
    //             <Menu.Item key={3}>Xóa</Menu.Item>
    //           </Menu>
    //         </div>
    //       )
    //       return (
    //         <Popover content={content} placement="topLeft">
    //           <Image
    //             src={TempIcon}
    //             style={{ cursor: 'pointer' }}
    //             width={20}
    //             height={20}
    //             alt=""
    //           />
    //         </Popover>
    //       )
    //     },
    //   })
    //   setTableData(dataSource)
    //   setColumns(dataColums)
    // }
  }, [data]);

  const handleFormChange = (_: any, formData: any) => {};

  return {
    form,
    searchForm,
    handleFormChange,
    formOptions,
    cartOptions,
    estateTypeOptions,

    columns,
  };
};

export default useViewInventoryTable;
