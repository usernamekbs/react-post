import http from "../http-common";

const getAll = (page,size,keyword,option) => {
  return http.get("/list/"+page+"/"+size,
  {
    params: {
      keyword: keyword,
      option : option
    }
  }
  ); 
};
 
const addPost = data => {
  return http.post("/post/create",data);
};

const updatePost = (pno,data) => {
  return http.patch("/post/update/"+pno,data);
}

const deletePost = pno => {
  return http.delete("/post/delete/"+pno);
};

const getView = pno =>{
  return http.get("/view/"+pno);
}

const getAllComments = pno => {
  return http.get("/comment/list/"+pno);
}; 

const addReply = data => {
  return http.post("/comment/create", data);
};

const updateReply = data => {
  return http.put("/comment/update",data);
}

const deleteReply = (cno,pno) => {
  return http.delete("/comment/delete/"+cno+"/"+pno)
}

const getLogin = (username) => {
  return http.get("/member/login/"+username);
}
 
const AddMember = data => {
  return http.post("/member/create", data);
};

const getmemberExistsId = (username) => {
  return http.get("/member/exists/"+username);
}

export default {
  getAll,
  updatePost,
  addPost,
  deletePost,
  getView,
  getAllComments,
  addReply,
  updateReply,
  deleteReply,
  getLogin,
  AddMember,
  getmemberExistsId
}; 