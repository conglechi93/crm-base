import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import {modalInfo} from 'shared/constants/AppVariables';
import {Col, Form, Row} from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useAddCartContent from './useAddCartContent';

type PropsTypes = {
  info: any;
  setDisabled: (value: boolean) => void;
};

const AddCartContent = (props: PropsTypes) => {
  const {info, setDisabled} = props;
  const [form] = Form.useForm();
  const {value, handleChangeReactQuill, handleChangeFormData} =
    useAddCartContent(form, info, setDisabled);
  return (
    <>
      <AppForm form={form} onFieldsChange={handleChangeFormData}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24}>
            <AppFormItem label='Tên giỏ hàng' name='cartName' required>
              <AppInput
                type='text'
                placeholder='Nhập tên giỏ hàng'
                disabled={info.type == modalInfo.inventory.view.type}
              />
            </AppFormItem>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <AppFormItem label='Mô tả' name='description'>
              <ReactQuill
                theme='snow'
                value={value}
                onChange={handleChangeReactQuill}
                readOnly={info.type == modalInfo.inventory.view.type}
              />
            </AppFormItem>
          </Col>
        </Row>
      </AppForm>
    </>
  );
};

export default AddCartContent;
