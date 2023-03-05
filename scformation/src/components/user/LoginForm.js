import { LockOutlined, UserOutlined } from '@ant-design/icons'; 
import { Button, Checkbox, Form, Input,Card } from 'antd';
import { useNavigate,Link } from 'react-router-dom';
import React from 'react';
import service from "../../services/soccerService";

const LoginForm = () => {
    const navigate = useNavigate()
  
    const memberLogin = (values) => {

      service.getLogin(values.username) 
        .then(response => {
          console.log(response) 
          navigate("/"); 
        }) 
        .catch(e => {
          console.log(e); 
        }); 
    }; 

    return (
      <Card style={{backgroundColor:'#f6ffed'}}>
      <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={memberLogin}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
          </Form.Item>
          <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" >
              Log in 
            </Button>
            Or <Link to="/SignIn">register now!</Link>
          </Form.Item>
      </Form>
      </Card>
    );
};

export default LoginForm;