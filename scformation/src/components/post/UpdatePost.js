import React, { useState } from "react";
import { Button, Input,Form } from 'antd';
import service from "../../services/soccerService";
import { Link,useLocation,useNavigate   } from 'react-router-dom';
const { TextArea } = Input;

const UpdatePost = () => {
    const location = useLocation();  
    const navigate = useNavigate();
    const [title,setTitle] = useState(location.state.title)
    const [content,setContent] = useState(location.state.content)
    const [writer,setWriter] = useState(location.state.writer)

    const handleUpdatePost  = (e) => { 
        e.preventDefault(); 
       
        const updatePost = {
          pno : location.state.pno,
          title : title,
          content : content,
          writer : writer
        }; 
           
        service.updatePost(location.state.pno,updatePost)
          .then(response => {
            navigate(`/`)
          })  
          .catch(e => { 
            console.log(e);  
          });
    };

    return (
        <div>
          <TextArea placeholder="제목을 작성해주세요." autoSize value={title} onChange={e => setTitle(e.target.value)} />
          <div
            style={{
              margin: '24px 0',
            }}
          />
          <TextArea
            placeholder="작성자를 입력해주세요."  value={writer} onChange={e => setWriter(e.target.value)}
            autoSize={{
              minRows: 2,
              maxRows: 6,
            }}
          />
          <div
            style={{
              margin: '24px 0',
            }}
          />
          <TextArea rows={4} placeholder="내용을 입력해주세요." value={content} onChange={e => setContent(e.target.value)}/>
          
          <Form.Item style={{marginTop:20}}>
            <Link to="/">
              <Button type="primary">목록
              </Button>
            </Link>
              <Button type="primary" onClick={handleUpdatePost} style={{marginLeft:10}}>
                수정
              </Button>
          </Form.Item> 
        </div>
    );
};

export default UpdatePost;