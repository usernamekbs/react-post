import React,{useState} from "react";
import { useNavigate,Link } from 'react-router-dom';
import service from "../services/soccerService";
import { Input,Button,Form } from 'antd';
import "../App.css";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import DragDrop from "./DragDrop";

const { TextArea } = Input;
const AddPost = () => {
  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')
  const [writer,setWriter] = useState('')

  const navigate = useNavigate()
  
  const savePost = () => {
    const data = {
      title    : title,
      content  : content,
      writer   : writer
    }

    service.addPost(data)
      .then(response => {
        console.log(response)
          navigate("/");
       })
      .catch(e => {
        console.log(e);
      });
  };
 

  return (
    <div style={{marginTop:'20px'}}>
      <TextArea placeholder="제목을 작성해주세요." autoSize value={title}  onChange={e => setTitle(e.target.value)} />
      <div
        style={{
          margin: '24px 0',
        }}
      />
      <TextArea
        placeholder="작성자를 입력해주세요." value={writer}  onChange={e => setWriter(e.target.value)}
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
          </Button>&nbsp;
        </Link>
        <Button type="primary" onClick={savePost}>
          저장
        </Button>
      </Form.Item>
      
      {/* <DndProvider backend={HTML5Backend}>
          <div className="App">
            <DragDrop />
          </div>
        </DndProvider> */}
    </div>
  );
};

export default AddPost;