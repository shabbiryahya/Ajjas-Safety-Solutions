import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Comment from './Comment';

const CommentSection = () => {
    const[comments,setComments]=useState([]);
    const[newComment,setNewComment]=useState([]);
    const [sortOption, setSortOption] = useState('');

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
      
          const updatedComments = comments.map((element) => {
            if (element.id === parentId) {
              return {
                ...element,
                replies: [...element.replies, reply],
              };
            }
            return element;
          });
      
          setComments(updatedComments);

    }
    const voteOnComment=(commentId,vote)=>{
      const updatedComments = comments.map((element) => {
        if (element.id === commentId) {
          let newScore = element.score;
          if (vote === 'upvote') {
            newScore += 1;
          } else if (vote === 'downvote') {
            newScore -= 1;
          }
  
          return {
            ...element,
            score: newScore,
          };
        } else if (element.replies && element.replies.length > 0) {
          const updatedReplies = element.replies.map((reply) => {
            if (reply.id === commentId) {
              let newScore = reply.score;
              if (vote === 'upvote') {
                newScore += 1;
              } else if (vote === 'downvote') {
                newScore -= 1;
              }
  
              return {
                ...reply,
                score: newScore,
              };
            }
            return reply;
          });
  
          return {
            ...element,
            replies: updatedReplies,
          };
        }
        return element;
      });
  
      setComments(updatedComments);

    }
    const sortComments = (option) => {
        let sortedComments = [...comments];
        
    
        if (option === 'oldest') {
          sortedComments.sort((a, b) => a.id - b.id);
        } else if (option === 'newest') {
          sortedComments.sort((a, b) => b.id - a.id);
        } else if (option === 'mostScore') {
          sortedComments.sort((a, b) => b.score - a.score);
        } else if (option === 'leastScore') {
          sortedComments.sort((a, b) => a.score - b.score);
        }
        
    
        setComments(sortedComments);
       
       setSortOption(option);

        
      };
    
  return (
    <div  className='comment-section container py-4'>
        <h2 className='comment-header mb2'>Comment Section</h2>

        <div className='new-comment mb-3'>
        <textarea placeholder='Write a comment...' className='form-control mb-2' value={newComment} onChange={(event)=>{
            setNewComment(event.target.value);
}} />
<button className='btn btn-primary' onClick={addComment}>Add Comment</button>
        </div>
        <div className='sort-options mb-3'>
        <label htmlFor='sort-select'>Sort by:</label>
        <select
          id='sort-select'
          className='form-select'
          value={sortOption}
          onChange={(event) => sortComments(event.target.value)}
        >
          <option value='none'>None</option>
          <option value='oldest'>Oldest First</option>
          <option value='newest'>Newest First</option>
          <option value='mostScore'>Most Score</option>
          <option value='leastScore'>Least Score</option>
        </select>
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