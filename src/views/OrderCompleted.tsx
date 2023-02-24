import { useEffect, useState } from "react";
import { MenuData, OrderData } from "../types";
import { Link, useParams } from "react-router-dom";
import { GetSpecificData } from "../api/SubmitGet";
import { onSnapshot, doc } from "firebase/firestore";
import { QRCodeSVG } from "qrcode.react";
import { Button, Card, Divider } from "@mui/material";
import { LoadingAnimation } from "../component/LoadingAnimation";
import Slide from "../component/Slide";
import { auth } from "../api/Firebase";
import IntegrationNotistack from "../component/IntegrationNotistack";
import { db } from "../api/Firebase";
import { Spacer } from "../component/SwipeTabs";

let isChecked = false;
interface Props {
  appBarHeight: number;
}
export const OrderCompleted = ({ appBarHeight }: Props) => {
  const [orderData, setOrderData] = useState<OrderData>();
  const [isGetOrderData, setIsGetOrderData] = useState<boolean>(false);
  const [isChangeStatus, setIsChangeStatus] = useState<boolean>(false);
  const [isPramsIdError, setIsPramsIdError] = useState<boolean>(false);
  const params = useParams();

  useEffect(() => {
    (async () => {
      if (params.id) {
        const orderData = await GetSpecificData("order", params.id);
        if (orderData !== null) {
          setOrderData(orderData);
        } else {
          setIsPramsIdError(true);
        }
        setIsGetOrderData(true);
      }
    })();
    onSnapshot(doc(db, "order", params.id || ""), (doc) => {
      if (isChecked) {
        doc.data()?.isStatus === "complete" &&
          setOrderData(doc.data() as OrderData);
        setIsChangeStatus(true);
      }
      isChecked = true;
    });
  }, [params.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Spacer appBarHeight={appBarHeight} mode={"history"} />
      {params.id && params.status === "success" ? (
        <IntegrationNotistack message="決済が完了しました" variant="success" />
      ) : (
        params.status === "failed" && (
          <IntegrationNotistack
            message="決済情報が見つかりません"
            variant="error"
          />
        )
      )}
      <div className="mt-3">
        {isGetOrderData ? (
          <Card className="mx-auto mt-5 w-[90%] max-w-[1200px] py-3">
            {auth.currentUser?.uid === orderData?.user.uid ||
            !isPramsIdError ? (
              <>
                {/* <p>{orderData?.id}</p> */}
                {(orderData?.isStatus === "ordered" ||
                  orderData?.isStatus === "cooked") && (
                  <div>
                    <h2 className="my-8 text-center font-sans text-3xl text-black">
                      食券発行用QR
                    </h2>
                    <div className="relative h-full w-full py-20">
                      <QRCodeSVG
                        className="absolute top-0 right-1/2 translate-x-1/2 transform"
                        value={orderData?.id}
                        size={150}
                      />
                    </div>
                    <p className=" japanese_R mt-1 text-center text-lg text-black">
                      {`注文ID: ${orderData?.id}`}
                    </p>
                  </div>
                )}
                {orderData?.isStatus === "complete" && (
                  <p className="my-2 text-center text-xl">
                    ご注文ありがとうございました
                  </p>
                )}
                <h2 className="my-3 text-center text-3xl font-bold text-black">
                  {`￥${orderData?.totalPrice}`}
                </h2>
                <div className="my-4">
                  {orderData?.menu.map((e: MenuData, i: number) => {
                    return (
                      <div
                        className="mx-auto grid w-1/2 grid-cols-2 gap-2 font-bold text-black opacity-[0.65]"
                        key={i}
                      >
                        <span className="grid justify-end">{e.title}</span>
                        <span className="grid justify-end">{`￥${e.price}`}</span>
                      </div>
                    );
                  })}
                  {orderData?.isStatus === "not_payed" && (
                    <div className="mt-3 text-center">
                      <Button
                        variant="contained"
                        onClick={() => {
                          orderData.payment === "paypay"
                            ? (window.location.href = `/check/${orderData.id}/${orderData.payment}`)
                            : (window.location.href = `/check/${orderData.checkoutId}/${orderData.payment}`);
                        }}
                      >
                        決済情報の再取得
                      </Button>
                    </div>
                  )}
                  {params.status === "failed" && (
                    <div className="my-7">
                      <h2 className="mx-auto w-5/6 text-center text-xl">
                        決済情報が見つかりませんでした。以下に表示されたコードを問い合わせフォームに記載してください。
                      </h2>
                      <div className="bg-black/80">
                        <p className="my-8 mx-auto w-5/6 break-words text-start text-xl text-white">
                          {params.id}
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <Button
                          variant="contained"
                          href={`https://docs.google.com/forms/d/e/1FAIpQLSfRRIK0WBAoMt_WN3RAKbP598LZOQAhsOrIQu8O7eAZE81x1Q/viewform?usp=pp_url&entry.951689160=${params.id}`}
                        >
                          お問い合わせフォームへ
                        </Button>
                      </div>
                    </div>
                  )}
                  {(orderData?.isStatus === "ordered" ||
                    orderData?.isStatus === "cooked") && (
                    <div className="mt-4">
                      <Divider />
                      <h2 className="my-8 text-center font-sans text-3xl text-black">
                        食券受け取り方法
                      </h2>
                      <Slide />
                    </div>
                  )}
                </div>
                {orderData?.isStatus === "complete" && isChangeStatus && (
                  <IntegrationNotistack message="注文完了" variant="success" />
                )}
              </>
            ) : (
              <>
                <div className="mx-2 text-center">
                  <h1 className="text-4xl">
                    404 Not Found.
                    <br />
                  </h1>
                  <p>
                    <span className="text-xl">
                      {auth.currentUser?.displayName}
                      さんの
                      <br />
                      注文が見つかりませんでした。
                    </span>
                    <br />
                    もし、注文後正しくQRコードが発行されなかった場合は、
                    アカウントをご確認の上、
                    以下の問い合わせボタンからお問い合わせください。
                  </p>
                  <div className="bg-black/80">
                    <p className="my-8 mx-auto w-5/6 break-words text-start text-xl text-white">
                      {params.id}
                    </p>
                  </div>
                  <div>
                    <Button variant="text" component={Link} to="/history">
                      注文履歴に戻る
                    </Button>
                    <span>/</span>
                    <Button
                      variant="text"
                      href={`https://docs.google.com/forms/d/e/1FAIpQLSfRRIK0WBAoMt_WN3RAKbP598LZOQAhsOrIQu8O7eAZE81x1Q/viewform?usp=pp_url&entry.951689160=${params.id}`}
                    >
                      問い合わせる
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        ) : (
          <LoadingAnimation type="jelly" />
        )}
      </div>
    </>
  );
};
