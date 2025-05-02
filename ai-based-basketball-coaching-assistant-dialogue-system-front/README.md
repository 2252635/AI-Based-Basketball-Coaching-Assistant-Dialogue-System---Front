# ai-based-basketball-coaching-assistant-dialogue-system-front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### API request example
Don't forget:
```javascript
import API from '../api/axios';
import { ElMessage } from 'element-plus';//需要弹出成功或失败的提示时引入
```
#### POST
```javascript
API.post('/account/login/', {
  email: 'example@example.com',
  password: '123456'
})
.then(response => {
  console.log('登录成功', response.data);
})
.catch(error => {
  ElMessage.error(error.response?.data?.detail || '登录失败');
});
```

#### GET(不带参数)
```javascript
API.get('/account/profile/')
.then(response => {
  console.log('用户信息', response.data);
})
.catch(error => {
  ElMessage.error(error.response?.data?.detail || '获取用户信息失败');
});
```

#### GET(带参数)
```javascript
API.get('/training/detail/', {
  params: { id: 123 }
})
.then(response => {
  console.log('课程详情', response.data);
})
.catch(error => {
  ElMessage.error(error.response?.data?.detail || '获取课程信息失败');
});

```

#### PUT
```javascript
API.put('/account/update_profile/', {
  username: 'newname',
  age: 22
})
.then(response => {
  ElMessage.success('更新成功');
})
.catch(error => {
  ElMessage.error(error.response?.data?.detail || '更新失败');
});
```

#### DELETE
```javascript
API.delete('/training/delete/', {
  data: { id: 123 }
})
.then(response => {
  ElMessage.success('删除成功');
})
.catch(error => {
  ElMessage.error(error.response?.data?.detail || '删除失败');
});

```



