import React, { useState } from "react"
import AddReply from "./AddReply"
import UpdateReply from "./UpdateReply"
import service from "../../services/soccerService";
import { Button, Result } from 'antd'
import TextArea from "antd/lib/input/TextArea";
import { createRoutesFromChildren } from "react-router-dom";

const Comment = (props) => {
    const { commentLists,setCommentLists } = props
    const [showChildReply, setShowChildReply] = useState(false)
    const [showReply, setShowReply] = useState(false)
    const comment = commentLists
    const [edit,setEdit] = useState(false) 

    //만드느라 진짜 힘들었음...  계층형 대댓글 처리 완료..

    const handleDeleteReply  = (commentLists) => { 
        let updatedComments = commentLists
          
        service.deleteReply(updatedComments.cno,updatedComments.pno)
          .then(response => {
            alert(response.data.message)
            
          })  
          .catch(e => { 
            console.log(e);  
          });
    };  

    const saveCommentList = (prevComment,...newComment) => {
        let updatedComments = prevComment
        const cno = comment.cno
        //map에서의 {}와 () 차이를 분석하길 바람. 그러면 3항연산자를 쓴이유가 있음.
        //updatedComments.children && updatedComments.children.map((c)=>{
            // if(c.cno === cno ){
                // c.children.push(...newComment) 
            // }
            // saveCommentList(c,...newComment)
            // return c
        //}         
        updatedComments.children && updatedComments.children.map((c)=>
            cno === c.cno ? c.children.push(...newComment) : saveCommentList(c,...newComment)
        )
        
    }

    //대댓글 추가 
    const addComment = (...newComment) => {
        const parent = comment.parent
        const cno = comment.cno
        if(parent !== null){
            setCommentLists((prevComment) => 
                prevComment.map((c)=>{
                    saveCommentList(c,...newComment)
                    return c
                })    
            )
        }else{
            setCommentLists((prevComment) => 
                prevComment.map((c)=>{
                    if(cno===c.cno){
                        c.children.push(...newComment)
                    }

                    return c
                }) 
            )
        }
    }
   
    //댓글 삭제
    const updateCommentList = (prevComment) => {
        let updatedComments = prevComment
        const cno = comment.cno
        const children = comment.children

        return updatedComments.map( comments => { return {...comments} }).filter ( comments => {
            
            if ( children !== 0) {
                comments.children = updateCommentList ( comments.children )
            }
            return comments.cno !== cno
        })
    }

    //댓글 삭제
    const deleteComment = (...newComment) => {  

        setCommentLists((prevComment) => updateCommentList(prevComment,...newComment))
        handleDeleteReply(commentLists)
    }

    const recursiveUpdateComment = (prevComment,newComment) =>{
        const cno =comment.cno

        prevComment.children && prevComment.children.map((c)=>{  
            if(cno === c.cno ){
                return c.content = newComment.content       
            }

            recursiveUpdateComment(c,newComment)
        })
        
    }

    //대댓글 수정,댓글수정 완료 완벽
    const updateComment = (...newComment) => {
        const parent = comment.parent
        if(parent !== null){
            setCommentLists((prevComment) => 
                prevComment.map((c)=>{
                    recursiveUpdateComment(c,...newComment)
                    return c
                })    
            )
        }else{
            setCommentLists((prevComment) => 
                prevComment.map((c)=>{
                    if(comment.cno === c.cno){
                        return {...c,content : newComment[0].content}
                    }
                    return c
                })    
            )
        }
    }
 
    const handleReplyComment = () => {
        {
            showReply===false ? setShowReply(true) : setShowReply(false)
        }
    }

    return ( 
        <>
            {edit===false ? 
                <>
                    번호 : {comment.cno}
                    작성자 : {comment.writer} 
                    <span onClick={handleReplyComment} style={{cursor:'grab',color: "black",marginLeft:10}}>댓글 쓰기</span>
                    <span  onClick={() => setEdit((show) => !show)} style={{cursor:'grab',color: "blue"}}>댓글 수정</span>
                    <span onClick={() => deleteComment(comment)} type="danger" style={{cursor:'grab',color: "red"}}>댓글 삭제</span>
                    <br></br>    내용 : {comment.content}
                </>
                :
                <UpdateReply
                    setEdit={setEdit}
                    setShowReply={setShowReply}
                    comment={comment}
                    updateComment={updateComment}
                />
            }
        

            <div onClick={() => setShowChildReply((show) => !show)}  style={{cursor: 'grab'}}>  
                <span style={{color:'red',marginLeft:'10px'}}>{comment.children.length}개의 댓글 더보기</span> 
            </div>
           
            {showReply &&   
                <AddReply
                    parent={comment.cno}
                    pno={comment.pno}
                    setShowReply={setShowReply}
                    addComment={addComment}
                />
            }
            
            {showChildReply && comment.children &&comment?.children.map((comments) => {
                return (
                    <div key={comments.cno} style={{ width: '100%', marginLeft: "40px" }}>
                        <Comment 
                            key={comments.cno}
                            cno={comments.cno} 
                            commentLists={comments}
                            setCommentLists={setCommentLists}
                        /> 
                    </div>
                );
            })}
        </>  
    ); 
};

export default Comment;