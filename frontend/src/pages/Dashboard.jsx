import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, uploadPost } from '../features/posts/postSlice';

import PostContainer from '../components/PostContainer';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const { user } = useSelector(state => state.auth);
  const { posts, isError, message } = useSelector(state => state.posts);

  console.log(posts);
  const onSubmit = e => {
    e.preventDefault();
    const data = {
      text,
    };

    dispatch(uploadPost(data));
    setText('');
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    } else {
      dispatch(getPosts());
    }
  }, []);

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
      </section>

      <div className='content'>
        <div className='posts'>
          {posts.map(post => (
            <PostContainer key={post._id} post={post} />
          ))}
        </div>
      </div>

      <section className='form post-form'>
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
              Post
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
export default Dashboard;
