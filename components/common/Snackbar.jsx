import React, { useState, useEffect } from "react";
import { Button, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const SimpleSnackbar = ({ resultMessage, durationProps }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(2000);

  useEffect(() => {
    setOpen(true);
    setMessage(resultMessage);
    setDuration(durationProps);
  }, []);

  function closeSnackbar(reason) {
    if (reason === "clickaway") return;
    setOpen(false);
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={duration} // 2초동안 나타남
        onClose={closeSnackbar}
        message={message}
        action={
          <>
            <Button color="primary" size="small" onClick={closeSnackbar}>
              닫기
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={closeSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </div>
  );
};

export default SimpleSnackbar;
