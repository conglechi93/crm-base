import React from 'react';
import useAddForm from './useAddForm';
import {AddFormType} from './interface';
import {Col, Form, Row} from 'antd';
import AppInput from 'components/atoms/AppInput';
import AppSelect from 'components/atoms/AppSelect';
import AppTypo from 'components/atoms/AppTypo';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppThreeCols from 'components/molecules/AppThreeCols';

const AddInventoryTable = (props: AddFormType) => {
  const {form, type, data} = props;
  const {handleFormChange, formOptions, cartOptions} = useAddForm({
    form,
    type,
    data,
  });
  return (
    <>
      <AppForm form={form} onValuesChange={handleFormChange}>
        <AppThreeCols>
          <AppFormItem
            name='inventoryTableName'
            required={true}
            label={<AppTypo variant='p-md-med'>Tên bảng hàng</AppTypo>}
          >
            <AppInput
              type='text'
              disabled={type === 'view'}
              placeholder='Nhập tên bảng hàng'
            />
          </AppFormItem>
          <AppFormItem
            name='cartId'
            required={true}
            label={<AppTypo variant='p-md-med'>Giỏ hàng</AppTypo>}
          >
            <AppSelect
              options={cartOptions}
              disabled={type === 'view'}
              placeholder='Chọn giỏ hàng'
            />
          </AppFormItem>
          <AppFormItem
            name='formId'
            required={true}
            label={<AppTypo variant='p-md-med'>Biểu mẫu</AppTypo>}
          >
            <AppSelect
              options={formOptions}
              disabled={type === 'view'}
              placeholder='Chọn biểu mẫu'
            />
          </AppFormItem>
        </AppThreeCols>
      </AppForm>
    </>
  );
};

export default AddInventoryTable;
