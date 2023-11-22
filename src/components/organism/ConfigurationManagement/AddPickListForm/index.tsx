import AppForm from 'components/atoms/AppForm';
import {AddPickListType} from './interface';

import useAddPickListForm from './useAddPickListForm';
import {Col, Row} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import AppInput from 'components/atoms/AppInput';
import AppButton from 'components/atoms/AppButton';
import AppFormItem from 'components/atoms/AppFormItem';

import PlusIcon from '@/assets/icons/plus.svg';
import MinusIcon from '@/assets/icons/minus.svg';
import Image from 'next/image';

const AddPickListForm = (props: AddPickListType) => {
  const {onSubmit, type, data} = props;
  const {
    form,
    handleFormChange,
    options,
    addOption,
    deleteOption,
    handleOptionChange,
    handleDragStart,
    handleDragOver,
    handleDrop,
  } = useAddPickListForm({onSubmit, type, data});
  return (
    <>
      <AppForm form={form} onValuesChange={handleFormChange}>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <AppFormItem
              name='name'
              label='Tên dữ liệu'
              required
              rules={[{required: true, message: 'Tên dữ liệu bắt buộc nhập'}]}
            >
              <AppInput
                type='text'
                disabled={type === 'view'}
                placeholder='Nhập Tên dữ liệu'
              />
            </AppFormItem>
          </Col>
          <Col span={24}>
            <AppFormItem name='description' label='Mô tả'>
              <AppInput
                type='text'
                disabled={type === 'view'}
                placeholder='Nhập Mô tả'
              />
            </AppFormItem>
          </Col>
          <Col span={24}>
            <Row gutter={[0, 8]} justify={'center'}>
              <Col span={24}>
                <AppTypo variant='p-md-semi'>Danh sách lựa chọn</AppTypo>
              </Col>
              {options?.map((option, index) => {
                return (
                  <Col
                    span={16}
                    key={option.id}
                    draggable
                    onDragStart={(event) =>
                      handleDragStart(event, Number(option.id))
                    }
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop(event, Number(option.id))}
                  >
                    <Row gutter={[14, 0]} align={'middle'} justify={'center'}>
                      <Col flex={'auto'}>
                        <AppInput
                          type='text'
                          value={option.value}
                          onChange={(event) =>
                            handleOptionChange(
                              Number(option.id),
                              event.target.value,
                            )
                          }
                          disabled={type === 'view'}
                        />
                      </Col>
                      <Col flex={'88px'}>
                        <Row gutter={[8, 0]}>
                          <Col>
                            <Image
                              src={PlusIcon}
                              onClick={() => {
                                if (type !== 'view') {
                                  addOption(index);
                                }
                              }}
                              alt=''
                            />
                          </Col>
                          <Col>
                            {options.length > 1 && (
                              <Image
                                src={MinusIcon}
                                onClick={() => {
                                  if (type !== 'view') {
                                    deleteOption(Number(option.id));
                                  }
                                }}
                                alt=''
                              />
                            )}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </AppForm>
    </>
  );
};

export default AddPickListForm;
