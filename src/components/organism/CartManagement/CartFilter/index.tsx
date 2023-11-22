import AppButton from 'components/atoms/AppButton';
import AppForm from 'components/atoms/AppForm';
import AppInput from 'components/atoms/AppInput';
import {Col, Form, FormInstance, Row} from 'antd';

type PropsTypes = {
  form: FormInstance;
  onSubmitForm: (e: any) => void;
};
const CartFilter = (props: PropsTypes) => {
  const {form, onSubmitForm} = props;
  return (
    <Row gutter={[16, 16]} align={'bottom'}>
      <Col flex={'auto'}>
        <AppForm form={form}>
          <Form.Item name='search' label='Tìm kiếm'>
            <AppInput
              type='text'
              placeholder='Nhập mã giỏ hàng, tên giỏ hàng'
            />
          </Form.Item>
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
export default CartFilter;
