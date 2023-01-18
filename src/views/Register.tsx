import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { CorrectEmail } from "../api/SubmitGet";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth } from "../api/Firebase";
import { IllegalEmailAddress } from "../component/IllegalEmailAddress";
import App from "./App";
import ScrollDialog from "../component/ScrollDialog";
import { Spacer } from "../component/SwipeTabs";

const theme = createTheme();
const provider = new GoogleAuthProvider();
interface Props {
  appBarHeight: number;
}
export const Register = ({ appBarHeight }: Props) => {
  const [user, setUser] = useState<User>();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        // No user is signed in.
      }
    });
  }, []);

  const LoginPopup = async () => {
    setOpen(false);
    signInWithPopup(auth, provider)
      .then(() => {
        setIsLogin(true);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //無意味な変更(staging URL延長のため)ver2
  const DeleteUserRedirect = () => {
    LoginPopup();
  };

  return (
    <ThemeProvider theme={theme}>
      <Spacer appBarHeight={appBarHeight || 56} mode={"history"} />
      {CorrectEmail() && !isLogin ? (
        <Box
          component="form"
          onSubmit={LoginPopup}
          noValidate
          sx={{ my: 12, mx: 5 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            src={user?.photoURL || ""}
            alt="logo"
            style={{
              width: "100px",
              height: "100px",
            }}
          />
          {user?.displayName ? (
            <>
              <h2 style={{ textAlign: "center" }}>
                お帰りなさい{user?.displayName || ""}さん
              </h2>
              <Button
                style={{
                  backgroundColor: "#006C9B",
                }}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                メニューを見る
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                color="error"
                onClick={() => {
                  auth.signOut();
                  window.location.reload();
                }}
              >
                ログアウト
              </Button>
            </>
          ) : (
            <>
              <h2 style={{ textAlign: "center" }}>
                Googleアカウントでログインしてください
              </h2>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  setOpen(true);
                }}
              >
                ログイン
              </Button>
            </>
          )}
          <ScrollDialog
            open={open}
            onClick={function (): void {
              LoginPopup();
            }}
            setIsClose={setOpen}
          />
        </Box>
      ) : CorrectEmail() && isLogin ? (
        <App />
      ) : (
        <IllegalEmailAddress
          email={""}
          onClick={function (): void {
            DeleteUserRedirect();
          }}
        />
      )}
    </ThemeProvider>
  );
};
