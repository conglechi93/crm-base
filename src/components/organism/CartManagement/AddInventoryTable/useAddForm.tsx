import {useEffect, useState} from 'react';
import {AddFormType} from './interface';
import {onGetCartFormList} from 'redux/actions/ConfigManagement';
import {
  onGetCartList,
  onGetInventoryTableById,
} from 'redux/actions/CartManagement';
import {onGetEstateTypes} from 'redux/actions/Categories';

const useAddForm = (props: AddFormType) => {
  const {form, type, data} = props;
  const [formOptions, setFormOptions] = useState([]);
  const [cartOptions, setCartOptions] = useState([]);

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
    };
    getData();
    const getInventoryTable = async () => {
      const res = await onGetInventoryTableById(data?.id);
      form.setFieldsValue({
        inventoryTableName: res?.inventoryTableName,
        cartId: res?.cartId,
        formId: res?.formData?.id,
        estateTypeId: res?.estateType
          ? {
              value: res?.estateType?.code,
              label: res?.estateType?.name,
            }
          : null,
      });
    };
    if (type === 'view' || type === 'edit') {
      getInventoryTable();
    }
  }, []);

  const handleFormChange = (_: any, formData: any) => {};

  return {
    handleFormChange,
    formOptions,
    cartOptions,
  };
};

export default useAddForm;
