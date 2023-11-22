import AppInput from 'components/atoms/AppInput';
import AppSelect from 'components/atoms/AppSelect';
import AppTypo from 'components/atoms/AppTypo';
import AppThreeCols from 'components/molecules/AppThreeCols';
import {Form} from 'antd';
import {memo} from 'react';
import useStep1 from './useStep1';
import AddressForm from 'components/molecules/AddressForm';
import AppForm from 'components/atoms/AppForm';
import {cartModalInfo} from 'shared/constants/AppVariables';
import AppFormItem from 'components/atoms/AppFormItem';

type PropsTypes = {
  info: any;
  setDisabled: (value: boolean) => void;
  handleSetFormData: (dataItems: Array<{key: string; value: any}>) => void;
};
const Step1 = (props: PropsTypes) => {
  const {info, setDisabled, handleSetFormData} = props;
  const [form] = Form.useForm();
  const {dataSource, investorOptions, legalDocsOptions, handleChangeFormData} =
    useStep1({
      info,
      form,
      setDisabled,
      handleSetFormData,
    });
  return (
    <AppForm form={form} onFieldsChange={handleChangeFormData}>
      <AppThreeCols>
        <AppFormItem
          name={'cartName'}
          label={'Tên giỏ hàng'}
          required
          rules={[{required: true, message: 'Tên giỏ hàng bắt buộc nhập'}]}
        >
          <AppInput
            type='text'
            placeholder='Nhập Tên giỏ hàng'
            disabled={info?.type === cartModalInfo.view.type}
          />
        </AppFormItem>
        <AppFormItem
          name={'acreage'}
          label={'Tổng diện tích'}
          rules={[{required: true, message: 'Tổng diện tích bắt buộc nhập'}]}
        >
          <AppInput
            type='text'
            placeholder='Nhập Tổng diện tích'
            disabled={info?.type === cartModalInfo.view.type}
          />
        </AppFormItem>
        <AppFormItem
          name={'scale'}
          label={'Quy mô'}
          rules={[{required: true, message: 'Quy mô bắt buộc nhập'}]}
        >
          <AppInput
            type='text'
            placeholder='Nhập Quy mô'
            disabled={info?.type === cartModalInfo.view.type}
          />
        </AppFormItem>
        <AppFormItem name={'investor'} label={'Chủ đầu tư'}>
          <AppSelect
            options={investorOptions}
            placeholder='Chọn Chủ đầu tư'
            disabled={info?.type === cartModalInfo.view.type}
          />
        </AppFormItem>
        <AppFormItem name={'lowestPrice'} label={'Giá từ'}>
          <AppInput
            type='text'
            placeholder='Nhập Giá từ'
            disabled={info?.type === cartModalInfo.view.type}
          />
        </AppFormItem>
        <AppFormItem name={'highestPrice'} label={'Giá đến'}>
          <AppInput
            type='text'
            placeholder='Nhập Giá đến'
            disabled={info?.type === cartModalInfo.view.type}
          />
        </AppFormItem>
        <AppFormItem name={'legalDoc'} label={'Giấy tờ pháp lý'}>
          <AppSelect
            options={legalDocsOptions}
            placeholder='Chọn Giấy tờ pháp lý'
            disabled={info?.type === cartModalInfo.view.type}
          />
        </AppFormItem>
      </AppThreeCols>

      <AppTypo variant='p-md-med'>Khu vực 1</AppTypo>
      <AddressForm info={info} form={form} dataSource={dataSource} />
    </AppForm>
  );
};

export default memo(Step1);
