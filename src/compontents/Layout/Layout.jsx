import React, { useEffect, useRef, useState } from 'react'


import { Outlet, useNavigate } from 'react-router-dom'

import { Layout, Button } from 'antd'

import classes from './Layout.module.scss'

import { IoGrid, IoPerson, IoReader, IoSettings } from 'react-icons/io5';
import { GrTask } from 'react-icons/gr';
import { GiHamburgerMenu } from 'react-icons/gi';
import RightSidebar from '../RightSidebar/RightSidebar';
import NavigationSidebar from '../NavigationSidebar/NavigationSidebar';

export const PageLayout = ({ children }) => {
  const navigate = useNavigate();

  const { Header, Content, Footer, Sider } = Layout;

  
  const goToProfile = () => {
    navigate('/account'); // замените '/profile' на путь к вашей странице профиля
  };

  return (

    <Layout>
      {/* <Content> */}
      <Layout className={classes.layout_container} style={{ height: '100vh' }} >
        {/* <Sider theme='light' style={{ background: 'var(--primary-color)' }}> */}
        <NavigationSidebar />
        {/* </Sider> */}
        <Content className={classes.container} style={{ background: '#fff', borderRadius: '20px 0px 0px 20px', overflowY: 'auto', margin: '5px 0px' }}>
          <Outlet />
          <Button
            type="primary"
            icon={<IoPerson />}
            className="profile-button"
            onClick={goToProfile}
        >
        Профиль
        </Button>
        </Content>

        <RightSidebar />
        
        
      
      </Layout>

    </Layout>
  )
}
