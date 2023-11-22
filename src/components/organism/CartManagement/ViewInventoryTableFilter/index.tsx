import {Col, FormInstance, Row} from 'antd';

import AppButton from 'components/atoms/AppButton';
import AppForm from 'components/atoms/AppForm';
import AppInput from 'components/atoms/AppInput';
import AppSelect from 'components/atoms/AppSelect';

import useViewInventoryTableFilter from './useViewInventoryTableFilter';
import AppFormItem from 'components/atoms/AppFormItem';

type PropsTypes = {
  form: FormInstance;
};

const ViewInventoryTableFilter = (props: PropsTypes) => {
  const {form} = props;
  const {statusOptions} = useViewInventoryTableFilter();
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
              <AppFormItem name='codeReal' label='Mã BĐS'>
                <AppInput type='text' placeholder='Nhập mã BĐS' />
              </AppFormItem>
            </Col>
            <Col span={12}>
              <AppFormItem name='statusViewInventory' label='Trạng thái'>
                <AppSelect options={statusOptions} placeholder='Tất cả' />
              </AppFormItem>
            </Col>
          </Row>
        </AppForm>
      </Col>
      <Col flex={'none'}>
        <AppButton type='primary'>Tìm kiếm</AppButton>
      </Col>
    </Row>
  );
};
export default ViewInventoryTableFilter;
