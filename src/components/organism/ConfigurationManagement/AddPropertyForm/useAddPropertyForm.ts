import {useEffect, useState} from 'react';

import {Form} from 'antd';
import {AddFormType} from './interface';
import {onCategoryData} from 'redux/actions/ConfigManagement';
import {onGetPickList} from 'redux/actions/PickList';
import {checkValidateForm} from 'utils/FormHelper';
import {onGetPropertyById} from 'redux/actions/property';

const useAddPropertyForm = (props: AddFormType) => {
  const {onSubmit, isEdit, data} = props;
  const [form] = Form.useForm();
  const [dataTypeOptions, setDataTypeOptions] = useState<any>([]);
  const [pickListOptions, setPickListOptions] = useState<any>([]);

  const [defaultData, setDefaultData] = useState<any>({});

  const [formChange, setFormChange] = useState<boolean>(false);

  useEffect(() => {
    const getCategory = async () => {
      const res = await onCategoryData();
      let newData: any[] = [];
      if (res) {
        res.forEach((item: any) => {
          newData.push({
            id: item.id,
            value: item.id,
            label: item.typeName,
          });
        });
        setDataTypeOptions(newData);
      }
    };
    getCategory();

    const getPickList = async () => {
      const res = await onGetPickList({
        page: 1,
        pageSize: 50,
      });
      setPickListOptions(
        res?.elements?.map((item: any) => ({
          id: item.id,
          value: item.id,
          label: item.name,
          pickListOptions: item.pickListOptions,
        })),
      );
    };

    const getProperty = async () => {
      const res = await onGetPropertyById(data?.id);
      setDefaultData(res);
      form.setFieldsValue({
        propertyCode: res?.propertyCode,
        propertyName: res?.propertyName,
        propertyLabel: res?.propertyLabel,
        propertyTypeId: res?.dataType
          ? {
              value: res?.dataType?.id,
              label: res?.dataType?.typeName,
            }
          : null,
        enabledNullable: res?.enabledNullable,
        enabledDuplicate: res?.enabledDuplicate,
        maxLength: res?.maxLength,
        pickListId: res?.dataType?.pickList?.id,
      });
    };
    if (isEdit) {
      getProperty();
      getPickList();
    }
  }, []);

  useEffect(() => {
    //effect pass data to parent component when onchange
  }, [onSubmit, isEdit, data?.id, data?.isSystem]);

  useEffect(() => {
    const data = form.getFieldsValue();
    const optionalFields =
      data.propertyTypeId === 2
        ? ['enabledNullable']
        : ['enabledNullable', 'enabledDuplicate'];
    const isValid = checkValidateForm(form, optionalFields);
    onSubmit(data, isValid);
  }, [formChange]);

  const handleOnValuesChange = (changedValues: any, allValues: any) => {
    if (Object.keys(changedValues)[0] === 'propertyTypeId') {
      if (changedValues.propertyTypeId === 2) {
        const getData = async () => {
          const res = await onGetPickList({
            page: 1,
            pageSize: 50,
          });
          setPickListOptions(
            res?.elements?.map((item: any) => ({
              id: item.id,
              value: item.id,
              label: item.name,
              pickListOptions: item.pickListOptions,
            })),
          );
        };
        getData();
        form.setFieldValue('pickListId', undefined);
      } else {
        setPickListOptions([]);
        form.setFieldValue('maxLength', undefined);
      }
    }
    setFormChange((prevState) => !prevState);
  };

  return {
    defaultData,
    dataTypeOptions,
    pickListOptions,

    form,
    handleOnValuesChange,
  };
};

export default useAddPropertyForm;
