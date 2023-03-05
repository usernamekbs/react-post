import React,{useState} from 'react';
import service from "../../services/soccerService";
import { useNavigate,Link } from 'react-router-dom';
import { Button, Form, Input, Select, Space, Tooltip, Typography } from 'antd';
  
const AddMember = () => {
    const navigate = useNavigate()
    const [member_id, setMemberId] = useState('')
    const [exists,setExists] = useState(false)
    const [message, setMessage] = useState()

    const memberExistsId = () => {
      
      service.getmemberExistsId(member_id) 
        .then(res => { 
          // setMessage(res.data.message)
          console.log(res)
          setExists(true)
          console.log(exists)
        }) 
        .catch(e => {
          console.log(e); 
        }); 
    }; 

    const onFinish = (values) => {
      
      const data = {
          member_id          : values.member_id,
          member_password    : values.member_password,
          member_chkpassword : values.member_chkpassword,
          member_email       : values.member_email,
          member_nick        : values.member_nick
        }
        
        if(exists===false){
          console.log(exists)
          alert("아이디 중복체크를 다시해주세요.")
        }else{
          service.createMember(data)
          .then(res => {
            console.log(exists)
            if(res.data.message!=='회원 가입이 완료되었습니다.'){
              alert(res.data.message)
              
            }else{
                alert("회원가입이 완료되었습니다")
                navigate("/");
            
            }
            
            })
          .catch(e => {
            console.log(e);
          });
        }
    };

    return (
      <Form
        name="complex-form"
        onFinish={onFinish}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
      >
      <Form.Item label="Username">
        <Space>
          <Form.Item
            name="member_id"
            noStyle
            rules={[
              {
                required: true,
                message: '아이디를 입력해주세요',
              },
            ]}
          >
            <Input
              value={member_id} onChange={e => setMemberId(e.target.value)}
              style={{
                width: 300,   
              }}
              placeholder="Please input"
            />
          </Form.Item>
          <Tooltip title="버튼을 눌러 아이디 중복체크를 해주세요">
            <Button style={{backgroundColor:'#91d5ff',color:'white'}} onClick={memberExistsId}>아이디 중복체크</Button>
          </Tooltip>
        </Space>
      </Form.Item>
      <Form.Item label="Password">
        <Space>
          <Form.Item
            name="member_password"
            noStyle
            rules={[
              {
                required: true,
                message: '패스워드를 입력해주세요',
              },
            ]}
          >
            <Input.Password
              style={{
                width: 300,
              }}
              placeholder="Please input"
            />
          </Form.Item>
          
        </Space>
      </Form.Item>        
      <Form.Item label="Password">
        <Space>
          <Form.Item
            name="member_chkpassword"
            noStyle
            rules={[
              {
                required: true,
                message: '패스워드를 입력해주세요',
              },
            ]}
          >
            <Input.Password
              style={{
                width: 300,
              }}
              placeholder="Please input"
            />
          </Form.Item>
          
        </Space>
      </Form.Item> 
      <Form.Item
          name='member_email'
          label="Email"
          rules={[
            {
              type: 'email',
              required: true,
              message: '이메일을 입력해주세요',
            },
          ]}
        >
          <Input style={{
                width: 300,
              }}
              placeholder="Please input"/>
        </Form.Item>
        <Form.Item
            name="member_nick"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[
            {
                required: true,
                message: '닉네임을 입력해주세요',
                whitespace: true,
            },
            ]}
        >
            <Input style={{
                width: 300,
              }}
              placeholder="Please input"/>
        </Form.Item>
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    );
  };

export default AddMember;  