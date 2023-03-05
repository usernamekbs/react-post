import React, { useState } from "react";
import { Button, Input } from 'antd';
import service from "../../services/soccerService";
const { TextArea } = Input;

const AddReply = (props) => {
    const { setShowReply, parent, pno, addComment } = props;
    const [commentValue, setCommentValue] = useState("")

    const handleAddReply  = (e) => {
        e.preventDefault(); 
       
        const newComment = {
          pno : pno,  
          content : commentValue,
          writer : "writer",
          parent : parent,
          del_status : "N" 
        }; 
           
        service.addReply(newComment)
          .then(response => {
            setCommentValue("")
            setShowReply(false)
            addComment(response.data)
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
                  placeholder="write some comments"
              />
              <Button style={{ width: '20%', height: '52px' }} onClick={handleAddReply }>저장</Button>
          </form>
        </>
    );
};

export default AddReply;