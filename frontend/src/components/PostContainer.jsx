import { useDispatch, useSelector } from 'react-redux';
import {
  deletePost,
  likePost,
  unlikePost,
  uploadComment,
} from '../features/posts/postSlice';
import { FaTrash, FaPlus, FaMinus, FaReply } from 'react-icons/fa';
import { useEffect } from 'react';
import CommentContainer from './CommentContainer';
import { useState } from 'react';
import moment from 'moment';

const PostContainer = ({ post }) => {
  const [text, setText] = useState('');
  const [comments, setcomments] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { isError, message } = useSelector(state => state.posts);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [isError, message, post]);

  const onSubmit = e => {
    e.preventDefault();
    const data = {
      id: post._id,
      data: {
        text,
      },
    };
    dispatch(uploadComment(data));
    setText('');
  };

  moment().format();

  return (
    <div>
      <div className='post'>
        <div className='likesCounter'>
          <FaPlus onClick={() => dispatch(likePost(post._id))} />
          {post.likes.length}
          <FaMinus onClick={() => dispatch(unlikePost(post._id))} />
        </div>
        <div>
          <div className='detail'>
            <div className='name'>{post.name}</div>
            <div className='date'>
              {moment(
                new Date(post.createdAt).toLocaleString('en-US')
              ).fromNow()}
            </div>
          </div>
          <p>{post.text}</p>
        </div>
        {user && user._id === post.user ? (
          <div className='reply-delete-box'>
            <button
              onClick={() => dispatch(deletePost(post._id))}
              className='delete'
            >
              <FaTrash />
              <b> Delete</b>
            </button>
            <button className='reply' onClick={() => setcomments(!comments)}>
              <FaReply />
              <b> Reply</b>
            </button>
          </div>
        ) : (
          <div className='reply-delete-box'>
            <button className='reply' onClick={() => setcomments(!comments)}>
              <FaReply />
              <b> Reply</b>
            </button>
          </div>
        )}
      </div>

      {comments ? (
        <div className='comments'>
          <div className='line'></div>
          <div>
            {post.comments.map(comment => (
              <CommentContainer
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            ))}
          </div>
          <div></div>
          <section className='form'>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  name='text'
                  value={text}
                  id='text'
                  onChange={e => setText((e.target.name = e.target.value))}
                />
                <button className='btn btn-block' type='submit'>
                  Reply
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PostContainer;
