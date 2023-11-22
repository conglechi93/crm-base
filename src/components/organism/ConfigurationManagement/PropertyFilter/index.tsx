import AppButton from 'components/atoms/AppButton';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import {Col, Form, FormInstance, Row} from 'antd';
import AppSelect from 'components/atoms/AppSelect';

type PropsTypes = {
  form: FormInstance;
  onSubmitForm: (e: any) => void;
};

const PropertyFilter = (props: PropsTypes) => {
  const {form, onSubmitForm} = props;
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
                <AppInput type='text' placeholder='Search' />
              </AppFormItem>
            </Col>
            <Col span={12}>
              <AppFormItem name='isSystem' label='Loại'>
                <AppSelect
                  options={[
                    {label: 'Tất cả', value: null},
                    {label: 'Từ hệ thống', value: true},
                    {
                      label: 'Từ thêm mới',
                      value: false,
                    },
                  ]}
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
export default PropertyFilter;
