import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  feed: {
    textAlign: "center",
    height: "100%",
  },
}));

const detail = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid item xs={8} className={classes.feed}>
        {/* DetailFeed 컴포넌트를 추가하세요. */}
      </Grid>
      <Grid item xs={4}>
        {/* Comment 컴포넌트를 추가하세요. */}
      </Grid>
    </Grid>
  );
};

export default detail;
