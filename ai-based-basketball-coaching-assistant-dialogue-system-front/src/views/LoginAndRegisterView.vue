<template>
  <div class="base">
    <div class="loginAndRegist">
      <!-- 登录部分 -->
      <div class="loginArea">
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <div class="login_head" v-show="isLogin">
            <h2>Welcome!</h2>
          </div>
        </transition>
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <div class="loginForm" v-show="isLogin">
            <el-input v-model="loginEmail" placeholder="请输入邮箱" type="email" clearable class="input"></el-input>
            <el-input v-model="password" placeholder="请输入密码" show-password clearable class="input"></el-input>
            <div class="forget-password">
              <label style="cursor: pointer;" @click="handleForgetPassword">忘记密码?</label>
            </div>
            <el-button type="success" round class="button" @click="login">登录</el-button>
          </div>
        </transition>
      </div>
      <!-- 注册部分 -->
      <div class="registerArea">
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <div class="registForm" v-show="!isLogin">

            <el-input v-model="registerEmail" placeholder="请输入邮箱" clearable type="email" class="input"></el-input>

            <div class="verify-row">
              <el-input v-model="verificationCode" placeholder="请输入验证码" clearable
                style="width: 110px;margin-left: 10px;margin-bottom: 23px;"></el-input>
              <el-button type="success" round :disabled="isButtonDisabled" style="background-color: #212121; 
                  font-size:13px;
                  width: 110px; 
                  margin-left: 10px;
                  margin-bottom: 23px;
                  border: 2px solid #3F3F3F;
                  " @click="getVerificationCode">{{ buttonText }}</el-button>
            </div>

            <el-input v-model="newPassword" placeholder="请输入密码" clearable show-password class="input"></el-input>
            <el-input v-model="confirmPassword" placeholder="请再次输入密码" clearable show-password
              class="input"></el-input>
            <el-button v-if="!isChangePsw" type="success" class="button" @click="register">
              注册
            </el-button>
            <el-button v-else-if="isChangePsw" type="success" class="button" @click="changPsw">
              完成
            </el-button>
          </div>
        </transition>

      </div>


      <!-- 动态页面 -->
      <div id="aaa" class="showInfo" :style="{
        borderTopRightRadius: styleObj.bordertoprightradius,
        borderBottomRightRadius: styleObj.borderbottomrightradius,
        borderTopLeftRadius: styleObj.bordertopleftradius,
        borderBottomLeftRadius: styleObj.borderbottomleftradius,
        right: styleObj.rightDis
      }">
        <img src="../assets/basketboy.png" style="width:220px;
            height:270px;" />
        <div v-show="isLogin" class="button-container">
          <el-button type="success" class="button2" @click="changeToRegist">注册</el-button>
        </div>
        <div v-show="!isLogin" class="button-container">
          <el-button type="success" class="button2" @click="changeToLogin">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'animate.css';
import { ref } from 'vue';
import 'element-plus/dist/index.css';
import { ElInput, ElButton, ElMessage } from 'element-plus';
import API from '../api/axios';
import { useRouter } from 'vue-router';
const router = useRouter();
// 输入变量
const userType = ref('User');
const loginEmail = ref('');
const registerEmail = ref('');
const password = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const verificationCode = ref('');
//后端返回验证码
const realVerificationCode = ref('');
//验证码倒计时相关
const countdownTime = 60;
const timeLeft = ref(countdownTime);//剩余时间
const buttonText = ref('获取验证码');//按钮文字
const isButtonDisabled = ref(false);
//控制变量
const isLogin = ref(true);
const isChangePsw = ref(false);//是否在修改密码
//el展示信息
const message = ref('');

