import {memo} from 'react';
import AppThreeCols from '../AppThreeCols';
import {Form, Select} from 'antd';
import AppSelect from 'components/atoms/AppSelect';
import AppInput from 'components/atoms/AppInput';
import useAddressForm from './useAddressForm';
import {FormInstance} from 'antd';
import {cartModalInfo} from 'shared/constants/AppVariables';
import AppFormItem from 'components/atoms/AppFormItem';

const AddressForm = ({
  info,
  form,
  dataSource,
}: {
  info: any;
  form: FormInstance;
  dataSource?: any;
}) => {
  const {
    provinceOptions,
    districtOptions,
    wardOptions,
    handleChangeProvince,
    handleChangeDistrict,
    districtDisabled,
    wardDisabled,
  } = useAddressForm({form, dataSource});

  return (
    <>
      <AppThreeCols>
        <AppFormItem
          name={'province'}
          label={'Tỉnh/Thành phố'}
          rules={[{required: true, message: 'Tỉnh/Thành phố bắt buộc nhập'}]}
        >
          <AppSelect
            options={provinceOptions}
            onChange={(e, option) => handleChangeProvince(e, option)}
            placeholder='Chọn Tỉnh/Thành phố'
            disabled={info?.type === cartModalInfo.view.type}
          />
        </AppFormItem>
        <AppFormItem name={'district'} label={'Quận/huyện'}>
          <AppSelect
            options={districtOptions}
            disabled={
              districtDisabled || info?.type === cartModalInfo.view.type
            }
            onChange={(e, option) => handleChangeDistrict(e, option)}
            placeholder='Chọn Quận/huyện'
          />
        </AppFormItem>
        <AppFormItem name={'ward'} label={'Phường/xã'}>
          <AppSelect
            options={wardOptions}
            disabled={wardDisabled || info?.type === cartModalInfo.view.type}
            placeholder='Chọn Phường/xã'
          />
        </AppFormItem>
      </AppThreeCols>
      <AppFormItem name={'street'} label={'Số nhà, đường phố'}>
        <AppInput
          type='text'
          placeholder='Số nhà, đường phố'
          disabled={info?.type === cartModalInfo.view.type}
        />
      </AppFormItem>
    </>
  );
};
export default memo(AddressForm);
