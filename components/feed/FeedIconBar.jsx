import React, { useEffect, useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import {
  CardActions,
  IconButton,
  Typography,
  Tooltip,
} from "@material-ui/core";

const FeedIconBar = ({
  feed,
  user,
  type,
  handleExpandComment,
  commentExpanded,
  likeFeeds,
  setLikeFeeds,
}) => {
  const [likeBtn, setLikeBtn] = useState({
    clicked: false,
    displayNum: feed.like,
  });
  let likeFeedList = [];
  if (type === "main") {
    likeFeedList = [...likeFeeds];
  } else {
    likeFeedList = [...user.likeFeeds];
  }

  useEffect(() => {
    if (user.likeFeeds && user.likeFeeds.includes(feed.uid)) {
      setLikeBtn({
        clicked: true,
        displayNum: feed.like,
      });
    }
  }, []);

  async function handleHeartClick() {
    try {
      // 피드 좋아요 수 업데이트
      let likeNum;
      if (likeBtn.clicked) {
        likeNum = feed.like -= 1;
      } else {
        likeNum = feed.like += 1;
      }
      await fetch(`/api/feed/${feed.uid}`, {
        method: "PATCH",
        body: JSON.stringify({ like: likeNum }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      // 사용자가 좋아요 한 피드 목록 업데이트
      let newUserLikeFeeds = [];
      if (likeBtn.clicked) {
        newUserLikeFeeds = likeFeedList.filter((feedId) => feedId !== feed.uid);
      } else {
        newUserLikeFeeds = [...likeFeedList, feed.uid];
      }
      await fetch(`/api/user`, {
        method: "PATCH",
        body: JSON.stringify({ likeFeeds: newUserLikeFeeds }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      setLikeBtn({
        clicked: !likeBtn.clicked,
        displayNum: likeNum,
      });
      if (type === "main") {
        setLikeFeeds(newUserLikeFeeds);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites" onClick={handleHeartClick}>
        {likeBtn.clicked ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
      </IconButton>
      <Typography>
        {likeBtn.displayNum <= 0 || !likeBtn.displayNum
          ? 0
          : likeBtn.displayNum}
      </Typography>
      {type === "main" && (
        <IconButton
          aria-label="comment"
          onClick={handleExpandComment}
          aria-expanded={commentExpanded}
        >
          <ChatIcon />
        </IconButton>
      )}
      <Tooltip title={feed.tag || "태그 없음"} placement="top" arrow>
        <IconButton aria-label="tag" className>
          <LocalOfferIcon />
        </IconButton>
      </Tooltip>
    </CardActions>
  );
};

export default FeedIconBar;
