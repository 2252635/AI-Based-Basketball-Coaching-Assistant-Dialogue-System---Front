import axios from 'axios';
//import { ElMessage } from 'element-plus';

const API = axios.create({
  baseURL: 'http://150.158.88.34:8081',
  withCredentials: true, // 允许跨域请求发送 Cookie，否则改为false
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：为每个请求添加 Authorization 头（根据需要排除特定接口）
// API.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('access_token');
//       const excludedPaths = [
//         '/api/users/login',
//         '/api/users/sendCode',
//         '/api/users/register',
//         '/api/users/checkEmailRegistered',
//         '/api/users/resetPassword',
//       ]; // 不需要附加 Authorization 头的路径
  
//       // 检查当前请求路径是否在排除列表中
//       const isExcluded = excludedPaths.some((path) => config.url.startsWith(path));
  
//       if (!isExcluded && token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
  
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

// 响应拦截器：处理 token 过期等情况
// API.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // 如果响应失败，根据状态码处理
//     if (error.response && error.response.status === 401) {
//       ElMessage.error('未授权，请重新登录');
//       // 可以在这里触发用户登出逻辑
//       localStorage.removeItem('userID');
//       localStorage.removeItem('access_token');
//       router.push('/'); 
//     }
//     return Promise.reject(error);
//   }
// );

export default API;
