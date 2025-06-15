from locust import HttpUser, task, between, LoadTestShape
import random

class MixedLoadUser(HttpUser):
    wait_time = between(1, 3)
    host = "http://localhost:8082"
    
    def call_api(self, path, name=None, port=None, method="GET", **kwargs):
        url = f"http://localhost:{port}{path}" if port else path
        return self.client.request(method, url, name=name or path, **kwargs)

    @task(4)
    def user_workflow(self):
        # 完整用户工作流：注册->登录->浏览文章->搜索，注册需要多个邮箱验证码故跳过
        email = f"test{random.randint(1,10000)}@example.com"
        
        # 1. 检查邮箱
        self.call_api("/api/users/checkEmailRegistered", port=8082, 
                     params={"email": email})
        
        # 3. 登录
        self.call_api("/api/users/login", port=8082, method="POST",
                     params={"email": "362733473@qq.com", "password": "1"})
        
        # 4. 浏览内容
        self.call_api("/api/content/by-section-name", port=8081,
                     params={"sectionName": random.choice(["news", "tech", "sports"])})
        
        # 5. 搜索
        self.call_api("/api/search", port=8081, method="POST", json={"keyword": random.choice(["历史", "三人", "篮板"])})

    @task(2)
    def article_interaction(self):
        # 文章互动行为：浏览+下载
        article_id = random.randint(1, 100)
        self.call_api(f"/api/articles/{article_id}", port=8081)

class StepLoadShape(LoadTestShape):
    """分阶段负载模型"""
    stages = [
        {"duration": 60, "users": 100, "spawn_rate": 10},
        {"duration": 120, "users": 300, "spawn_rate": 20},
        {"duration": 180, "users": 500, "spawn_rate": 10},
        {"duration": 240, "users": 500, "spawn_rate": 0}  # 保持500用户30分钟
    ]
    
    def tick(self):
        run_time = self.get_run_time()
        for stage in self.stages:
            if run_time < stage["duration"]:
                return (stage["users"], stage["spawn_rate"])
        return None