import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

const Comment=({comment,onVote,onReply})=>{
  
    const {id,text,score,replies}=comment;
    
    const handleVote=(vote)=>{
        onVote(id,vote);
    }

    const handleReply = (parentId) => {
        const replyText = prompt('Enter your reply'); 
    
        if (replyText) {
          onReply(parentId, replyText);
        }
      };

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
                <button
          className='btn btn-outline-primary btn-sm mx-1'
          onClick={() => handleReply(id)} >
          Reply
        </button>
                </div>
                  </div>
                  {

                    replies&& (
                        <div className='card-footer'>
                         {
                            replies.map((element)=>{

                           return  <Comment key={element.id} comment={element} onVote={onVote} onReply={onReply}/>
                            })
                         }
                        </div>
                    )
                  }

        </div>
    )

}

const CommentSection = () => {
    const[comments,setComments]=useState([]);
    const[newComment,setNewComment]=useState([]);

    const addComment=()=>{
        const comment={
            id:new Date().getTime(),
            text:newComment,
            score:0,
            replies:[]
        }
        setComments((prevComments)=>[...prevComments,comment]);
        setNewComment("");
    }

    const replyOnComment=(parentId,replyText)=>{

        const reply = {
            id: new Date().getTime(),
            text: replyText,
            score: 0,
            replies: [],
          };
      
          const updatedComments = comments.map((comment) => {
            if (comment.id === parentId) {
              return {
                ...comment,
                replies: [...comment.replies, reply],
              };
            }
            return comment;
          });
      
          setComments(updatedComments);

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
        setComments(UpdatedComments)

    }
    
  return (
    <div  className='comment-section container py-4'>
        <h2 className='comment-header mb2'>Comment Section</h2>

        <div className='new-comment mb-3'>
        <textarea placeholder='Write a comment...' className='form-control mb-2' value={newComment} onChange={(event)=>{
            setNewComment(event.target.value);
}} />
<button className='btn btn-primary' onClick={addComment}>Add Comment</button>
        </div>
        {
            comments.map((element)=>{

            return <Comment key={element.id} comment={element} onVote={voteOnComment} onReply={replyOnComment}  />

            })
        }
       
    </div>
  )
}

export default CommentSection;