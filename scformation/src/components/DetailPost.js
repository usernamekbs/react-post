import React, { useState, useEffect } from "react";
import service from "../services/soccerService";
import AddComment from "./comment/AddComment";
import Comment from "./comment/Comment";
import { useParams,Link } from 'react-router-dom';
import { Button,Form,Divider,Card,Typography,Space  } from 'antd';
import { LikeOutlined } from '@ant-design/icons';

const { Title } = Typography;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const DetailPost = () => {
    const [post, setPost] = useState([]) 
    const [commentLists, setCommentLists]  = useState([])
    const { pno } = useParams()

    useEffect(() => {

      detailPost() 
      commentList()
    
    }, []); 
   
   
    const detailPost = () => {
      service.getView(pno)
        .then(response => {
          setPost(response.data)
        }) 
        .catch(e => {
          console.log(e); 
        }); 
    }; 

    const commentList = () => {
      service.getAllComments(pno) 
        .then(response => {  
          setCommentLists(response.data)
        })       
        .catch(e => { 
          console.log(e);
      });
    }; 
    
    const deletePost = () =>{
      service.deletePost(pno) 
        .then(response => {  

        })       
        .catch(e => { 
          console.log(e);
      });
    }
  
    const updateComment = (comment) => {
      setCommentLists(commentLists.concat(comment))
    }  
  
    return ( 
      <div> 
        <Card>
          <div style={{background: '#ECECEC', padding: '0px'}}>
            <Title level={3} style={{marginLeft:'15px'}}>{post.title}</Title>
          </div>
          {post.content}<br></br>
          <LikeOutlined  style={{ fontSize: '16px', color: 'blue' }}/>
        </Card>
        <div> 
            {commentLists && commentLists.map((comments) => {
              
              return (  
                <div key={comments.cno}>  
                  <Comment
                    commentLists={comments}
                    setCommentLists={setCommentLists}
                    cno={comments.cno} 
                  />
                </div>
              );
            })} 
            <AddComment pno={post.pno} refreshFunction={updateComment} />
        </div>    
        <Form.Item style={{ marginTop: '20px' }}>
          <Link to="/">
            <Button type="primary">목록</Button>
            <Button type="primary" danger style={{marginLeft : 10}} onClick={deletePost}>삭제</Button>
          </Link>
          <Link to={'/update'} state={{ 
            pno: post.pno,
            title : post.title,
            content : post.content,
            writer : post.writer
          }} >
            <Button type="primary" danger style={{marginLeft : 10,borderColor:'green',backgroundColor:'green'}}>수정</Button>
          </Link>

        </Form.Item>
      </div>
    );
  };


  export default DetailPost;