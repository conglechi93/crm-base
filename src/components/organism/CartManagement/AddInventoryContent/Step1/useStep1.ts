import {loadState} from 'utils/LocalStore';
import {checkValidateForm} from 'utils/FormHelper';
import {FormInstance} from 'antd';
import {ChangeEvent, useEffect, useState} from 'react';
import {
  onGetCartList,
  onGetInventoryInitCreate,
  onGetInventoryTableList,
} from 'redux/actions/CartManagement';

const useStep1 = (
  info: any,
  form: FormInstance,
  setDisabled: (value: boolean) => void,
  handleSetFormData: (dataItems: Array<{key: string; value: any}>) => void,
) => {
  const [selectFields, setSelectFields] = useState([
    'cart',
    'estateType',
    'inventoryTable',
    'province',
    'district',
    'ward',
  ]);
  const [optionalFields, setOptionalFields] = useState([
    'district',
    'ward',
    'street',
    'saleDoc',
    'legalDoc',
  ]);

  const [estateTypeOptions, setEstateTypeOptions] = useState<
    {label: string; value: string}[]
  >([]);

  const [cartOptions, setCartOptions] = useState<
    {label: string; value: string}[]
  >([]);

  const [inventoryTableOptions, setInventoryTableOptions] = useState<
    {label: string; value: string}[]
  >([]);

  // const [propertyNames, setPropertyNames] = useState([])

  const [propertyList, setPropertyList] = useState<
    Array<{
      propertyCode: string;
      propertyName: string;
      propertyLabel: string;
      propertyTypeId: string;
    }>
  >([]);
  const [dataSource, setDataSource] = useState({
    cartId: '',
    cart: '',
    province: '',
    estateType: '',
    inventoryTable: '',
  });

  const fetchInventoryTable = async (cartId: string) => {
    if (!cartId) return;
    const res = await onGetInventoryTableList({
      page: 1,
      pageSize: 50,
      cartId: cartId,
    });
    setInventoryTableOptions(
      res?.elements?.map((item: any) => ({
        label: item.inventoryTableName,
        value: item.inventoryTableCode,
        id: item.id,
      })) || [],
    );
  };

  useEffect(() => {
    // const fetchEstateTypes = async (): Promise<void> => {
    //   const res: any[] = (await onGetEstateTypes()) || []
    //   const estateTypeOptions: { label: string; value: string }[] = []
    //   res?.map((item: any) => {
    //     estateTypeOptions.push({
    //       label: item.name,
    //       value: item.code,
    //     })
    //   })
    //   setEstateTypeOptions(estateTypeOptions)
    // }
    // fetchEstateTypes()

    const fetchCart = async (): Promise<void> => {
      const res = await onGetCartList({
        page: 1,
        pageSize: 50,
      });
      setCartOptions(
        res?.elements?.map((item: any) => ({
          label: item.cartName,
          value: item.id,
        })) || [],
      );
    };
    fetchCart();
  }, []);

  const fetchInventoryTableFormat = async (inventoryTableId: string) => {
    if (!inventoryTableId) return;
    const res = await onGetInventoryInitCreate(inventoryTableId);
    const propertyList = res?.formData?.propertyList || [];
    const optionalList: any = [];
    const selectList: any = [];
    const nameList = <any>[];
    propertyList.map((item: any) => {
      const isList = item?.dataType?.isList;
      const isRequire = item?.isRequire;
      nameList.push(item.propertyCode);

      if (!isRequire) {
        optionalList.push(item.propertyCode);
      }

      if (isList) {
        selectList.push(item.propertyCode);
      }
    });
    setOptionalFields([...optionalFields, ...optionalList]);
    setSelectFields([...selectFields, ...selectList]);
    setPropertyList(propertyList);
  };

  useEffect(() => {
    if (info && Object.keys(info).length > 0) {
      const {draftString} = info;
      const dataSource = loadState(draftString);
      setDataSource(dataSource);

      const cartId = dataSource?.cartId;
      const inventoryTableId = dataSource?.inventoryTableId;
      form.setFieldsValue({
        cart: dataSource?.cart ? dataSource?.cart : null,
        province: dataSource?.province,
        inventoryTable: dataSource?.inventoryTable
          ? dataSource?.inventoryTable
          : null,
        estateType: dataSource?.estateType ? dataSource?.estateType : null,
      });
      fetchInventoryTable(cartId);
      fetchInventoryTableFormat(inventoryTableId);
    }
    handleCheckFormData();
  }, [info]);

  const handleChangeInventoryTableSelect = async (
    e: ChangeEvent<HTMLSelectElement>,
    option?: any,
  ) => {
    const inventoryTableId = option?.id;
    fetchInventoryTableFormat(inventoryTableId);
  };

  const handleCheckFormData = () => {
    const isValidForm: boolean = checkValidateForm(form, optionalFields);
    setDisabled(!isValidForm);
  };

  const handleChangeFormData = (e: any) => {
    const fieldInfo = e[0];
    const {name, value} = fieldInfo;
    const property: any = propertyList.filter(
      (item) => item.propertyCode == name[0],
    );
    let data: any;
    if (property.length) {
      const {draftString} = info;
      const source = loadState(draftString);
      const propertyValueList: any = source?.propertyValueList || [];
      const json: any = {
        [property[0].propertyCode]: {
          id: property[0]?.id,
          value: value,
        },
      };

      const json2 = {
        ...propertyValueList,
        ...json,
      };
      data = [
        {
          key: 'propertyValueList',
          value: json2,
        },
      ];
    } else {
      data = [
        {
          key: name[0],
          value: selectFields.includes(name[0])
            ? {
                key: name[0],
                value: value,
              }
            : value,
          id: property[0]?.id,
        },
      ];
    }

    handleSetFormData(data);
    handleCheckFormData();
  };

  return {
    dataSource,
    cartOptions,
    estateTypeOptions,
    inventoryTableOptions,
    propertyList,
    handleChangeFormData,
    handleChangeInventoryTableSelect,
  };
};

export default useStep1;
