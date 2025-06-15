from locust import HttpUser, task, constant
from locust.exception import RescheduleTask

class StressTestUser(HttpUser):
    wait_time = constant(0)  # 最大压力
    host = "http://localhost:8082"

    @task(10)
    def spam_login(self):
        # 暴力登录尝试
        self.client.post(
            "/api/users/login", 
            params={"username": "invalid", "password": "wrong"},
            name="暴力登录"
        )

    @task(5)
    def flood_search(self):
        # 搜索接口洪水攻击
        self.client.post(
            "http://localhost:8081/api/search",
            json={"keyword": "test"},
            name="搜索洪水"
        )

    def on_stop(self):
        # 测试结束后检查恢复情况
        self.client.get("http://localhost:8081/api/articles/downloads/top8")