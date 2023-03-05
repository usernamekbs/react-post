import React from 'react'
import { BrowserRouter as Router , Routes, Route } from "react-router-dom"
import AddPost from './components/AddPost'
import PostLists from './components/PostLists'
import DetailPost from './components/DetailPost'
import UpdatePost from './components/post/UpdatePost'
import LoginForm from './components/user/LoginForm'
import AddMember from './components/user/AddMember'
import NotFound from './components/error/NotFound'
import Navbar from './components/menu/Navbar'
import { Layout } from 'antd';

import 'antd/dist/antd.css'

const { Content, Footer } = Layout;

const App = () =>{
  return (
    <> 
    <Router>
      <Navbar />
        <Content
          style={{
            padding: '0 50px',
          }}>
          <div className="site-layout-content">
            <Routes> 
              <Route path={"/login"} element={ <LoginForm/> } />
              <Route path={"/AddMember"} element={ <AddMember/> } />
              <Route path={"/"} element={ <PostLists/> } />
              <Route path={"/list"} element={ <PostLists/>} />
              <Route path={"/update"} element={ <UpdatePost/>} />
              <Route path={"/AddPost"} element={ <AddPost />} />
              <Route path={"/view/:pno"} element={ <DetailPost />} /> 
              <Route path={"*"} element={ <NotFound /> } /> 
            </Routes>
          </div>
        </Content>
        <Footer style={{
          textAlign: 'center',
        }}>
          2022년도에 만들어진 사이트입니다.
        </Footer>
   </Router>
   </>
  );
}

export default App;