import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PageLoading from "../common/PageLoading";

const useStyles = makeStyles(() => ({
  container: {
    margin: "2rem 0",
    justifyContent: "center",
  },
  imgPreview: {
    width: "45rem",
  },
  initialPreview: {
    width: "35rem",
    height: "20rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  previewText: {
    fontSize: "3rem",
    "&:hover": {
      cursor: "pointer",
      filter: "brightness(120%)",
      transform: "scale(1.1)",
      transition: "all 0.2s ",
    },
  },
  fileBtn: {
    display: "none",
  },
}));

const PhotoPreview = ({ photoUrl, attachFile, loading }) => {
  const classes = useStyles();

  function handleAttachFile() {
    attachFile();
  }

  return (
    <Grid container className={classes.container}>
      {photoUrl ? (
        <img src={photoUrl} alt="미리보기" className={classes.imgPreview} />
      ) : (
        <Paper elevation={0} className={classes.initialPreview}>
          {loading ? (
            <PageLoading />
          ) : (
            <Typography
              variant="h2"
              component="div"
              align="center"
              color="primary"
              className={classes.previewText}
              onClick={handleAttachFile}
            >
              사진을 업로드 하세요.
            </Typography>
          )}
        </Paper>
      )}
    </Grid>
  );
};

export default PhotoPreview;
