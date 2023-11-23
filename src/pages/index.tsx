// import AppPage from '@crema/hoc/AppPage';
import asyncComponent from '@crema/utility/asyncComponent';
import React from 'react';

const Home = asyncComponent(() => import('../modules/home'));
const HomePage = () => {
  return <Home />;
};
export default HomePage;
