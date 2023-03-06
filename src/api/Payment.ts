import axios from "axios";
import { OrderData } from "../types";
import { auth } from "./Firebase";
import {
  UpdateOrderAndReduceQuantity,
  hostUrl,
  isPayPayEnabled,
  generateErrorFirebaseAndAxiosErrors,
} from "./helper";
const url = "https://payment.run-ticket.com";

export const PayPaySessionCreate = async (order: OrderData) => {
  try {
    const token: { data: string } = await axios.post(`${url}/token`, {
      userId: auth.currentUser?.uid,
      orderId: order.id,
    });
    const createQR = await axios.post(
      `${url}/PayPayRequest`,
      {
        orderId: order.id,
        hostUrl: hostUrl,
        amount: order.totalPrice,
        orderDescription: order.menu.map((item) => item.title).join(","),
      },
      {
        headers: {
          Authorization: `Bearer ${token.data}`,
          "Content-Type": "application/json",
        },
      }
    );
    window.location.href = createQR.data.BODY.data.url;
  } catch (e) {
    throw generateErrorFirebaseAndAxiosErrors(
      "決済に失敗しました。申し訳ございませんが、時間を空けて再度お試しください。",
      e
    );
  }
};

export const PayPayStatusCheck = async (orderId: string) => {
  try {
    const result = await axios.post(`${url}/PayPayGetStatus`, {
      orderId: orderId,
    });
    if (isPayPayEnabled(result)) {
      await UpdateOrderAndReduceQuantity(orderId);
      window.location.href = `/order/${orderId}/success`;
    } else {
      window.location.href = `/order/${orderId}/failed`;
    }
  } catch (e) {
    throw generateErrorFirebaseAndAxiosErrors(
      "PayPay決済を確認できませんでした。",
      e
    );
  }
};
