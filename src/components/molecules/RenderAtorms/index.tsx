import AppFormItem from 'components/atoms/AppFormItem';
import AppTypo from 'components/atoms/AppTypo';
import {memo} from 'react';
import AppThreeCols from '../AppThreeCols';
import AppDatePicker from 'components/atoms/AppDatePicker';
import {Col, Row} from 'antd';
import AppInput from 'components/atoms/AppInput';
import AppSelect from 'components/atoms/AppSelect';
import {modalInfo} from 'shared/constants/AppVariables';

type PropsTypes = {
  info: any;
  dataSource: Array<any>;
};

enum TYPE_COMPONENT {
  INPUT_NUMSTR = 1,
  SELECT = 2,
  INPUT_STR = 3,
  INPUT_NUM = 4,
  DATE = 5,
}

export const renderItem = (item: any, info: any) => {
  const type = item.dataType.id;
  switch (type) {
    case TYPE_COMPONENT.INPUT_NUMSTR:
      return (
        <AppFormItem
          name={item.propertyCode}
          label={item.propertyLabel}
          required={item.isRequire}
          key={item.propertyTypeId}
          rules={[
            {
              required: item.isRequire,
              message: `${item.propertyLabel} bắt buộc nhập`,
            },
          ]}
        >
          <AppInput
            type='text'
            placeholder={`Nhập ${item.propertyLabel}`}
            maxLength={item.maxLength}
            minLength={item.minLength}
            disabled={info.type === modalInfo.inventory.view.type}
          />
        </AppFormItem>
      );
    case TYPE_COMPONENT.SELECT:
      const pickListOptions = item.dataType.pickList.pickListOptions;
      const options = pickListOptions.map((item: any) => {
        return {
          label: item.optionLabel,
          value: item.optionCode,
        };
      });
      return (
        <AppFormItem
          name={item.propertyCode}
          label={item.propertyLabel}
          required={item.isRequire}
          key={item.propertyTypeId}
        >
          <AppSelect
            options={options || []}
            placeholder={`Chọn ${item.propertyLabel}`}
            disabled={info.type === modalInfo.inventory.view.type}
          />
        </AppFormItem>
      );
    case TYPE_COMPONENT.INPUT_STR:
      return (
        <AppFormItem
          name={item.propertyCode}
          label={item.propertyLabel}
          required={item.isRequire}
          key={item.propertyTypeId}
          rules={[
            {
              required: item.isRequire,
              message: `${item.propertyLabel} bắt buộc nhập`,
            },
          ]}
        >
          <AppInput
            type='text'
            placeholder={`Nhập ${item.propertyLabel}`}
            maxLength={item.maxLength}
            minLength={item.minLength}
            disabled={info.type === modalInfo.inventory.view.type}
          />
        </AppFormItem>
      );
    case TYPE_COMPONENT.INPUT_NUM:
      return (
        <AppFormItem
          key={item.propertyTypeId}
          name={item.propertyCode}
          label={item.propertyLabel}
          required={item.isRequire}
          rules={[
            {
              required: item.isRequire,
              message: `${item.propertyLabel} bắt buộc nhập`,
            },
          ]}
        >
          <AppInput
            type='text'
            placeholder={`Nhập ${item.propertyLabel}`}
            maxLength={item.maxLength}
            minLength={item.minLength}
            disabled={info.type === modalInfo.inventory.view.type}
          />
        </AppFormItem>
      );
    case TYPE_COMPONENT.DATE:
      return (
        <>
          <AppFormItem
            key={item.propertyTypeId}
            name={item.propertyCode}
            label={item.propertyLabel}
            required={item.isRequire}
          >
            <AppDatePicker />
          </AppFormItem>
        </>
      );

    default:
      return <></>;
  }
};
const RenderAtorms = (props: PropsTypes) => {
  const {info, dataSource} = props;
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <AppTypo variant='p-lg-semi'>Thông tin bất động sản</AppTypo>
        </Col>
        <Col xs={24}>
          <AppThreeCols>
            {dataSource.map((item: any) => {
              return renderItem(item, info);
            })}
          </AppThreeCols>
        </Col>
      </Row>
    </>
  );
};

export default memo(RenderAtorms); // RenderAtorms
