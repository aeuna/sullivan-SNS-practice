import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  imgContainer: {
    overflow: "hidden",
    width: "400px",
    height: "400px",
  },
  feedImg: {
    padding: theme.spacing(1),
    maxWidth: "100%",
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
        <div className={classes.imgContainer}>{/* 이미지를 추가하세요. */}</div>
      </Grid>
    </>
  );
};

export default PhotoItem;
