import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import firebase from "../../firestores/firebase";

const useStyles = makeStyles(() => ({
  form: {
    padding: "3rem",
  },
  label: {
    fontWeight: "bold",
  },
  fileInput: {
    display: "none",
  },
}));

const UploadForm = ({ feedUid }) => {
  const router = useRouter();
  const classes = useStyles();
  const uid = uuidv4();

  const [updateMode, setUpdateMode] = useState(false);
  const [loading, setLoading] = useState(false);

  /* photoUrl, content, location, tag, author 상태를 관리하도록 useState를 사용해주세요. 초기값 "" 예외) author 초기값은 {} (5줄) */
  /*채워주세요*/
  /*채워주세요*/
  /*채워주세요*/
  /*채워주세요*/
  /*채워주세요*/

  const fileButton = useRef();

  useEffect(() => {
    if (feedUid) {
      setUpdateMode(true);
      getFeedDetail();
    }
    getUser();
  }, []);

  async function getUser() {
    try {
      /* 1. api를 통해 접속한 유저의 정보를 가져오세요. */
      const fetchUserInfo = await fetch(/*채워주세요*/);
      const userInfo = await fetchUserInfo.json();

      /* 2. 유저의 정보로 상태 변화를 시켜주세요. (1줄) */
      /*채워주세요*/
    } catch (e) {
      console.error(e);
    }
  }

  async function getPhotoUrl() {
    try {
      setLoading(true);
      const file = fileButton.current.files[0];
      const storageRef = firebase.storage().ref(author.uid + "/" + uid);
      const saveFileTask = await storageRef.put(file);
      const downloadedPhotoUrl = await saveFileTask.ref.getDownloadURL();
      setLoading(false);
      setPhotoUrl(downloadedPhotoUrl);
    } catch (e) {
      console.error(e);
    }
  }

  function attachFile() {
    fileButton.current.click();
  }

  async function getFeedDetail() {}

  async function submitHandler(event) {
    event.preventDefault();

    try {
      if (updateMode) {
        updateFeed();
      } else {
        await createFeed();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function createFeed() {
    /* 1. 피드를 생성하기 위해, api에 전달해야하는 인자를 적어주세요 (6가지) */
    const createParams = {};

    try {
      /* 2. 피드를 생성하기 위한 api에 요청을 보내주세요. */ 
      const createResult = await fetch(/* 채워주세요 */, {
        method: /* 채워주세요 */,
        body: /* 채워주세요 */,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const { message } = await createResult.json();

      /* 3.생성후, 메인 피드 화면으로 이동하게 해주세요. */
      router.push({
      /* 채워주세요 */
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function updateFeed() {}

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          {/*  PhotoPreview 컴포넌트를 추가하고, 알맞은 props를 전달해주세요. */}
        </CardContent>
      </Card>
      <form id="edit" className={classes.form} onSubmit={submitHandler}>
        <input
          id="file"
          type="file"
          ref={fileButton}
          onChange={getPhotoUrl}
          className={classes.fileInput}
        />
        <Grid container direction="row" alignItems="center">
          <Grid item md={2} xs={12}>
            <label htmlFor="caption" className={classes.label}>
              문구입력
            </label>
          </Grid>
          <Grid item md={10} xs={12}>
            {/* 알맞은 value 값과 event를 적어주세요 */}
            <TextField
              id="caption"
              multiline
              rows="4"
              placeholder="문구 입력..."
              variant="outlined"
              margin="dense"
              fullWidth
              autoFocus
              required
              value={/* 채워주세요 */}
              onChange={/* 채워주세요 */}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid item md={2} xs={12}>
            <label htmlFor="location" className={classes.label}>
              위치 추가
            </label>
          </Grid>
          <Grid item md={10} xs={12}>
            {/* 알맞은 value 값과 event를 적어주세요 */}
            <TextField
              id="location"
              type="text"
              placeholder="위치 추가"
              variant="outlined"
              margin="dense"
              fullWidth
              autoFocus
              value={/* 채워주세요 */}
              onChange={/* 채워주세요 */}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid item md={2} xs={12}>
            <label htmlFor="tagging" className={classes.label}>
              태그
            </label>
          </Grid>
          <Grid item md={10} xs={12}>
            {/* 알맞은 value 값과 event를 적어주세요 */}
            <TextField
              id="tagging"
              type="text"
              placeholder="태그하기"
              variant="outlined"
              margin="dense"
              fullWidth
              autoFocus
              value={/* 채워주세요 */}
              onChange={/* 채워주세요 */}
            />
          </Grid>
        </Grid>
        <CardActions>
        {/*  SubmitButton 컴포넌트를 추가하세요. */}
        </CardActions>
      </form>
    </>
  );
};

export default UploadForm;
