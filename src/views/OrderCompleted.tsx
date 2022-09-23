import { useEffect, useState } from "react";
import { MenuData } from "../api/types";
import { Link, useParams } from "react-router-dom";
import { GetSpecificData } from "../api/SubmitGet";
import { DocumentData, onSnapshot, doc } from "firebase/firestore";
import { QRCodeSVG } from "qrcode.react";
import { Button, Card } from "@mui/material";
import { LoadingAnimation } from "../component/LoadingAnimation";
import Slide from "../component/Slide";
import { auth } from "../api/Firebase";
import IntegrationNotistack from "../component/IntegrationNotistack";
import { db } from "../api/Firebase";

let isChecked = false;
export const OrderCompleted = () => {
  const [orderData, setOrderData] = useState<DocumentData>();
  const [isGetOrderData, setIsGetOrderData] = useState<boolean>(false);
  const params = useParams();

  useEffect(() => {
    (async () => {
      params.id && setOrderData(await GetSpecificData("order", params.id));
      setIsGetOrderData(true);
      // console.log(params.id);
    })();
    onSnapshot(doc(db, "order", params.id || ""), (doc) => {
      console.log("Current data: ", doc.data());
      if (isChecked) {
        doc.data()?.isStatus === "注文完了" && setOrderData(doc.data());
      }
      isChecked = true;
    });
  }, [params.id]);
  return (
    <>
      {params.status === "success" ?
        <IntegrationNotistack message="決済が完了しました" variant="success" />
        : params.status === "faild" &&
        <IntegrationNotistack message="決済情報が見つかりません" variant="error" />
      }
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
                {orderData?.isStatus === "決済完了" && (
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
                        チケット発行QR
                      </h2>
                    </div>
                    <div style={{ position: "relative", width: "100%", height: "100%", padding: "80px 0" }}>
                      <QRCodeSVG
                        style={{
                          position: "absolute",
                          top: "0%",
                          right: "50%",
                          transform: "translate(50%, 0)",
                        }}
                        value={orderData?.id}
                        size={150} />
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
                {orderData?.isStatus === "注文完了" && <div className="japanese_L" style={{ textAlign: "center", fontSize: "120%", margin: "3% 0" }}>
                  ご注文ありがとうございました
                </div>}
                {orderData?.isStatus === "注文完了" && <IntegrationNotistack message="注文完了" variant="success" />}
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
                  {orderData?.isStatus === "注文済み" && (
                    <div style={{ textAlign: "center", marginTop: "10vw" }}>
                      <Button variant="contained" onClick={() => {
                        orderData.payment === "paypay" ? window.location.href = `/check/${orderData.id}/${orderData.payment}` : window.location.href = `/check/${orderData.checkoutId}/${orderData.payment}`;
                      }}>決済情報の再取得</Button>
                    </div>
                  )}
                  {params.status === "faild" && (
                    <>
                      <h2 style={{ textAlign: "center" }}>
                        決済情報が見つかりませんでした。<br />
                        以下に表示されたコードを問い合わせフォームに記載してください。
                      </h2>
                      {/* ここが改行されなくて困る */}
                      <p >{orderData?.checkoutId}</p>
                      <div style={{ textAlign: "center" }} >
                        <Button variant="contained"
                          href="https://docs.google.com/forms/d/e/1FAIpQLSfRRIK0WBAoMt_WN3RAKbP598LZOQAhsOrIQu8O7eAZE81x1Q/viewform"
                        >
                          お問い合わせフォームへ
                        </Button>
                      </div>
                    </>
                  )}
                  {orderData?.isStatus === "決済完了" && (
                    <div style={{ margin: "10% 0" }}>
                      <h2 style={{ textAlign: "center", color: "#000000" }}>
                        チケット受け取り方法
                      </h2>
                      <Slide />
                    </div>
                  )}
                </div>
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
      </div></>
  );
};
