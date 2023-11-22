import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import AppSelect from 'components/atoms/AppSelect';
import AppTypo from 'components/atoms/AppTypo';
import AddressForm from 'components/molecules/AddressForm';
import AppThreeCols from 'components/molecules/AppThreeCols';
import {Col, Form, Row} from 'antd';
import useStep1 from './useStep1';
import RenderAtorms from 'components/molecules/RenderAtorms';
import {memo} from 'react';
import {modalInfo} from 'shared/constants/AppVariables';
type PropsTypes = {
  info: any;
  setDisabled: (value: boolean) => void;
  handleSetFormData: (dataItems: Array<{key: string; value: any}>) => void;
};
const Step1 = (props: PropsTypes) => {
  const {info, setDisabled, handleSetFormData} = props;
  const [form] = Form.useForm();
  const {
    dataSource,
    cartOptions,
    // estateTypeOptions,
    inventoryTableOptions,
    propertyList,
    handleChangeFormData,
    handleChangeInventoryTableSelect,
  } = useStep1(info, form, setDisabled, handleSetFormData);
  return (
    <div>
      <AppForm form={form} onFieldsChange={handleChangeFormData}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <AppTypo variant='p-lg-semi'>Thông tin cơ bản</AppTypo>
            <AppThreeCols>
              <AppFormItem
                name='inventoryCode'
                label='Mã mặt hàng'
                rules={[{required: true, message: 'Mã mặt hàng bắt buộc nhập'}]}
              >
                <AppInput
                  type='text'
                  placeholder='Nhập mã mặt hàng'
                  disabled={info.type === modalInfo.inventory.view.type}
                />
              </AppFormItem>
              <AppFormItem
                name='cart'
                label='Tên giỏ hàng'
                rules={[
                  {required: true, message: 'Tên giỏ hàng bắt buộc nhập'},
                ]}
              >
                <AppSelect
                  options={cartOptions}
                  placeholder='Chọn giỏ hàng'
                  disabled
                />
              </AppFormItem>
              <AppFormItem
                name='inventoryTable'
                label='Tên bảng hàng'
                rules={[
                  {required: true, message: 'Tên bảng hàng bắt buộc nhập'},
                ]}
              >
                <AppSelect
                  options={inventoryTableOptions}
                  placeholder='Chọn tên bảng hàng'
                  disabled={dataSource.inventoryTable ? true : false}
                  onChange={(e, option) =>
                    handleChangeInventoryTableSelect(e, option)
                  }
                />
              </AppFormItem>
            </AppThreeCols>
            <AppThreeCols>
              <AppFormItem
                name='unitPrice'
                label='Đơn giá'
                rules={[{required: true, message: 'Đơn giá bắt buộc nhập'}]}
              >
                <AppInput
                  type='text'
                  placeholder='Nhập đơn giá'
                  disabled={info.type === modalInfo.inventory.view.type}
                />
              </AppFormItem>
              <AppFormItem name='saleDoc' label='Tài liệu bán hàng'>
                <AppInput
                  type='text'
                  placeholder='Nhập tài liệu bán hàng'
                  disabled={info.type === modalInfo.inventory.view.type}
                />
              </AppFormItem>
              <AppFormItem name='legalDoc' label='Tài liệu pháp lý'>
                <AppInput
                  type='text'
                  placeholder='Nhập tài liệu pháp lý'
                  disabled={info.type === modalInfo.inventory.view.type}
                />
              </AppFormItem>
            </AppThreeCols>

            <AddressForm info={info} form={form} dataSource={dataSource} />
          </Col>
          <Col xs={24}>
            <RenderAtorms dataSource={propertyList} info={info} />
          </Col>
        </Row>
      </AppForm>
    </div>
  );
};

export default memo(Step1);
