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

  async function handleHeartClick() {}

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
