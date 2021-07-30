import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    padding: "20px 50px",
  },
}));

const PhotoGrid = (
  {
    /* 전달받은 props를 써주세요. */
  }
) => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3} className={classes.container}>
        {/* 삼항연산자를 사용해주세요. */}
        {/* 전달 받은 props 가 있으면, map함수를 이용하여 필요한 props 각 PhotoItem 컴포넌트로 넘겨주세요. */}
        {/* 전달 받은 props 가 없다면(null 이라면), 피드가 없습니다. 사진을 업로드 하세요. 등 알림 글이 나타나게 해주세요.  */}
      </Grid>
    </>
  );
};

export default PhotoGrid;
