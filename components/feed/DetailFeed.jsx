import {
  CardHeader,
  CardMedia,
  CardContent,
  Card,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "../common/Avatar";
import PopperMenu from "./PopperMenu";
import FeedIconBar from "./FeedIconBar";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
  },
  feed: {
    width: "100%",
  },
  header: {
    margin: "1rem 0",
    height: "55px",
    textAlign: "left",
  },
  media: {
    maxHeight: "600px",
    width: "100%",
    overflow: "auto",
  },
  mediaImg: {
    height: "auto",
    width: "100%",
    display: "block",
  },
  content: {
    textAlign: "left",
  },
}));

const DetailFeed = (
  {
    /* 알맞은 props를 전달해주세요. */
  }
) => {
  const classes = useStyles();

  let t = new Date(1970, 0, 1);
  t.setSeconds(feed.create_at.seconds);
  const createAT =
    t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate();

  return (
    <div className={classes.root}>
      <Card className={classes.feed}>
        {/* 알맞은 props를 전달해주세요. */}
        <CardHeader
          className={classes.header}
          avatar={
            <Avatar
              size={1}
              photoUrl={feed.author.photoUrl}
              displayName={feed.author.displayName}
            />
          }
          action={
            <PopperMenu deleteHandler={/* 채워주세요. */} feedUid={/* 채워주세요. */} />
          }
          title={feed.author.displayName}
          subheader={createAT + " " + feed.location}
        />
        {feed.photoUrl && (
          <CardMedia className={classes.media}>
            <img
              src={feed.photoUrl}
              alt={feed.content}
              className={classes.mediaImg}
            />
          </CardMedia>
        )}
        <CardContent className={classes.content}>
          <Typography variant="body1" component="p">
            {feed.content}
          </Typography>
        </CardContent>
        <FeedIconBar feed={feed} user={user} />
      </Card>
    </div>
  );
};

export default DetailFeed;
