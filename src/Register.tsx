import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ChangeEvent, useEffect, useState } from "react";
import {
  getAuth,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
  sendSignInLinkToEmail,
} from "firebase/auth";
const theme = createTheme();

export const Register = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [isAddress, setIsAddress] = useState(false);

  // 認証セッティング
  const actionCodeSettings = {
    // リダイレクト先としたいURL。
    // URL は、Firebase Console の authorized domains list に含まれている必要があります。
    url: "http://mobile-order-4d383.web.app",
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: "com.example.ios",
    },
    android: {
      packageName: "com.example.android",
      installApp: true,
      minimumVersion: "12",
    },
    dynamicLinkDomain: "example.page.link",
  };

  // テキストフィールドに入力してる時の処理
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // 正規表現でemailをチェック
  useEffect(() => {
    const regex = /^e[a-zA-Z0-9._-]+@oit.ac.jp$/;
    setIsAddress(regex.test(email));
  }, [email]);

  const sendAsycEmail = async () => {
    try {
      // await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      // window.localStorage.setItem("emailForSignIn", email);
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
    } catch (error) {
      console.log(error);
    }
  };

  // SIGIN IN押したときの処理
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email);
    // 正規表現で大工大生かどうかチェック
    isAddress ? sendAsycEmail() : console.log("no");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChangeEmail}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <p>{isAddress ? "" : "大学メールアドレスを入力してください．"}</p>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
