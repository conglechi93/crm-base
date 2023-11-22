import {Col, Row} from 'antd';

import AppInput from 'components/atoms/AppInput';
import AppTypo from 'components/atoms/AppTypo';
import AppSelect from 'components/atoms/AppSelect';

import AppCheckbox from 'components/atoms/AppCheckbox';

import useAddPropertyForm from './useAddPropertyForm';
import {AddFormType} from './interface';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';

const AddPropertyForm = (props: AddFormType) => {
  const {onSubmit, isEdit, data} = props;
  const {
    defaultData,
    dataTypeOptions,
    pickListOptions,

    form,
    handleOnValuesChange,
  } = useAddPropertyForm({onSubmit, data, isEdit});

  const propertyTypeId = form.getFieldValue('propertyTypeId');
  const pickListId = form.getFieldValue('pickListId');
  return (
    <AppForm
      form={form}
      onValuesChange={handleOnValuesChange}
      initialValues={{
        enabledNullable: isEdit ? defaultData?.enabledNullable : false,
        enabledDuplicate: isEdit ? defaultData?.enabledDuplicate : false,
      }}
    >
      <Row gutter={[8, 8]}>
        {isEdit && (
          <Col span={12}>
            <AppFormItem
              name='propertyCode'
              label='Mã thuộc tính'
              rules={[{required: true, message: 'Mã thuộc tính bắt buộc nhập'}]}
            >
              <AppInput type='text' disabled />
            </AppFormItem>
          </Col>
        )}
        <Col span={12}>
          <AppFormItem
            name='propertyName'
            label='Tên thuộc tính'
            rules={[{required: true, message: 'Tên thuộc tính bắt buộc nhập'}]}
          >
            <AppInput type='text' placeholder='Nhập tên thuộc tính' />
          </AppFormItem>
        </Col>
        <Col span={12}>
          <AppFormItem
            name='propertyLabel'
            label='Tên hiển thị'
            rules={[{required: true, message: 'Tên hiển thị bắt buộc nhập'}]}
          >
            <AppInput type='text' placeholder='Nhập tên hiển thị' />
          </AppFormItem>
        </Col>
        <Col span={12}>
          <AppFormItem
            name='propertyTypeId'
            label='Kiểu dữ liệu'
            rules={[{required: true, message: 'Kiểu dữ liệu bắt buộc nhập'}]}
          >
            <AppSelect
              options={dataTypeOptions}
              placeholder='Chọn kiểu dữ liệu'
            />
          </AppFormItem>
        </Col>
        {propertyTypeId ? (
          propertyTypeId !== 2 ? (
            <Col span={24}>
              <AppTypo variant='p-md-med'>Thuộc tính dữ liệu</AppTypo>
              <AppFormItem
                name='maxLength'
                label='Số ký tự tối đa'
                rules={[
                  {required: true, message: 'Số ký tự tối đa bắt buộc nhập'},
                ]}
                preserve={false}
              >
                <AppInput type='text' suffix='max 255' />
              </AppFormItem>
              <AppFormItem
                name='enabledNullable'
                preserve={false}
                valuePropName='checked'
              >
                <AppCheckbox label='Bắt buộc khai báo' />
              </AppFormItem>
              <AppFormItem
                name='enabledDuplicate'
                preserve={false}
                valuePropName='checked'
              >
                <AppCheckbox label='Kiểm tra giá trị trùng' />
              </AppFormItem>
            </Col>
          ) : (
            <Col span={12}>
              <AppFormItem
                name='pickListId'
                label='Loại danh sách'
                rules={[
                  {required: true, message: 'Loại danh sách bắt buộc nhập'},
                ]}
                preserve={false}
              >
                <AppSelect
                  options={pickListOptions}
                  placeholder='Chọn loại danh sách'
                />
              </AppFormItem>
              <AppFormItem
                name='enabledNullable'
                preserve={false}
                valuePropName='checked'
              >
                <AppCheckbox label='Bắt buộc khai báo' />
              </AppFormItem>
            </Col>
          )
        ) : (
          <></>
        )}
        {pickListOptions
          ?.find((item: any) => item.value === pickListId)
          ?.pickListOptions?.map((item: any) => (
            <AppInput
              key={item.value}
              type='text'
              value={item.optionLabel}
              disabled={true}
            />
          ))}
      </Row>
    </AppForm>
  );
};

export default AddPropertyForm;
