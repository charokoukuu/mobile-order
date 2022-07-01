import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  deleteUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth } from "./Firebase";
import { IllegalEmailAddress } from "./component/IllegalEmailAddress";
import App from "./App";
import { UserInfo } from "./UserInfo";
import { Link } from "react-router-dom";

const theme = createTheme();
const provider = new GoogleAuthProvider();
export const Register = () => {
  const [userEmail, setUserEmail] = useState<string>("e1xxx@oit.ac.jp");
  const [user, setUser] = useState<User>();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const correctEmail = (email: string) => {
    const regex = /[a-zA-Z0-9._-]+@oit.ac.jp$/ || /^runticket21@gmail.com$/;
    return regex.test(email);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        UserInfo.user = user;
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
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteUserRedirect = () => {
    if (auth.currentUser) {
      deleteUser(auth.currentUser)
        .then(() => {
          // console.log("delete user");
          LoginPopup();
        })
        .catch((error) => {
          // An error ocurred
          // ...
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {correctEmail(userEmail) && !isLogin ? (
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
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="success"
                component={Link}
                to="/"
              >
                メニューを見る
              </Button>
            </>
          ) : (
            <>
              <h2 style={{ textAlign: "center" }}>
                学生のGoogleアカウントでサインインしてください。
              </h2>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={LoginPopup}
              >
                Login
              </Button>
            </>
          )}
        </Box>
      ) : correctEmail(userEmail) && isLogin ? (
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
