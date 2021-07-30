import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "../common/Avatar";
import ProfileUpdatePopup from "../myfeed/ProfileUpdatePopup";

const useStyles = makeStyles(() => ({
  profile: {
    paddingTop: "3rem",
  },
}));

const Profile = ({ user, feedList, getUserInfo }) => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.profile}
        spacing={4}
      >
        <Grid item>
          <Avatar
            size={2}
            displayName={user.displayName}
            photoUrl={user.photoUrl}
          />
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h6" component="h2" paragraph>
                {user.displayName}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing={2}>
                <Grid item>
                  <Typography variant="body1" component="h2" paragraph>
                    게시물 {feedList.length}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" component="h2" paragraph>
                    좋아하는 피드 수{" "}
                    {user.likeFeeds ? user.likeFeeds.length : 0}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="caption" component="h2">
                {user.caption}
              </Typography>
              <Typography
                variant="subtitle2"
                color="primary"
                component="h2"
                gutterBottom
              >
                <a href={user.webpage} target="_blank">
                  {user.webpage}
                </a>
              </Typography>
            </Grid>
            <ProfileUpdatePopup user={user} getUserInfo={getUserInfo} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
