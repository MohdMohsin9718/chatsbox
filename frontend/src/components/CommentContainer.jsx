import React from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteComment,
  likeComment,
  unlikeComment,
} from '../features/posts/postSlice';
import moment from 'moment';

const CommentContainer = ({ comment, postId }) => {
  const dispatch = useDispatch();

  const data = {
    postId,
    commentId: comment._id,
  };

  moment().format();
  const { user } = useSelector(state => state.auth);
  return (
    <div className='container'>
      <div className='comment'>
        <div className='likesCounter'>
          <FaPlus onClick={() => dispatch(likeComment(data))} />
          {comment.likes.length}
          <FaMinus onClick={() => dispatch(unlikeComment(data))} />
        </div>
        <div>
          <div className='detail'>
            <div className='name'>{comment.name}</div>
            <div className='date'>
              {moment(new Date(comment.date).toLocaleString('en-US')).fromNow()}
            </div>
          </div>
          <p>{comment.text}</p>
        </div>
        {user && user._id === comment.user ? (
          <div className='reply-delete-box'>
            <button
              onClick={() => dispatch(deleteComment(data))}
              className='delete'
            >
              <FaTrash />
              <b> Delete</b>
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CommentContainer;
