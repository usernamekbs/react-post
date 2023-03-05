import React, { useState } from "react";
import { Button, Input,Form } from 'antd';
import service from "../../services/soccerService";
const { TextArea } = Input;

const UpdateReply = (props) => {
    const { setShowReply, comment, updateComment, setEdit } = props;
    const [commentValue, setCommentValue] = useState(props.comment.content)
   
    const handleUpdateReply  = (e) => { 
        e.preventDefault(); 
       
        const newComment = {
          cno : comment.cno,
          pno : comment.pno,  
          content : commentValue,
          writer : "writer",
          parent : comment.parent,
          del_status : "N" 
        }; 
           
        service.updateReply(newComment)
          .then(response => {
            setShowReply(false)
            setEdit(false)
            updateComment(response.data)
            alert(response.data.message)
          })  
          .catch(e => { 
            console.log(e);  
          });
    };

    const handleChange = (e) => { 
        setCommentValue(e.currentTarget.value)
    }

    return (
        <>
            
            <form style={{ display: 'flex' }}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={commentValue}
                    placeholder="write some comments">
                </TextArea>
                <Button style={{ width: '20%', height: '52px' }} onClick={handleUpdateReply}>저장</Button>
            </form>
           
        </>
    );
};

export default UpdateReply;