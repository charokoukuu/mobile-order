import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Terms } from "../views/Terms";
import { PrivacyPolicy } from "../views/PrivacyPolicy";
import { useState } from "react";

interface ScrollDialogProps {
  open: boolean;
  onClick: () => void;
  setIsClose: (isClose: boolean) => void;
}

export default function ScrollDialog(props: ScrollDialogProps) {
  const [mode, setMode] = useState<"terms" | "privacy">("terms");

  const handleClose = () => {
    props.setIsClose(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">利用規約</DialogTitle>
        <DialogContent dividers={true}>
          {mode === "terms" && (
            <Terms
              width="90%"
              onClick={() => {
                setMode("privacy");
              }}
            />
          )}
          {mode === "privacy" && (
            <PrivacyPolicy
              width="90%"
              onClick={() => {
                setMode("terms");
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>同意しない</Button>
          <Button onClick={props.onClick} variant="contained">
            同意する
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
