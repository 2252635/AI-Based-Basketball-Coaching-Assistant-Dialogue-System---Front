<template>
  <div class="home-container">
    <TopBar />
    <div class="container">
      <div class="header">
        <h1>篮球知识问答系统</h1>
        <p>基于文心大模型的智能篮球问答助手</p>
      </div>

      <div class="messages" ref="messagesContainer">
        <div v-for="(msg, index) in messages" :key="index" 
            :class="['message', msg.type === 'user' ? 'user-message' : 'bot-message']">
          <strong>{{ msg.type === 'user' ? '您：' : 'AI：' }}</strong>
          {{ msg.content }}
        </div>
        <div v-if="loading" class="loading">AI正在思考中...</div>
      </div>

      <div class="input-container">
        <input 
          type="text" 
          v-model="userInput" 
          placeholder="请输入关于篮球的问题..."
          @keyup.enter="sendQuestion"
          :disabled="isSending"
        >
        <button @click="sendQuestion" :disabled="isSending || !userInput.trim()">
          {{ isSending ? '发送中...' : '发送' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import TopBar from '../components/TopBar.vue'

const messages = ref([])
const userInput = ref('')
const isSending = ref(false)
const loading = ref(false)
const messagesContainer = ref(null)

const sendQuestion = async () => {
  const question = userInput.value.trim()
  if (!question || isSending.value) return

  try {
    isSending.value = true
    loading.value = true
    
    // 添加用户消息
    messages.value.push({
      type: 'user',
      content: question
    })
    
    userInput.value = ''
    
    // 滚动到底部
    await nextTick()
    scrollToBottom()
    
    // 调用API
    const response = await fetch('http://localhost:8000/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: question })
    })
    
    if (!response.ok) {
      throw new Error(`请求失败: ${response.status}`)
    }
    
    const data = await response.json()
    messages.value.push({
      type: 'bot',
      content: data.answer
    })
  } catch (error) {
    messages.value.push({
      type: 'bot',
      content: `出错了：${error.message}`
    })
  } finally {
    isSending.value = false
    loading.value = false
    scrollToBottom()
  }
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}
</script>

<style scoped>
/* 保持原有样式，仅添加作用域 */
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  width: 100%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #2c3e50;
  font-size: 2.2em;
  margin-bottom: 10px;
}

.messages {
  flex: 1;
  height: 60vh;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
}

.message {
  margin-bottom: 20px;
  padding: 12px 16px;
  border-radius: 15px;
  max-width: 80%;
  word-wrap: break-word;
}

.user-message {
  background-color: #e3f2fd;
  margin-left: auto;
  border-bottom-right-radius: 5px;
}

.bot-message {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  margin-right: auto;
  border-bottom-left-radius: 5px;
}

.input-container {
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #eee;
}

input[type="text"] {
  flex: 1;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
}

button {
  padding: 15px 30px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.loading {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 10px;
}
</style>