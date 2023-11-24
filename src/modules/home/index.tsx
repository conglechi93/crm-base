import {Col, Row} from 'antd';
import React from 'react';
import bgCover from 'assets/image/cover_bg.png';
import HomeComponent from 'components/organism/Home';
import logoImg from 'assets/logo/logo.png';
import Image from 'next/image';

const Home = () => {
  return (
    <div className='homepage' style={{backgroundImage: `url(${bgCover.src})`}}>
      <Row>
        <Col xs={{span: 24}}>
          <a href='/' className='logo'>
            <Image src={logoImg} alt='Logo' />
          </a>
        </Col>
      </Row>
      <HomeComponent />
    </div>
  );
};

export default Home;
