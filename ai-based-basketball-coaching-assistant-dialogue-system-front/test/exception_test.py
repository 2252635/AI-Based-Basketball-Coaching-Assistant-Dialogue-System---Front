from locust import HttpUser, task, between
import random

class ApiTestUser(HttpUser):
    wait_time = between(1, 3)
    host = "http://localhost:8082"

    # 测试数据
    valid_email = f"user{random.randint(1000,9999)}@test.com"
    invalid_email = "invalid-email"
    password = "Test@1234"
    code = "123456"  # 假设验证码
    
    @task(5)
    def test_data_anomalies(self):
        # 测试数据异常场景
        # 1. 缺少必填字段
        response = self.client.post(
            "http://localhost:8082/api/users/register",
            params={"password": self.password}
        )

        # 2. 格式错误邮箱
        response = self.client.post(
            "http://localhost:8082/api/users/register",
            params={
                "email": self.invalid_email,
                "password": self.password,
                "code": self.code
            }
        )

        # 3. 超大文章ID
        response = self.client.get(
            "http://localhost:8081/api/articles/99999999999999999999999999999999999999999999999999999999999"
        )