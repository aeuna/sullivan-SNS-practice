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
import SubmitButton from "../edit/SubmitButton";
import PhotoPreview from "../edit/PhotoPreview";

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
  const [photoUrl, setPhotoUrl] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [tag, setTag] = useState("");
  const [author, setAuthor] = useState({});

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
      const fetchUserInfo = await fetch("/api/user");
      const userInfo = await fetchUserInfo.json();

      /* 2. 유저의 정보로 상태 변화를 시켜주세요. (1줄) */
      setAuthor(userInfo);
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

  async function getFeedDetail() {
    try {
      /* 1.한 피드의 디테일 정보를 가져오는 api를 요청해주세요. */
      const fetchFeedDetail = await fetch(`/api/feed/${feedUid}`);
      const feedDetail = await fetchFeedDetail.json();

      /* 2.가져온 데이터를 가지고 알맞은 상태변화를 시켜주세요. (4가지) */
      setPhotoUrl(feedDetail.photoUrl);
      setContent(feedDetail.content);
      setLocation(feedDetail.location);
      setTag(feedDetail.tag);
    } catch (e) {
      console.error(e);
    }
  }

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
    const createParams = {
      uid,
      photoUrl,
      content,
      location,
      tag,
      author,
    };

    try {
      /* 2. 피드를 생성하기 위한 api에 요청을 보내주세요. */
      const createResult = await fetch("/api/feed", {
        method: "POST",
        body: JSON.stringify(createParams),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const { message } = await createResult.json();

      /* 3.생성후, 메인 피드 화면으로 이동하게 해주세요. */
      router.push({
        pathname: "/feed",
        query: { message },
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function updateFeed() {
    /* 1. 피드를 업데이트 하기 위해, api에 전달해야하는 인자를 적어주세요 (5가지) */
    const updateParams = {
      content,
      location,
      tag,
      author,
      photoUrl,
    };

    try {
      /* 2. 피드의 업데이트를 위한 api에 요청을 보내주세요. */
      const updateResult = await fetch(`/api/feed/${feedUid}`, {
        method: "PATCH",
        body: JSON.stringify(updateParams),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const { message } = await updateResult.json();

      router.push({
        pathname: "/feed",
        query: { message },
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          {/*  PhotoPreview 컴포넌트를 추가하고, 알맞은 props를 전달해주세요. */}
          <PhotoPreview
            photoUrl={photoUrl}
            attachFile={attachFile}
            loading={loading}
          />
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
            <label htmlFor="content" className={classes.label}>
              문구입력
            </label>
          </Grid>
          <Grid item md={10} xs={12}>
            {/* 알맞은 value 값과 event를 적어주세요 */}
            <TextField
              id="content"
              multiline
              rows="4"
              placeholder="문구 입력..."
              variant="outlined"
              margin="dense"
              fullWidth
              autoFocus
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </Grid>
        </Grid>
        <CardActions>
          <SubmitButton />
        </CardActions>
      </form>
    </>
  );
};

export default UploadForm;
