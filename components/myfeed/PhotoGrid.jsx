import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("lg")]: {
      padding: theme.spacing(0, 30),
    },
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 2),
    },
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
}));

const PhotoGrid = ({ feedList }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3} className={classes.container}>
        {/* photoItem을 추가하세요. */}
      </Grid>
    </>
  );
};

export default PhotoGrid;
