import React from 'react';
import useAddForm from './useViewInventoryTable';
import {AddFormType} from './interface';
import {Col, Form, Row} from 'antd';
import AppInput from 'components/atoms/AppInput';
import AppSelect from 'components/atoms/AppSelect';
import AppTypo from 'components/atoms/AppTypo';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppThreeCols from 'components/molecules/AppThreeCols';
import AddressForm from 'components/molecules/AddressForm';
import ViewInventoryTableFilter from '../ViewInventoryTableFilter';
import AppButton from 'components/atoms/AppButton';
import {AppTableContainer} from '@crema';

type PropsType = {
  data: any;
};
const ViewInventoryTable = (props: PropsType) => {
  const {data} = props;
  const {
    form,
    searchForm,
    handleFormChange,
    formOptions,
    cartOptions,
    estateTypeOptions,
    columns,
  } = useAddForm(data);
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <AppForm form={form} onValuesChange={handleFormChange}>
            <Row gutter={[16, 0]} align={'bottom'}>
              <Col xs={24}>
                <AppThreeCols>
                  <AppFormItem
                    name='inventoryTableName'
                    required={true}
                    label={<AppTypo variant='p-md-med'>Tên bảng hàng</AppTypo>}
                  >
                    <AppInput type='text' placeholder='Nhập tên bảng hàng' />
                  </AppFormItem>
                  <AppFormItem
                    name='cartId'
                    required={true}
                    label={<AppTypo variant='p-md-med'>Giỏ hàng</AppTypo>}
                  >
                    <AppSelect
                      options={cartOptions}
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
                      placeholder='Chọn biểu mẫu'
                    />
                  </AppFormItem>
                </AppThreeCols>
              </Col>
              <Col xs={24}>
                <Row gutter={[16, 0]}>
                  <Col xs={8}>
                    <AppFormItem
                      name='estateTypeId'
                      label={
                        <AppTypo variant='p-md-med'>
                          Loại hình bất động sản
                        </AppTypo>
                      }
                    >
                      <AppSelect
                        options={estateTypeOptions}
                        placeholder='Chọn loại hình bất động sản'
                      />
                    </AppFormItem>
                  </Col>
                </Row>
              </Col>
              <Col xs={24}>
                <AddressForm form={form} info={{}} />
              </Col>
            </Row>
          </AppForm>
        </Col>
        <Col xs={24}>
          <ViewInventoryTableFilter form={searchForm} />
        </Col>
        <Col xs={24}>
          <AppTableContainer className='' columns={columns} dataSource={[]} />
        </Col>
      </Row>
    </>
  );
};

export default ViewInventoryTable;
