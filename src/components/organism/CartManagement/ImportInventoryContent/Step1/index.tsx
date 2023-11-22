import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppSelect from 'components/atoms/AppSelect';
import AppThreeCols from 'components/molecules/AppThreeCols';
import {Col, Form, Row} from 'antd';
import useStep1 from './useStep1';
import AppDraggerUpload from 'components/molecules/AppDraggerUpload';
import AppTypo from 'components/atoms/AppTypo';
import AppButton from 'components/atoms/AppButton';

type PropsTypes = {
  info: any;
  setDisabled: (value: boolean) => void;
  setFormId: (value: string) => void;
};
const Step1 = (props: PropsTypes) => {
  const {info, setDisabled, setFormId} = props;
  const [form] = Form.useForm();
  const {handleChangeFile, handleExportExcel, handleCustomRequest} = useStep1(
    form,
    info,
    setDisabled,
    setFormId,
  );
  return (
    <div>
      <AppForm form={form}>
        <AppThreeCols>
          <AppFormItem name='inventoryTable' label='Tên Bảng hàng' required>
            <AppSelect options={[]} placeholder='Chọn Bảng hàng' disabled />
          </AppFormItem>
          <AppFormItem name='cart' label='Tên giỏ hàng' required>
            <AppSelect options={[]} placeholder='Chọn Giỏ hàng' disabled />
          </AppFormItem>

          <AppFormItem name='estateType' label='Loại bất động sản' required>
            <AppSelect
              options={[]}
              placeholder='Chọn Loại bất động sản'
              disabled
            />
          </AppFormItem>
        </AppThreeCols>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <AppTypo variant='p-md-med'>Mô tả*</AppTypo>
            <p>
              {`Tải file `}
              <AppButton type='link' onClick={handleExportExcel}>
                {' '}
                tại đây
              </AppButton>
            </p>
          </Col>
          <Col xs={24}>
            <AppDraggerUpload
              handleChangeFile={handleChangeFile}
              handleCustomRequest={handleCustomRequest}
            />
          </Col>
        </Row>
      </AppForm>
    </div>
  );
};

export default Step1;
