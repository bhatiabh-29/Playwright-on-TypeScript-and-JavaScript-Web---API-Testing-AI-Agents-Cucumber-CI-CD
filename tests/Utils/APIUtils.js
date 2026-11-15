class APIUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    const loginres = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      { data: this.loginPayload },
    );

    const loginresJson = await loginres.json();
    const logintoken = loginresJson.token;
    console.log("Login response:", loginresJson);
    console.log("Token:", logintoken);

    return logintoken;
  }

  async createOrder(orderPayLoad) {
    let response = {};
    response.logintoken = await this.getToken();

    const orderRes = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayLoad,
        headers: {
          Authorization: response.logintoken,
          "Content-Type": "application/json",
        },
      },
    );

    const orderResJson = await orderRes.json();
    console.log(orderResJson);
    const orderId = orderResJson.orders[0];
    response.orderId = orderId;
    return response;
  }
}

module.exports = { APIUtils };
