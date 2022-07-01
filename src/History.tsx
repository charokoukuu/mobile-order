import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { LoadingAnimation } from "./component/LoadingAnimation";
import { SearchCollectionDataGet } from "./SubmitGet";
import { UserInfo } from "./UserInfo";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import { OrderCompleted } from "./OrderCompleted";
// import dayjs from "dayjs";
// import 'dayjs/locale/ja';

export const History = () => {
  const [oneOrderData, setOneOrderData] = useState<DocumentData[]>();
  const [isGetHistoryData, setIsGetHistoryData] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let order = await SearchCollectionDataGet(
        "order",
        "user.uid",
        UserInfo.user.uid
      );
      order?.sort((prev, curr) => {
        if (prev.date.seconds > curr.date.seconds) return -1;
        else if (prev.date.seconds < curr.date.seconds) return 1;
        else return 0;
      });
      setOneOrderData(order);
      setIsGetHistoryData(true);
    })();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#707070" }}>注文履歴</h1>
      {isGetHistoryData ? (
        oneOrderData?.map((e, i) => {
          return (
            <div key={i} style={{ margin: "2vw 0" }}>
              <Link
                style={{
                  textDecoration: "none",
                }}
                to={`/order/${e.id}`}
              >
                <Card style={{ borderRadius: "3px" }} sx={{ minWidth: 275 }}>
                  <CardContent>
                    <div color="text.secondary">
                      <div style={{ textAlign: "right", color: "#707070" }}>
                        {e.date.toDate().toLocaleString()}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ margin: "auto 0" }}>
                        {e.menu.map((e: DocumentData, i: number) => (
                          <div key={i} style={{ color: "#707070" }}>
                            {" "}
                            {e.title}
                          </div>
                        ))}
                      </div>
                      <div
                        className="japanese_B"
                        style={{ fontSize: 30, margin: "auto 0" }}
                      >
                        ¥{e.totalPrice}
                      </div>
                    </div>
                    <div color="text.secondary">
                      <div
                        style={{
                          textAlign: "right",
                          clear: "both",
                          color: "#1FA7D0",
                        }}
                      >
                        ID:{e.id}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          );
        })
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
};
