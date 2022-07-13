import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { LoadingAnimation } from "./component/LoadingAnimation";
import { SearchCollectionDataGet } from "./SubmitGet";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { auth } from "./Firebase";
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
        auth.currentUser?.uid || "",
        10
      );

      setOneOrderData(order);
      setIsGetHistoryData(true);
    })();
  }, []);

  return (
    <div style={{ marginTop: "2vw" }}>
      <div style={{ backgroundColor: "#ffffff", padding: "2vw", borderRadius: "8px", width: "92vw", margin: "0 auto" }}>
        <h2 className="japanese_L" style={{ textAlign: "center", color: "#707070" }}>注文履歴</h2>
        {isGetHistoryData ? (
          !oneOrderData?.length ? (
            <div style={{ textAlign: "center" }}>注文履歴はありません</div>
          ) : (
            oneOrderData?.map((e, i) => {
              return (
                <div key={i} style={{ margin: "4vw 0" }}>
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    to={`/order/${e.id}`}
                  >
                    <Card style={{ borderRadius: "8px", boxShadow: "0px 3px 6px rgba(0,0,0,0.2)" }} sx={{ width: "89vw", margin: "0 auto" }} >
                      <CardContent>
                        <div color="text.secondary">
                          <div className="japanese_L" style={{ textAlign: "right", color: "#707070" }}>
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
                              <div key={i} style={{ color: "#707070", marginLeft: "2vw" }}>
                                {" "}
                                {e.title}
                              </div>
                            ))}
                          </div>
                          <div
                            className="japanese_B themeFontColor"
                            style={{ fontSize: 30, margin: "auto 0" }}
                          >
                            ¥{e.totalPrice}
                          </div>
                        </div>
                        <div color="text.secondary">
                          <div
                            className="japanese_R"
                            style={{
                              textAlign: "right",
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
            }))
        ) : (
          <LoadingAnimation type={"jelly"} />
        )}
      </div>
    </div>
  );
};