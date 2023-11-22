import {Col, Form, FormInstance, Row} from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';

type PropsTypes = {
  form: FormInstance;
  onSubmitForm: (e: any) => void;
};

const PickListFilter = (props: PropsTypes) => {
  const {form, onSubmitForm} = props;
  return (
    <Row gutter={[16, 0]} align={'bottom'}>
      <Col flex={'auto'}>
        <AppForm form={form}>
          <AppFormItem name='search' label='Tìm kiếm'>
            <AppInput type='text' placeholder='Search' />
          </AppFormItem>
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
export default PickListFilter;
