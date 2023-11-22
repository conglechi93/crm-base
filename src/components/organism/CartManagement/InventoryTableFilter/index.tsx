import {Col, Form, FormInstance, Row} from 'antd';

import AppButton from 'components/atoms/AppButton';
import AppForm from 'components/atoms/AppForm';
import AppInput from 'components/atoms/AppInput';
import AppSelect from 'components/atoms/AppSelect';

import useInventoryTableFilter from './useInventoryTableFilter';
import AppFormItem from 'components/atoms/AppFormItem';

type PropsTypes = {
  form: FormInstance;
  onSubmitForm: (e: any) => void;
  cartSelectDisabled: boolean;
};

const InventoryTableFilter = (props: PropsTypes) => {
  const {form, onSubmitForm, cartSelectDisabled} = props;
  const {cartOptions} = useInventoryTableFilter();
  return (
    <Row gutter={[16, 0]} align={'bottom'}>
      <Col flex={'auto'}>
        <AppForm
          form={form}
          initialValues={{
            isSystem: null,
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <AppFormItem name='search' label='Tìm kiếm'>
                <AppInput
                  type='text'
                  placeholder='Nhập mã bảng hàng, tên bảng hàng'
                />
              </AppFormItem>
            </Col>
            <Col span={12}>
              <AppFormItem name='cartId' label='Tên giỏ hàng'>
                <AppSelect
                  options={cartOptions}
                  placeholder='Chọn giỏ hàng'
                  disabled={cartSelectDisabled}
                />
              </AppFormItem>
            </Col>
          </Row>
        </AppForm>
      </Col>
      <Col flex={'none'}>
        <AppButton
          type='primary'
          onClick={() => {
            onSubmitForm(form.getFieldsValue());
          }}
        >
          Tìm kiếm
        </AppButton>
      </Col>
    </Row>
  );
};
export default InventoryTableFilter;
