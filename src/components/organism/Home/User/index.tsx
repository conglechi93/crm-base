import {Avatar, Col, Radio, Row} from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppTypo from 'components/atoms/AppTypo';
import React from 'react';
import imgLogin from 'assets/image/img-login.jpg';

const HomeUsers = () => {
  return (
    <div className='box-login'>
      <Row gutter={[0, 24]}>
        <Col xs={{span: 24}}>
          <AppTypo variant='h2'>Đăng nhập hệ thống</AppTypo>
        </Col>
        <Col xs={{span: 24}}>
          <Radio.Group>
            <Radio
              value={1}
              // key={index}
              // onChange={onChangeRadio}
              className='card'
            >
              <Row gutter={[0, 16]}>
                <Col xs={{span: 24}}>
                  <Avatar size={60} src={imgLogin.src} />
                </Col>
                <Col xs={{span: 24}}>
                  <AppTypo variant='p-md-reg'>
                    Đăng nhập dưới tên Phạm Chương
                  </AppTypo>
                </Col>
              </Row>
            </Radio>
            <Radio value={2} className='card'>
              <Row gutter={[0, 16]}>
                <Col xs={{span: 24}}>
                  <Avatar size={60} src={imgLogin.src} />
                </Col>
                <Col xs={{span: 24}}>
                  <AppTypo variant='p-md-reg'>
                    Đăng nhập dưới tên Công ty TNHH Rồng Xanh Đất Phương Nam
                  </AppTypo>
                </Col>
              </Row>
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
    </div>
  );
};

export default HomeUsers;
