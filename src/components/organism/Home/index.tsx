import React, {memo, useEffect, useState} from 'react';
import HomeLogin from './Login';
import HomeUsers from './User';
import styles from './style.module.scss';
import {onGetListProfile} from 'redux/actions/Auth';
import {useAppDispatch, useAppSelector} from 'redux/hook';

const HomeComponent = () => {
  const dispatch = useAppDispatch();
  const {isAuthenticated} = useAppSelector((state) => state.auth);
  const [dataUser, setDataUser] = useState<any>(null);

  const fetchAPI = async () => {
    const res = await dispatch(onGetListProfile());
    if (res) setDataUser(res);
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div className={styles.box_card}>
      {!isAuthenticated ? <HomeLogin /> : <HomeUsers dataUser={dataUser} />}
    </div>
  );
};

export default memo(HomeComponent);
