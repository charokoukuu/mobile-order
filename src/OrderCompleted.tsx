import { useEffect, useState } from "react";
import { MenuData } from "./Interface";
import { useParams } from "react-router-dom";
import { GetSpecificData } from "./SubmitGet";
import { DocumentData } from "firebase/firestore";
import { UserInfo } from "./UserInfo";
import { QRCodeSVG } from "qrcode.react";
import { Card } from "@mui/material";
import { LoadingAnimation } from "./component/LoadingAnimation";
import Slide from "./component/Slide";

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
    <div>
      {isGetOrderData ? (
        <Card
          style={{
            marginTop: "20px",
            margin: "auto",
            maxWidth: "1200px",
            width: "90vw",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Order</h1>
          {UserInfo.user.uid === orderData?.user.uid ? (
            <>
              {/* <p>{orderData?.id}</p> */}
              {orderData.isStatus === "注文済み" && (
                <QRCodeSVG
                  style={{
                    display: "flex",
                    margin: "0 auto",
                    height: "30vh",
                  }}
                  value={orderData?.id}
                  size={200}
                />
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
                {orderData.menu.map((e: MenuData, i: number) => {
                  return (
                    <div
                      style={{
                        display: "table",
                        width: "50%",
                        margin: "0 auto",
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
                {orderData.isStatus === "注文済み" && (
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
              <p style={{ textAlign: "center" }}>権限がありません</p>
            </>
          )}
        </Card>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
};
