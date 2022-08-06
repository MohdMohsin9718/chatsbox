const asyncHandler = require('express-async-handler');

const Post = require('../models/postModel');

// @desc    Get posts
// @route   GET /api/posts
// @access  Public
const getPost = asyncHandler(async (req, res) => {
  const posts = await Post.find();

  res.status(200).json(posts);
});

// @desc    Post post
// @route   Post /api/posts
// @access  Private
const uploadPost = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const post = await Post.create({
    text: req.body.text,
    user: req.user.id,
    name: req.user.name,
  });

  res.status(201).json(post);
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatepost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  // Check for user
  if (!req.user) {
    res.status(400);
    throw new Error('User not found');
  }

  // Make sure logged user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const UpdatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(UpdatedPost);
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  // Check for user
  if (!req.user) {
    res.status(400);
    throw new Error('User not found');
  }

  // Make sure logged user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await post.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc    Like post
// @route   Put /api/posts/like/:id
// @access  Private
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  if (
    post.likes.filter(like => like.user.toString() === req.user.id).length > 0
  ) {
    res.status(400);
    throw new Error('Post already liked');
  }

  post.likes.unshift({ user: req.user.id });

  await post.save();

  res.status(200).json({
    id: post._id,
    likes: post.likes,
  });
});

// @desc    Unlike post
// @route   Delete /api/posts/like/:id
// @access  Private
const unlikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  if (
    post.likes.filter(like => like.user.toString() === req.user.id).length === 0
  ) {
    res.status(400);
    throw new Error('Post has not yet been liked');
  }

  const removeIndex = post.likes
    .map(like => like.user.toString())
    .indexOf(req.user.id);

  post.likes.splice(removeIndex, 1);

  await post.save();

  res.status(200).json({
    id: post._id,
    likes: post.likes,
  });
});

// @desc    Upload comment
// @route   Put /api/posts/comment/:id
// @access  Private
const uploadComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  const comment = {
    text: req.body.text,
    user: req.user.id,
    name: req.user.name,
  };

  post.comments.push(comment);

  await post.save();

  res.status(200).json({
    id: post._id,
    comments: post.comments,
  });
});

// @desc    Delete comment
// @route   Delete /api/posts/comment/:id/:commentId
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  if (
    post.comments.filter(
      comment => comment._id.toString() === req.params.commentId
    ).length === 0
  ) {
    res.status(400);
    throw new Error('Comment not found');
  }

  if (
    post.comments
      .filter(comment => comment._id.toString() === req.params.commentId)[0]
      .user.toString() !== req.user.id
  ) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const removeIndex = post.comments
    .map(comment => comment._id.toString())
    .indexOf(req.params.commentId);

  post.comments.splice(removeIndex, 1);

  await post.save();

  res.status(200).json({
    id: post._id,
    comments: post.comments,
  });
});

// @desc    Like comment
// @route   Put /api/posts/comment/like/:id/:commentId
// @access  Private
const likeComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  if (
    post.comments.filter(
      comment => comment._id.toString() === req.params.commentId
    ).length === 0
  ) {
    res.status(400);
    throw new Error('Comment not found');
  }

  const commentIndex = post.comments
    .map(comment => comment._id.toString())
    .indexOf(req.params.commentId);

  if (
    post.comments[commentIndex].likes.filter(
      like => like.user.toString() === req.user.id
    ).length > 0
  ) {
    res.status(400);
    throw new Error('Post already liked');
  }

  post.comments[commentIndex].likes.unshift({ user: req.user.id });

  await post.save();

  res.status(200).json({
    postId: post._id,
    comments: post.comments,
    // commentId: post.comments[commentIndex]._id,
    // likes: post.comments[commentIndex].likes,
  });
});

// @desc    Unlike comment
// @route   Put /api/posts/comment/unlike/:id/:commentId
// @access  Private
const unlikeComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  if (
    post.comments.filter(
      comment => comment._id.toString() === req.params.commentId
    ).length === 0
  ) {
    res.status(400);
    throw new Error('Comment not found');
  }

  const commentIndex = post.comments
    .map(comment => comment._id.toString())
    .indexOf(req.params.commentId);

  if (
    post.comments[commentIndex].likes.filter(
      like => like.user.toString() === req.user.id
    ).length === 0
  ) {
    res.status(400);
    throw new Error('Post has yet not been liked');
  }

  const removeIndex = post.comments[commentIndex].likes
    .map(like => like.user.toString())
    .indexOf(req.user.id);

  post.comments[commentIndex].likes.splice(removeIndex, 1);

  await post.save();

  res.status(200).json({
    postId: post._id,
    comments: post.comments,
    // commentId: post.comments[commentIndex]._id,
    // likes: post.comments[commentIndex].likes,
  });
});

module.exports = {
  getPost,
  uploadPost,
  updatepost,
  deletePost,
  likePost,
  unlikePost,
  uploadComment,
  deleteComment,
  likeComment,
  unlikeComment,
};
