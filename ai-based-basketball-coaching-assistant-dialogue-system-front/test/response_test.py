from locust import HttpUser, task, between
import random

class ApiResponseTimeUser(HttpUser):
    wait_time = between(0.1, 0.5)  # 高频访问测试
    host = "http://localhost:8082"  # 默认host
    
    def call_api(self, path, name=None, port=None, method="GET", **kwargs):
        """通用API调用方法，支持跨端口调用"""
        url = f"http://localhost:{port}{path}" if port else path
        with self.client.request(method, url, name=name or path, catch_response=True, **kwargs) as response:
            if response.elapsed.total_seconds() > 1.0:
                response.failure(f"Slow response: {response.elapsed.total_seconds()}ms")
            return response

    @task(3)
    def test_search(self):
        self.call_api("/api/search", port=8081, method="POST", json={"keyword": random.choice(["历史", "三人", "篮板"])})

    @task(2)
    def test_get_article(self):
        article_id = random.randint(1, 100)
        self.call_api(f"/api/articles/{article_id}", port=8081)

    @task(1)
    def test_top_downloads(self):
        self.call_api("/api/articles/downloads/top8", port=8081)