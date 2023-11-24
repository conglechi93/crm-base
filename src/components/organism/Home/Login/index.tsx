import {Col, Row} from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppTypo from 'components/atoms/AppTypo';
import Image from 'next/image';
import React from 'react';
import imgLogin from 'assets/image/img-login.jpg';
import styles from '../style.module.scss';

const HomeLogin = () => {
  return (
    <div className={styles.box_login}>
      <Row gutter={[0, 24]}>
        <Col xs={{span: 24}}>
          <AppTypo variant='h2'>Đăng nhập hệ thống</AppTypo>
        </Col>
        <Col xs={{span: 24}}>
          <Image src={imgLogin} alt='Đăng nhập' className='img' />
        </Col>
        <Col xs={{span: 24}}>
          <AppButton type='primary'>Đăng nhập qua VARs ID</AppButton>
        </Col>
        <Col xs={{span: 24}}>
          <span className='hotline'>Hotline: 1900 3427</span>
        </Col>
      </Row>
    </div>
  );
};

export default HomeLogin;
