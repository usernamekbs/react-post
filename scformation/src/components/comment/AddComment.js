import React, { useState } from "react";
import service from "../../services/soccerService";
import { Input } from 'antd';
const { TextArea } = Input; 

const AddComment = (props) => {
  const [Comment, setComment] = useState("");   

  const handleChange = (e) => {
      setComment(e.currentTarget.value)  
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      pno : props.pno, 
      content : Comment,
      writer : "writer",
      parent : null 
    };

    service.addReply(newComment)
      .then(response => {
        props.refreshFunction(response.data)
        setComment("")
        alert(response.data.message)
      })
      .catch(e => {
        console.log(e); 
      });
   };
  
    return (  
      <div>
      
        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
            <TextArea
                style={{ width: '100%', borderRadius: '5px' }}
                onChange={handleChange}
                value={Comment}
                placeholder="write some comments"
            />
            <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>저장</button>
        </form>
      </div>  
    ); 
  };


  export default AddComment;