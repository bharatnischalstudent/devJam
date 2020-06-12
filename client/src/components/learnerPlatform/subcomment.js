import React,{useState} from "react";


const SubComment = (props)=>{

  // Data States
  const [commentMsg,setCommentMsg] = useState("");
  const comment = props.comment;

  //UI STATES
  const [showReply,setShowReply]= useState(false);

  return (
    <div className="row mt-3">
        <div className="profile-pic rounded-circle border " style={{height:"35px",width:"35px",overflow:"hidden"}}><img src={comment.author.profilePic}  className="rounded-circle  responsive-img" /></div>
        <div className="col-9">
          <h6 className="text-left"><b>{comment.author.username}<span className="ml-2" style={{fontSize:"0.8em"}}>10 july</span></b></h6>
          <div className="text-left" style={{lineHeight:"100%"}}>{comment.text}
          <div className="pt-2  mb-2"><b onClick={()=>setShowReply(!showReply)} className="cursor-pointer">{showReply?"Cancel":"Reply"}</b></div>
          </div>

          {showReply?
             <form onSubmit={(e)=>{e.preventDefault();props.handleAdd(commentMsg,props.mainCommentId);setCommentMsg("")}}>
               <input type="text" placeholder="Reply to this thread" value={commentMsg} onChange={(e)=>{setCommentMsg(e.target.value)}} className="w-100 comment-inp" />
             </form>
            :null
          }

        </div>
      </div>
  );
}

export default SubComment;
