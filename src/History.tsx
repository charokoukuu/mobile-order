import { DocumentData } from "firebase/firestore";
import { CSSProperties, useEffect, useState } from "react";
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
  const svgStyle: CSSProperties = {
    position: "absolute",
    left: "5%",
    bottom: "8%",
    color: "green",
    fontSize: "3vw",
    width: "5%",
  }
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
      {
        (isGetHistoryData && !oneOrderData?.length) ?
          <div style={{ textAlign: "center" }}>注文履歴はありません</div>
          : (isGetHistoryData && oneOrderData?.length) ?
            <div style={{ backgroundColor: "#ffffff", padding: "2vw", borderRadius: "8px", width: "90%", margin: "0 auto" }}>
              <h2 className="japanese_L" style={{ textAlign: "center", color: "#707070" }}>注文履歴</h2>

              {oneOrderData?.map((e, i) => {
                return (
                  <div key={i} style={{ margin: "4vw 0" }}>
                    <Link
                      style={{
                        textDecoration: "none",
                      }}
                      to={`/order/${e.id}`}
                    >
                      <Card style={{ borderRadius: "8px", boxShadow: "0px 3px 6px rgba(0,0,0,0.2)" }} sx={{ width: "89vw", margin: "0 auto", position: "relative" }} >
                        <CardContent>
                          <div color="text.secondary">
                            <div className="japanese_L" style={{ textAlign: "right", color: "#000000" }}>
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
                            {e.isStatus === "注文完了" && <div
                            >
                              <svg style={svgStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#01AD4A"><path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" /></svg>
                              <div className="japanese_L"
                                style={{
                                  position: "absolute",
                                  left: "11%",
                                  bottom: "8%",
                                  color: "#01AD4A",
                                  fontSize: "3vw"
                                }}>
                                注文受け取り済み
                              </div>
                            </div>}
                            {e.isStatus === "決済完了" && <div
                            >
                              <svg style={svgStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFBE3B"><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" /></svg>
                              <div className="japanese_L"
                                style={{
                                  position: "absolute",
                                  left: "11%",
                                  bottom: "8%",
                                  color: "#DB8D00",
                                  fontSize: "3vw"
                                }}>
                                未受け取り
                              </div>
                            </div>}
                            {e.isStatus === "注文済み" && <div
                            >
                              <svg style={svgStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D11F00"><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" /></svg>
                              <div className="japanese_L"
                                style={{
                                  position: "absolute",
                                  left: "11%",
                                  bottom: "8%",
                                  color: "#D11F00",
                                  fontSize: "3vw"
                                }}>
                                決済情報がありません
                              </div>
                            </div>}
                            <div
                              className="japanese_R"
                              style={{
                                position: "absolute",
                                right: "5%",
                                bottom: "8%",
                                color: "#1FA7D0",
                                fontSize: "75%",
                              }}
                            >
                              ID: {e.id}
                            </div>
                            <div style={{
                              height: "1.5vw",
                            }}></div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                );
              }
              )}
            </div> :
            <LoadingAnimation type={"jelly"} />
      }
    </div>
  );
}