// 设置遮挡页的四角和位置
const styleObj = ref({
  bordertoprightradius: '15px',
  borderbottomrightradius: '15px',
  bordertopleftradius: '0px',
  borderbottomleftradius: '0px',
  rightDis: '0px'
});
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
// 重置变量
const clearData = () => {
  userType.value = 'User';
  loginEmail.value = '';
  registerEmail.value = '';
  password.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
  verificationCode.value = '';
  realVerificationCode.value = '';
}
///////////////////////通信最终版
const login = async () => {
  if (!loginEmail.value || !password.value) {
    ElMessage.error('请填写完整信息');
  } else if (!validateEmail(loginEmail.value)) {
    ElMessage.error('邮箱格式不正确');
  } else {
    try {
      const response = await API.post('/api/users/login/', {
        "email": loginEmail.value,
        "password": password.value,
      });

      ElMessage.success(response.data.message);
      localStorage.setItem('userID', response.data.data.userID);
      localStorage.setItem('access_token', response.data.data.access_token);
      // if (response.data.data.role === 'Admin') {
      //   router.push('/Admin');  
      // } else {
        router.push('/home');  
      // }
    } catch (error) {
      if (error.response) {
        ElMessage.error(error.response.data.error);
      } else {
        ElMessage.error('登录失败');
      }
    }
  }
};

const checkEmailRegistered = async () => {
  try {
    const response = await API.get('/api/users/checkEmailRegistered', {
      params: { email: registerEmail.value } // 使用 params 发送 email
    });
    return response.data.registered; // 返回邮箱是否已注册
  } catch (error) {
    if (error.response) {
      ElMessage.error(error.response.data.error);
    } else {
      ElMessage.error('检查邮箱是否注册失败');
    }
    return false; // 默认返回未注册
  }
};

const getVerificationCode = async () => {
  if (isButtonDisabled.value) return; // 如果按钮被禁用，直接返回
  if (!registerEmail.value) {
    ElMessage.error('邮箱不能为空'); // 提示邮箱不能为空
    return; // 结束函数
  }

  // 检查邮箱是否已注册
  const isRegistered = await checkEmailRegistered();

  if (isChangePsw.value) {
    if(isRegistered){
      // 如果是在修改密码状态，允许发送验证码
      try {
            const response = await API.post('/api/users/sendCode', {
              'email': registerEmail.value
            });
            ElMessage.success('验证码已发送，请检查您的邮箱');
            realVerificationCode.value = response.data.verification_code; // 根据返回值调整
            startCountdown();
          } catch (error) {
            if (error.response) {
              ElMessage.error(error.response.data.error); // 提示错误信息
            } else {
              ElMessage.error('验证码发送失败'); // 提示一般错误
            }
          }
    }
    else{
      ElMessage.error('此邮箱未注册，请先注册'); // Prompt for already registered information
      return; // 结束函数
    }
  } else {
    // 如果是在注册状态
    if (isRegistered) {
      ElMessage.error('此邮箱已注册，请勿重复注册'); // 提示已注册信息
      return; // 结束函数
    }
    // 调用注册的发送验证码接口
    try {
      const response = await API.post('/api/users/sendCode', {
        'email': registerEmail.value
      });
      ElMessage.success('验证码已发送，请检查您的邮箱');
      realVerificationCode.value = response.data.verification_code; // 根据返回值调整
      startCountdown();
    } catch (error) {
      if (error.response) {
        ElMessage.error(error.response.data.error); // 提示错误信息
      } else {
        ElMessage.error('验证码发送失败'); // 提示一般错误
      }
    }
  }
};


const startCountdown = () => {
  isButtonDisabled.value = true; // 禁用按钮
  buttonText.value = `${countdownTime}秒后重发.`; // 设置按钮文字
  timeLeft.value = countdownTime;

  const intervalId = setInterval(() => {
    timeLeft.value -= 1;
    buttonText.value = `${timeLeft.value}秒后重发.`; // 更新按钮文字

    if (timeLeft.value <= 0) {
      clearInterval(intervalId); // 清除定时器
      buttonText.value = '获取验证码'; // 恢复按钮文字
      isButtonDisabled.value = false; // 启用按钮
    }
  }, 1000);
};

