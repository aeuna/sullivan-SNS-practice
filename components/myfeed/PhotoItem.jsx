import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

const useStyles = makeStyles(() => ({
  imgContainer: {
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
  feedImg: {
    margin: "0 auto",
    height: "400px",
    width: "400px",
    display: "block",
    "&:hover": {
      cursor: "pointer",
      filter: "brightness(70%)",
    },
  },
}));

const PhotoItem = ({ feed }) => {
  const classes = useStyles();

  return (
    <>
      <Grid item md={4} sm={6} xs={12}>
        <div className={classes.imgContainer}>
          {/* 삼항연산자를 사용해주세요. */}
          {/* img태그 내, className 은 useStyles의 feedImg를 꼭 써주세요. */}
          {/* 전달받은 props를 이용하여 이미지 url이 있는 경우, img 태그를 써서 피드 이미지를 가져와 주세요. */}
          {/* 전달받은 props를 이용하여 이미지 url이 없는 경우 (글만 작성 한 경우), img 태그를 써서 피드를 쓴 사람의 프로필 이미지를 가져와 주세요. */}
          {/* 이미지를 누르면 피드의 상세페이지로 이동 할 수 있도록 해주세요. 구글에 검색해서 어떻게 구성하면 좋을 지 한번 찾아보세요. / */}
          <Link href={`/feed/${feed.uid}`}>
            {feed.photoUrl ? (
              <img
                src={feed.photoUrl}
                alt={feed.uid}
                className={classes.feedImg}
              />
            ) : (
              <img
                src="images/sullivan.png"
                alt={feed.uid}
                className={classes.feedImg}
              />
            )}
          </Link>
        </div>
      </Grid>
    </>
  );
};

export default PhotoItem;
