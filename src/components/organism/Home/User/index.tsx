import {Col, Radio, Row} from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppTypo from 'components/atoms/AppTypo';
import React from 'react';
import AppCard from 'components/molecules/AppCard';
import {RadioChangeEvent} from 'antd/lib';
import styles from '../style.module.scss';
import {onGetShopDetail} from 'redux/actions/Shops';
import {useAppDispatch, useAppSelector} from 'redux/hook';
import {onLogout} from 'redux/actions/Auth';

type PropsTypes = {
  dataUser: any;
};

const HomeUsers = (props: PropsTypes) => {
  const {dataUser} = props;
  const dispatch = useAppDispatch();
  const {accessToken} = useAppSelector((state) => state.auth);

  const fetchAPI = async (value: any) => {
    const prefixUser = dataUser[0]?.detail?.authorId;
    const param = value == 1 ? `U_${prefixUser}` : `E_${prefixUser}`;
    await dispatch(onGetShopDetail(param));
  };
  const onChangeRadio = (e: RadioChangeEvent) => {
    const value = e.target.value;
    fetchAPI(value?.type?.code);
  };

  const handleLogout = async () => {
    await dispatch(onLogout(accessToken));
  };
  return (
    <Row gutter={[0, 24]} className={styles.profiles}>
      <Col xs={{span: 24}}>
        <AppTypo variant='h2'>Đăng nhập hệ thống</AppTypo>
      </Col>
      <Col xs={{span: 24}}>
        <Radio.Group>
          {dataUser?.map((item: any, index: number) => {
            return (
              <Radio key={index} value={item} onChange={onChangeRadio}>
                <AppCard
                  title={`Đăng nhập dưới tên ${
                    item?.type?.code == 1
                      ? item?.detail?.fullName
                      : item?.detail?.name
                  }`}
                  imageUrl={item?.detail?.avatar}
                />
              </Radio>
            );
          })}
        </Radio.Group>
      </Col>

      <Col xs={{span: 24}}>
        <AppButton type='primary' onClick={handleLogout}>
          Đăng xuất
        </AppButton>
      </Col>
      <Col xs={{span: 24}}>
        <a href='tel:1900 3427' className='hotline'>
          Hotline: 1900 3427
        </a>
      </Col>
    </Row>
  );
};

export default HomeUsers;
