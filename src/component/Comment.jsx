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
export default Comment;