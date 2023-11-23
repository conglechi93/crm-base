import {Col, Radio, Row} from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppTypo from 'components/atoms/AppTypo';
import React from 'react';
import imgLogin from 'assets/image/img-login.jpg';
import AppCard from 'components/molecules/AppCard';
import {RadioChangeEvent} from 'antd/lib';
import {useRouter} from 'next/router';

const HomeUsers = () => {
  const router = useRouter();
  const onChangeRadio = (e: RadioChangeEvent) => {
    router.push('/cart-management/cart');
  };
  return (
    <Row gutter={[0, 24]}>
      <Col xs={{span: 24}}>
        <AppTypo variant='h2'>Đăng nhập hệ thống</AppTypo>
      </Col>
      <Col xs={{span: 24}}>
        <Radio.Group className='radio-group'>
          <Radio
            value={1}
            style={{marginBottom: '16px'}}
            onChange={onChangeRadio}
            className='app_card_radio'
          >
            <AppCard
              title={'Đăng nhập dưới tên Phạm Chương'}
              imageUrl={imgLogin.src}
            />
          </Radio>
          <Radio value={2}>
            <AppCard
              title={'Đăng nhập dưới tên Công ty TNHH Rồng Xanh Đất Phương Nam'}
              imageUrl={imgLogin.src}
            />
          </Radio>
        </Radio.Group>
      </Col>

      <Col xs={{span: 24}}>
        <AppButton type='primary'>Đăng xuất</AppButton>
      </Col>
      <Col xs={{span: 24}}>
        <span className='hotline'>Hotline: 1900 3427</span>
      </Col>
    </Row>
  );
};

export default HomeUsers;
