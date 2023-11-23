import React, {useState} from 'react';
import HomeLogin from './Login';
import HomeUsers from './User';
import styles from './style.module.scss';

const HomeComponent = () => {
  const [isLoged, setIsLoged] = useState(false);
  return (
    <div className={styles.box_card}>
      {isLoged ? <HomeLogin /> : <HomeUsers />}
    </div>
  );
};

export default HomeComponent;
