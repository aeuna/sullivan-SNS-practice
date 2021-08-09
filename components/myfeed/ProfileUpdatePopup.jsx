import React, { useState, useRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  Typography,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "../common/Avatar";
import Snackbar from "../common/Snackbar";
import firebase from "../../firestores/firebase";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles(() => ({
  loadingPreview: {
    margin: "2rem 0",
  },
  popupBtn: {
    cursor: "pointer",
    margin: "1rem 0",
    fontWeight: "bold",
  },
  formGroup: {
    padding: "2rem",
  },
  label: {
    fontWeight: "bold",
  },
  saveBtn: {
    fontWeight: "bold",
  },
}));

const ProfileUpdatePopup = ({ user, getUserInfo }) => {
  const classes = useStyles();
  const fileButton = useRef();
  const uid = uuidv4();

  /* 팝업창 오픈 상태 */
  const [open, setOpen] = useState(false);
  /* form 입력 데이터 상태 */

  /* 사진 첨부 시 로딩 상태 */
  const [loading, setLoading] = useState(false);
  /* 업데이트 결과 메세지 상태 */
  const [resultMessage, setResultMessage] = useState("");

  function openPopup() {
    setOpen(true);
  }
  function closePopup() {
    setOpen(false);
  }

  async function getPhotoUrl() {
    setLoading(true);
    const file = fileButton.current.files[0];
    const storageRef = firebase.storage().ref(user.uid + "/" + uid);
    const saveFileTask = await storageRef.put(file);
    const downloadedPhotoUrl = await saveFileTask.ref.getDownloadURL();
    setPhotoUrl(downloadedPhotoUrl);
    setLoading(false);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const updateData = {};

    try {
      await updateUserProfile(updateData);
      closePopup();
      getUserInfo();
    } catch (e) {
      console.error(e);
    }
  }

  async function updateUserProfile(updateData) {}

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={openPopup}>
        프로필 수정하기
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={closePopup}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <form id="profileUpdate" onSubmit={submitHandler}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              {loading ? (
                <CircularProgress
                  color="primary"
                  className={classes.loadingPreview}
                />
              ) : (
                <Avatar displayName={displayName} photoUrl={photoUrl} />
              )}
              <Typography className={classes.popupBtn} color="primary">
                프로필 사진 바꾸기
                <input
                  type="file"
                  hidden
                  ref={fileButton}
                  onChange={getPhotoUrl}
                />
              </Typography>
            </Grid>
            <Divider variant="middle" light />
            <div className={classes.formGroup}>
              <Grid container direction="row" alignItems="center">
                <Grid item md={2} xs={12}>
                  <label htmlFor="userName" className={classes.label}>
                    사용자 이름
                  </label>
                </Grid>
                <Grid item md={10} xs={12}>
                  <TextField
                    id="userName"
                    type="text"
                    value={displayName}
                    placeholder="사용자 이름"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" alignItems="center">
                <Grid item md={2} xs={12}>
                  <label htmlFor="webPage" className={classes.label}>
                    웹사이트
                  </label>
                </Grid>
                <Grid item md={10} xs={12}>
                  <TextField
                    id="webPage"
                    type="text"
                    value={webpage}
                    placeholder="웹사이트"
                    autoFocus
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setWebpage(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" alignItems="center">
                <Grid item md={2} xs={12}>
                  <label htmlFor="caption" className={classes.label}>
                    소개
                  </label>
                </Grid>
                <Grid item md={10} xs={12}>
                  <TextField
                    id="caption"
                    multiline
                    value={caption}
                    placeholder="소개"
                    autoFocus
                    margin="dense"
                    variant="outlined"
                    rows="4"
                    fullWidth
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </Grid>
              </Grid>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" size="large" onClick={closePopup}>
            취소
          </Button>
          <Button
            className={classes.saveBtn}
            color="primary"
            size="large"
            type="submit"
            form="profileUpdate"
          >
            저장
          </Button>
        </DialogActions>
      </Dialog>
      {resultMessage && (
        <Snackbar resultMessage={resultMessage} durationProps={1400} />
      )}
    </div>
  );
};

export default ProfileUpdatePopup;
