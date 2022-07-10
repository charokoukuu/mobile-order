import { useEffect, useState } from "react";
import { MenuData } from "./Interface";
import { Link, useParams } from "react-router-dom";
import { GetSpecificData } from "./SubmitGet";
import { DocumentData } from "firebase/firestore";
import { QRCodeSVG } from "qrcode.react";
import { Button, Card } from "@mui/material";
import { LoadingAnimation } from "./component/LoadingAnimation";
import Slide from "./component/Slide";
import { auth } from "./Firebase";
import IntegrationNotistack from "./component/IntegrationNotistack";


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
  }, [params.id]);

  return (
    <>
      {params.status === "success" &&
        <IntegrationNotistack message="決済が完了しました" variant="success" />
      }
      <div style={{ margin: "10px 0" }}>
        {isGetOrderData ? (
          <Card
            style={{
              marginTop: "20px",
              margin: "auto",
              maxWidth: "1200px",
              width: "95vw",
              padding: "10% 0",
            }}
          >
            {auth.currentUser?.uid === orderData?.user.uid ? (
              <>
                {/* <p>{orderData?.id}</p> */}
                {orderData?.isStatus === "注文済み" && (
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
                      }}
                    >
                      {`注文ID: ${orderData?.id}`}
                    </h2>
                  </div>
                )}
                {orderData?.isStatus === "支払い済み" && (
                  <div style={{ display: "flex", height: "10vh" }}>
                    <h2
                      style={{
                        margin: "0 auto",
                        marginTop: "10px",
                        textAlign: "center",
                      }}
                    >
                      注文詳細
                    </h2>
                  </div>
                )}
                <h2
                  style={{
                    textAlign: "center",
                    margin: "0 auto",
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
                          }}
                        >
                          {e.title}
                        </span>
                        <span
                          style={{
                            display: "table-cell",
                            textAlign: "right",
                          }}
                        >{`￥${e.price}`}</span>
                      </div>
                    );
                  })}
                  {orderData?.isStatus === "注文済み" && (
                    <div style={{ margin: "10% 0" }}>
                      <h2 style={{ textAlign: "center" }}>
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
