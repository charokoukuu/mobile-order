import axios, { AxiosError } from "axios";
import { OrderData } from "../types";
import { auth } from "./Firebase";
import { GetPaymentStatus, hostUrl, isPayPayEnabled } from "./helper";
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
    const error = e as AxiosError<{ error: string }>;
    throw new Error(error.message);
  }
};

export const PayPayStatusCheck = async (orderId: string) => {
  try {
    const result = await axios.post(`${url}/PayPayGetStatus`, {
      orderId: orderId,
    });
    if (isPayPayEnabled(result)) {
      await GetPaymentStatus(orderId);
      window.location.href = `/order/${orderId}/success`;
    } else {
      window.location.href = `/order/${orderId}/failed`;
    }
  } catch (e) {
    const error = e as AxiosError<{ error: string }>;
    throw new Error(error.message);
  }
};
