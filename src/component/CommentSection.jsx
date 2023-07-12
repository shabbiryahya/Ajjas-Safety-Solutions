import React, { useState } from 'react'
import Styles from "./CommentSection.module.css"
import "bootstrap/dist/css/bootstrap.min.css";

const Comment=({comment,onVote})=>{
  
    const {id,text,score,replies}=comment;
    
    const handleVote=(vote)=>{
        onVote(id,vote);
    }

    return (

        <div className='comment card mb-3'>
            <div className='card-body'>
                <p className='card-text'>{text}</p>
                <div className='comment-info'>
                    <span>Score: {score}</span>
                    <button className='btn btn-outline-primary btn-sm mx-1' onClick={()=>{
                handleVote("upvote")

                }}>UpVote</button>
                <button className='btn btn-outline-primary btn-sm' onClick={()=>{

                    handleVote("downvote");
                }}>DownVote</button>
                </div>
                  </div>
                  {

                    replies&& (
                        <div className='card-footer'>
                         {
                            replies.map((element)=>{

                           return  <Comment key={element.id} comment={element} onVote={onVote}/>
                            })
                         }
                        </div>
                    )
                  }

        </div>
    )

}

const CommentSection = () => {
    const[comments,setComment]=useState([]);
    const[newComment,setNewComment]=useState([]);

    const addComment=()=>{
        const comment={
            id:new Date().getTime(),
            text:newComment,
            score:0,
            replies:[]
        }
        setComment((prevComments)=>[...prevComments,comment]);
        setNewComment("");
    }

    const replyOnComment=(parentId,replyText)=>{

         const reply={

            id:new Date().getTime(),
            text:replyText,
            score:0,
            replies:[]

         }

    }
    const voteOnComment=(commentId,vote)=>{
        const UpdatedComments=comments.map((element)=>{
         
             if(element.id===commentId)
             {

                let newScore=element.score;
                if(vote==='upvote')
                {
                    newScore+=1;
                }
                else if(vote==="downvote")
                {
                   newScore-=1;
                }
                
                return {
                    ...element,
                    score: newScore
                }
             }
           return element;
        })
        setComment(UpdatedComments)

    }
    
  return (
    <div  className='comment-section container py-4'>
        <h2 className='comment-header mb2'>Comment Section</h2>

        <div className='new-comment mb-3'>
        <textarea placeholder='Write a comment...' className='form-control mb-2' value={newComment} onChange={(event)=>{

setNewComment(event.target.value);
console.log(newComment);
}} />
<button className='btn btn-primary' onClick={addComment}>Add Comment</button>
        </div>
        {
            comments.map((element)=>{

            return <Comment key={element.id} comment={element} onVote={voteOnComment}/>

            })
        }
       
    </div>
  )
}

export default CommentSection;