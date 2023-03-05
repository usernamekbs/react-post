import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { Breadcrumb, Layout, Menu  } from 'antd';

import 'antd/dist/antd.css'

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate()
  const items = [
    { label: 'Home', key: '' }, // remember to pass the key prop
    { label: 'Login', key: 'login' }, // which is required
  ];

  return (
      <Layout>
        <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={({key})=>{
            navigate(key);
          }}
          items={items}
        >
        </Menu> 
        </Header>
      </Layout>
    );
};

export default Navbar;