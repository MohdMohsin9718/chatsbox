import axios from 'axios';

const API_URL = '/api/posts/';

const getPosts = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const uploadPost = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, data, config);

  return response.data;
};

const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + postId, config);

  return response.data;
};

const likePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + 'like/' + postId, '', config);

  return response.data;
};

const unlikePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + 'like/' + postId, config);

  return response.data;
};

const uploadComment = async ({ id, data }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + 'comment/' + id, data, config);

  return response.data;
};

const deleteComment = async ({ postId, commentId }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + 'comment/' + postId + '/' + commentId,
    config
  );

  return response.data;
};

const likeComment = async ({ postId, commentId }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + 'comment/like/' + postId + '/' + commentId,
    '',
    config
  );

  return response.data;
};

const unlikeComment = async ({ postId, commentId }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + 'comment/unlike/' + postId + '/' + commentId,
    '',
    config
  );

  return response.data;
};

const postService = {
  getPosts,
  uploadPost,
  deletePost,
  likePost,
  unlikePost,
  uploadComment,
  deleteComment,
  likeComment,
  unlikeComment,
};
export default postService;
