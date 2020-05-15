import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://remote-farmers-market-api.herokuapp.com/' : 'http://localhost:3000'

const api = axios.create({
  baseURL: baseUrl
})


// ========================================
// ================ TAGS ==================
// ========================================

export const getAllTags = async () => {
  const response = await api.get('/tags')
  return response.data
}


// ========================================
// ================ POST ==================
// ========================================


// GET	/posts 
// posts#index
export const getAllPosts = async () => {
  const response = await api.get('/posts')
  return response.data
}

// GET	/posts/:id(.:format)	
// posts#show
export const getOnePost = async (id) => {
  const response = await api.get(`/posts/${id}`)
  return response.data
}

// POST	/posts(.:format)	
// posts#create
export const createPost = async (postInfo) => {
  const response = await api.post('/posts', postInfo)
  return response.data
}


// PATCH/PUT	/posts/:id(.:format)	
// posts#update
export const updatePost = async (id, postInfo) => {
  const response = await api.put(`/posts/${id}`, postInfo)
  return response.data
}

// DELETE	/posts/:id(.:format)
// posts#destroy
export const destroyPost = async (id) => {
  const response = await api.delete(`/posts/${id}`)
  return response
}


// ========================================
// ================ AUTH ==================
// ========================================

export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', { auth: loginData });
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
  return resp.data.user;
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/users', { user: registerData });
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
  return resp.data.user;
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    const resp = await api.get('/auth/verify');
    return resp.data;
  }
  return null;
}

export const removeToken = () => {
  api.defaults.headers.common.authorization = null;
}
// ========================================
// ================ USER ==================
// ========================================


// /users/:user_id/posts(.:format)	
// posts#show_owner

// users_path	GET	/users(.:format)	
// users#index
export const getAllUsers = async () => {
  const response = await api.get('/users')
  return response.data
}

// POST	/users(.:format)	
// users#create

// user_path	GET	/users/:id(.:format)	
// users#show
export const getOneUser = async (userId) => {
  const response = await api.get(`/users/${userId}`)
  return response.data
}

// PATCH	/users/:id(.:format)	
// users#update

// PUT	/users/:id(.:format)	
// users#update

// DELETE	/users/:id(.:format)	
// users#destroy