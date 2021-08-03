import React, { useState } from "react";
import Link from "next/link";
import {
  CardHeader,
  CardMedia,
  CardContent,
  Card,
  Collapse,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Avatar from "../common/Avatar";
import Comment from "./Comment";
import FeedIconBar from "./FeedIconBar";

const useStyles = makeStyles(() => ({
  feed: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    marginTop: "55px",
    width: "800px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  detailBtn: {
    cursor: "pointer",
  },
}));

const Feed = ({ feed, user, likeFeeds, setLikeFeeds }) => {
  const classes = useStyles();

  const [commentExpanded, setCommentExpanded] = useState(false);

  function handleExpandComment() {
    setCommentExpanded(!commentExpanded);
  }

  let t = new Date(1970, 0, 1);
  t.setSeconds(feed.create_at.seconds);
  const createAT =
    t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate();

  return (
    <div className={classes.feed}>
      <Card className={classes.root}>
        {/* 1. 알맞은 props를 CardHeader에 전달해주세요. */}
        {/*  - avatar는 Avatar 컴포넌트를 이용하여 size, photoUrl을 전달해주세요. */}
        {/*  - title은 피드를 쓴 사람의 이름을 전달해주세요. */}
        {/*  - subheader는 생성날짜와 지역을 합친 string을 전달해주세요. */}
        <CardHeader
          avatar={/* 채워주세요 */}
          title={/* 채워주세요 */}
          subheader={/* 채워주세요 */}
        />
        {/* 2. 피드의 이미지가 있다면 CradMedia가 보이도록 해주세요. (아래의 코드에 추가) */}
        {/* - CradMedia의 image로 피드의 이미지를 전달해주세요. */}
        <CardMedia className={classes.media} image={/* 채워주세요 */} />
        <CardContent>
          <Typography variant="body1" component="p">
            {/* 3. 피드의 글을 보여주세요. (아래의 코드에 추가) */}
            {/* 도전!! 피드의 글의 길이가 180자를 넘는다면 179자까지 나타나고 그 뒤는 ... 처리를 해주세요. */}
            {/* 채워주세요 */}
          </Typography>
          {/* 4. 더보기를 누르면, 피드의 디테일 화면으로 이동할수있게 해주세요. */}
          <Link href={/* 채워주세요 */}>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.detailBtn}
            >
              더보기
            </Typography>
          </Link>
        </CardContent>
        <FeedIconBar
          feed={feed}
          user={user}
          commentExpanded={commentExpanded}
          handleExpandComment={handleExpandComment}
          likeFeeds={likeFeeds}
          type={"main"}
        />
        <Collapse in={commentExpanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Comment user={user} feedType={"main"} />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default Feed;
