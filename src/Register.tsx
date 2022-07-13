import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { CorrectEmail } from "./SubmitGet";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth } from "./Firebase";
import { IllegalEmailAddress } from "./component/IllegalEmailAddress";
import App from "./App";
import ScrollDialog from "./component/ScrollDialog";

const theme = createTheme();
const provider = new GoogleAuthProvider();
export const Register = () => {
  const [userEmail, setUserEmail] = useState<string>("e1xxx@oit.ac.jp");
  const [user, setUser] = useState<User>();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || "");
        setUser(user);
        // console.log(user);
        // setIsLogin(true);
      } else {
      }
    });
  }, []);

  const LoginPopup = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // console.log(user.email);
        setUserEmail(user.email || "");
        setIsLogin(true);
        window.location.reload();
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteUserRedirect = () => {

    LoginPopup();

  };

  return (
    <ThemeProvider theme={theme}>
      {CorrectEmail(userEmail) && !isLogin ? (
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
          <Avatar src={user?.photoURL || ""} alt="logo" sx={{ mx: 17 }} />
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
                学生のGoogleアカウントでサインインしてください
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
          <ScrollDialog open={open} onClick={function (): void {
            LoginPopup()
          }} setIsClose={setOpen} />
        </Box>
      ) : CorrectEmail(userEmail) && isLogin ? (
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
