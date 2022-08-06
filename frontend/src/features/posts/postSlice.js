import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import postService from './postService';

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all post
export const getPosts = createAsyncThunk(
  'posts/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.getPosts(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Upload post
export const uploadPost = createAsyncThunk(
  'posts/uploadPost',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.uploadPost(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user post
export const deletePost = createAsyncThunk(
  'posts/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.deletePost(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Like post
export const likePost = createAsyncThunk(
  'post/likePost',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.likePost(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Unlike post
export const unlikePost = createAsyncThunk(
  'post/unlikePost',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.unlikePost(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Comment a post
export const uploadComment = createAsyncThunk(
  'post/comment',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.uploadComment(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a comment
export const deleteComment = createAsyncThunk(
  'post/deleteComment',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.deleteComment(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Like comment
export const likeComment = createAsyncThunk(
  'post/comment/like',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.likeComment(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Unlike comment
export const unlikeComment = createAsyncThunk(
  'post/comment/unlike',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.unlikeComment(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: state => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPosts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(uploadPost.pending, state => {
        state.isLoading = true;
      })
      .addCase(uploadPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(uploadPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePost.pending, state => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter(
          post => post._id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likePost.pending, state => {
        state.isLoading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.map(post =>
          post._id.toString() === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        );
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(unlikePost.pending, state => {
        state.isLoading = true;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.map(post =>
          post._id.toString() === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        );
      })
      .addCase(unlikePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(uploadComment.pending, state => {
        state.isLoading = true;
      })
      .addCase(uploadComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.map(post =>
          post._id.toString() === action.payload.id
            ? { ...post, comments: action.payload.comments }
            : post
        );
      })
      .addCase(uploadComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteComment.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.map(post =>
          post._id.toString() === action.payload.id
            ? { ...post, comments: action.payload.comments }
            : post
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likeComment.pending, state => {
        state.isLoading = true;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.map(post =>
          post._id.toString() === action.payload.postId
            ? { ...post, comments: action.payload.comments }
            : post
        );
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(unlikeComment.pending, state => {
        state.isLoading = true;
      })
      .addCase(unlikeComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.map(post =>
          post._id.toString() === action.payload.postId
            ? { ...post, comments: action.payload.comments }
            : post
        );
      })
      .addCase(unlikeComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