const register = async () => {
  if (!registerEmail.value || !newPassword.value || !confirmPassword.value || !verificationCode.value) {
    ElMessage.error('请填写完整信息');
  } else if (!validateEmail(registerEmail.value)) {
    ElMessage.error('邮箱格式不正确');
  } else if (newPassword.value !== confirmPassword.value) {
    ElMessage.error("两次输入的密码不一致")
  } else {
    try {
      const response = await API.post('/api/users/register/', {
        'email': registerEmail.value,
        'password': newPassword.value,
        'verification_code': verificationCode.value,
        'role': userType.value // 如果需要发送角色的话
      });
      message.value = response.data.message;
      ElMessage.success('注册成功');
      changeToLogin(); // 注册成功后切换到登录界面
    } catch (error) {
      if (error.response) {
        message.value = error.response.data;
      } else {
        message.value = '注册失败';
      }
      ElMessage.error(message.value);
    }
    message.value = '';
  }
}
const changPsw = async () => {
  if (!registerEmail.value || !newPassword.value || !confirmPassword.value || !verificationCode.value) {
    ElMessage.error('请填写完整信息');
  } else if (!validateEmail(registerEmail.value)) {
    ElMessage.error('邮箱格式不正确');
  } else if (newPassword.value !== confirmPassword.value) {
    ElMessage.error("两次输入的密码不一致")
  } else if (!verificationCode.value || verificationCode.value !== realVerificationCode.value) {
    ElMessage.error("验证码不正确");
  } else {
    try {
      const response = await API.post('account/reset_password/', {
        'email': registerEmail.value,
        'new_password': newPassword.value,
        'verification_code': verificationCode.value,
      });
      message.value = response.data.message;
      ElMessage.success(message.value);
      changeToLogin();
    } catch (error) {
      if (error.response) {
        message.value = error.response.data;
      } else {
        message.value = '修改密码失败';
      }
      ElMessage.error(message.value);
    }
    message.value = '';

  }
}
//指场景的切换
const handleForgetPassword = () => {
  isChangePsw.value = true;
  changeToRegist();
}

function changeToRegist() {
  styleObj.value.bordertoprightradius = '0px';
  styleObj.value.borderbottomrightradius = '0px';
  styleObj.value.bordertopleftradius = '15px';
  styleObj.value.borderbottomleftradius = '15px';
  styleObj.value.rightDis = '50%';
  isLogin.value = !isLogin.value;
  clearData();
}
function changeToLogin() {
  isChangePsw.value = false;
  styleObj.value.bordertoprightradius = '15px';
  styleObj.value.borderbottomrightradius = '15px';
  styleObj.value.bordertopleftradius = '0px';
  styleObj.value.borderbottomleftradius = '0px';
  styleObj.value.rightDis = '0px';
  isLogin.value = !isLogin.value;
  clearData();
}
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

.el-button:active {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transform: scale(0.95);
}

:deep(.el-input__wrapper) {
  background-color: #D0D0D0;
  color: #868686;
  border-radius: 10px;
}

:deep(.el-input__wrapper.is-focus) {
  border: 1px solid #D0D0D0;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.5);
  ;
}

.base {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e9f0f8;
  background-size: cover;
}

.loginAndRegist {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginArea,
.registerArea {
  background-color: #FFFFFF;
  height: 400px;
  width: 350px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.loginArea {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

.registerArea {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

.login_head h2 {
  color: #212121;
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 30px;
}

.loginForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.forget-password {
  font-size: 13px;
  color: #212121;
  margin-bottom: 20px;
}

.registForm {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.verify-row {
  display: flex;
  flex-direction: row;
}

.showInfo {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  height: 400px;
  width: 350px;
  z-index: 2;
  top: 0;
  right: 0;
  background-color: rgb(50, 61, 130);
  /* 匀速过渡效果 */
  transition: 0.5s linear;
}

.showInfo:hover {
  background-size: 100%;
  background-position: -50px -50px;
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}


.input {
  width: 230px;
  margin-left: 10px;
  height: 40px;
  margin-bottom: 30px;
}

.button {
  background-color: #212121;
  border: 2px solid #212121;
  color: #FFFFFF;
  font-weight: bold;
  padding: 20px 30px;

}

.button2 {
  background-color: #F7F7F7;
  border: 2px solid #3F3F3F;
  font-weight: bold;
  padding: 17px 20px;
  color: #212121;
}
</style>
