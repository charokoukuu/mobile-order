import { useEffect, useState } from "react";
import { MenuData, OrderData } from "../types";
import { Link, useParams } from "react-router-dom";
import { GetSpecificData } from "../api/SubmitGet";
import { onSnapshot, doc } from "firebase/firestore";
import { QRCodeSVG } from "qrcode.react";
import { Button, Card } from "@mui/material";
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
  const params = useParams();

  useEffect(() => {
    (async () => {
      params.id &&
        setOrderData((await GetSpecificData("order", params.id)) as OrderData);
      setIsGetOrderData(true);
    })();
    onSnapshot(doc(db, "order", params.id || ""), (doc) => {
      if (isChecked) {
        doc.data()?.isStatus === "complete" &&
          setOrderData(doc.data() as OrderData);
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
      {params.status === "success" ? (
        <IntegrationNotistack message="決済が完了しました" variant="success" />
      ) : (
        params.status === "failed" && (
          <IntegrationNotistack
            message="決済情報が見つかりません"
            variant="error"
          />
        )
      )}
      <div style={{ margin: "10px 0" }}>
        {isGetOrderData ? (
          <Card
            style={{
              marginTop: "20px",
              margin: "auto",
              maxWidth: "1200px",
              width: "90%",
              padding: "10% 0",
            }}
          >
            {auth.currentUser?.uid === orderData?.user.uid ? (
              <>
                {/* <p>{orderData?.id}</p> */}
                {(orderData?.isStatus === "ordered" ||
                  orderData?.isStatus === "cooked") && (
                  <div>
                    <div style={{ display: "flex", height: "10vh" }}>
                      <h2
                        style={{
                          margin: "0 auto",
                          marginTop: "10px",
                          textAlign: "center",
                          color: "#000000",
                        }}
                      >
                        食券発行用QR
                      </h2>
                    </div>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        padding: "80px 0",
                      }}
                    >
                      <QRCodeSVG
                        style={{
                          position: "absolute",
                          top: "0%",
                          right: "50%",
                          transform: "translate(50%, 0)",
                        }}
                        value={orderData?.id}
                        size={150}
                      />
                    </div>
                    <h2
                      className="japanese_L"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        marginTop: "5px",
                        color: "#000000",
                      }}
                    >
                      {`注文ID: ${orderData?.id}`}
                    </h2>
                  </div>
                )}
                {orderData?.isStatus === "complete" && (
                  <div
                    className="japanese_L"
                    style={{
                      textAlign: "center",
                      fontSize: "120%",
                      margin: "3% 0",
                    }}
                  >
                    ご注文ありがとうございました
                  </div>
                )}
                <h2
                  style={{
                    textAlign: "center",
                    margin: "0 auto",
                    color: "#000000",
                    fontSize: "30px",
                  }}
                >
                  {`￥${orderData?.totalPrice}`}
                </h2>
                <div style={{ margin: "5% 0" }}>
                  {orderData?.menu.map((e: MenuData, i: number) => {
                    return (
                      <div
                        style={{
                          display: "table",
                          width: "50%",
                          margin: "0 auto",
                          color: "rgba(0, 0, 0, 0.65)",
                        }}
                        key={i}
                      >
                        <span
                          style={{
                            display: "table-cell",
                            verticalAlign: "left",
                            color: "#000000",
                          }}
                        >
                          {e.title}
                        </span>
                        <span
                          style={{
                            display: "table-cell",
                            textAlign: "right",
                            color: "#000000",
                          }}
                        >{`￥${e.price}`}</span>
                      </div>
                    );
                  })}
                  {orderData?.isStatus === "not_payed" && (
                    <div style={{ textAlign: "center", marginTop: "10vw" }}>
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
                    <div style={{ margin: "30px 0" }}>
                      <h2
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          width: "80vw",
                          margin: "auto",
                        }}
                      >
                        決済情報が見つかりませんでした。以下に表示されたコードを問い合わせフォームに記載してください。
                      </h2>
                      <div style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
                        <p
                          style={{
                            textAlign: "left",
                            fontSize: "20px",
                            width: "80vw",
                            margin: "30px auto",
                            overflowWrap: "break-word",
                            color: "#ffffff",
                          }}
                        >
                          {orderData?.checkoutId}
                        </p>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Button
                          variant="contained"
                          href="https://docs.google.com/forms/d/e/1FAIpQLSfRRIK0WBAoMt_WN3RAKbP598LZOQAhsOrIQu8O7eAZE81x1Q/viewform"
                        >
                          お問い合わせフォームへ
                        </Button>
                      </div>
                    </div>
                  )}
                  {(orderData?.isStatus === "ordered" ||
                    orderData?.isStatus === "cooked") && (
                    <div style={{ margin: "10% 0" }}>
                      <h2 style={{ textAlign: "center", color: "#000000" }}>
                        食券受け取り方法
                      </h2>
                      <Slide />
                    </div>
                  )}
                </div>
                {orderData?.isStatus === "complete" && (
                  <IntegrationNotistack message="complete" variant="success" />
                )}
              </>
            ) : (
              <>
                <div style={{ margin: "0 10%", textAlign: "center" }}>
                  <h1>
                    404 Not Found.
                    <br />
                  </h1>
                  <h2>申し訳ありません．</h2>
                  <p>
                    {auth.currentUser?.displayName}
                    さんのお探しの注文が見つかりませんでした。
                    <br />
                    もし、注文後正しくQRコードが発行されなかった場合は、
                    以下の問い合わせボタンからお問い合わせください。
                  </p>
                  <div>
                    <Button variant="text" component={Link} to="/history">
                      注文履歴に戻る
                    </Button>
                    <span>/</span>
                    <Button
                      variant="text"
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfRRIK0WBAoMt_WN3RAKbP598LZOQAhsOrIQu8O7eAZE81x1Q/viewform"
                    >
                      問い合わせる
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        ) : (
          <LoadingAnimation type={"jelly"} />
        )}
      </div>
    </>
  );
};
