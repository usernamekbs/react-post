import React, { useState, useEffect } from "react";
import service from "../services/soccerService";
import { Link } from 'react-router-dom';
import { Skeleton,List, Button,Input,Typography,Select,Space  } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined,FileSyncOutlined } from '@ant-design/icons';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const PostLists = () => {
  const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState([]);
    const [current, setCurrent] = useState(1);
    const [size,setSize] = useState(20);
    const [total,setTotal] = useState(0);
    const [keyword,setKeyword] = useState('');
    const [option, setOption] = useState('');
    const { Search } = Input;
    const { Option } = Select;

    useEffect(() => {  

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 50);

      listPost(current,size,keyword,option); 
      
      return () => clearTimeout(timer);
   
    }, []);  

    const onChange = (value) => {
      setOption(value)
    }; 

    const selectBefore = ( 
      <Select defaultValue="Title" className="select-before" onChange={onChange}>
        <Option value="Title">제목</Option>
        <Option value="Content">내용</Option>
        <Option value="Writer">작성자</Option>
      </Select>
    ); 

    const onSearch = (keyword) => {
      setKeyword(keyword)
      listPost(current,size,keyword,option)
    };
 
    const listPost = (current,size,keyword) => {
       
      service.getAll(current,size,keyword,option)   
        .then(response => {     
          setSize(response.data.size)
          setPost(response.data.content);  
          setTotal(response.data.totalElements)
          console.log(response)
        })
        .catch(e => {  
          console.log(e);
        });  
    };

    return ( 
      <>   
        <Typography.Title italic={true} level={4}>게시글 개수 : {total}</Typography.Title>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize        : size, 
              current         : current, 
              total           : total,
              showQuickJumper : true, 
              defaultCurrent  : 1,
              onChange:(current,pageSize)=>{ 
                setCurrent(current)
                setSize(pageSize)
                listPost(current,pageSize,keyword);
              }
              
            }} 
            dataSource={post}
            footer={
              <div> 
                <Link to={`/AddPost`}>
                <Button type="primary">
                  글쓰기 
                </Button>
                </Link>
              </div>
            } 
            renderItem={(post) => ( 
              <List.Item
                key={post.pno}
                actions={[
                  <IconText icon={StarOutlined} text="1" />,
                  <IconText icon={LikeOutlined} text="1" />,
                  <IconText icon={MessageOutlined} text={post.comment_cnt} />,
                  <IconText icon={FileSyncOutlined} text="4"/>
                ]}
              >
                <Skeleton
                  loading={isLoading}
                  active
                  avatar
                  title={{ width: "100px" }}
                  paragraph={{  width: "400px", rows: 1}}
                >
                <List.Item.Meta
                      title={<Link to={`/view/${post.pno}`}>{post.pno}. {post.title}</Link>} />
                </Skeleton>
              </List.Item>
            )}
          />
         <Search addonBefore={selectBefore} onSearch={onSearch} enterButton/> 
        </>
    ); 
  };
  // style={{cursor: 'grab'}}
  export default PostLists;