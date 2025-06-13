<template>
  <div class="home-container">
    <TopBar />
    <div class="container">
      <div class="header">
        <h1>篮球知识问答</h1>
        <p>基于文心大模型的智能篮球问答助手</p>
      </div>

      <div class="messages" ref="messagesContainer">
        <div v-for="(msg, index) in messages" :key="index" 
            :class="['message', msg.type === 'user' ? 'user-message' : 'bot-message']">
            <div class="message-bubble">
              <span class="prefix">{{ msg.type === 'user' ? '我：' : 'AI：' }}</span>
              <span>{{ msg.content }}</span>
            </div>
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
  margin: 10px auto;
  padding: 20px;
  width: 100%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  background-color: #e9f0f8;
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
  background: linear-gradient(to bottom, #f9f9f9, #ffffff);
  scroll-behavior: smooth;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  max-width: 100%;
}

.avatar {
  font-size: 24px;
  margin-right: 10px;
  flex-shrink: 0;
}

.message-bubble {
  background-color: #f1f1f1;
  padding: 12px 16px;
  border-radius: 15px;
  word-wrap: break-word;
  max-width: 80%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.user-message {
  flex-direction: row-reverse;
}

.user-message .avatar {
  margin-left: 10px;
  margin-right: 0;
}

.user-message .message-bubble {
  background-color: #d0ebff;
  border-bottom-right-radius: 5px;
}

.bot-message .message-bubble {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 5px;
}

.message-bubble .prefix {
  font-weight: bold;
  margin-right: 5px;
}

.input-container {
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #e9f0f8;
  border-top: 1px solid #eee;
  border-radius: 15px;
}

input[type="text"] {
  flex: 1;
  padding: 15px 20px;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease-in-out;
}

input[type="text"]:focus {
  border-color: #ccc;
}

button {
  padding: 15px 25px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: black;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.loading {
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 10px;
}

</style>