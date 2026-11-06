import { test, expect, request } from "@playwright/test";

class APIUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }
  //getting the token from the login API and storing it in a variable
  async getToken() {
    // Login
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      { data: this.loginPayload },
    );
    expect(loginResponse.ok()).toBeTruthy();
    const loginToken = (await loginResponse.json()).token;
    return loginToken;
  }

  //Creating an order using the order API and storing the order ID in a variable
  async createOrder(orderPayload) {
    let response = {};
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
      },
    );
    expect(orderResponse.ok()).toBeTruthy();
    const orderId = (await orderResponse.json()).orders[0];
    console.log("Created order:", orderId);
    response.orderId = orderId;
    return response;
  }
}

module.exports = { APIUtils };
