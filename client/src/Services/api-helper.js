import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const api = axios.create({
  baseURL: baseUrl
});



// ========================================
// ================ POST ==================
// ========================================

// GET	/posts 
// WHY DONT I HAVE THIS ROUTE
// export const getAllPosts = async () => {
//   const response = await api.get('/posts')
//   return response.data
// }


// GET	/posts/:id(.:format)	
// posts#show
export const getOnePost = async (id) => {
  const response = await api.post(`/posts/${id}`)
  return response.data
}


// PATCH	/posts/:id(.:format)	
// posts#update

// PUT	/posts/:id(.:format)	
// posts#update

// DELETE	/posts/:id(.:format)



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