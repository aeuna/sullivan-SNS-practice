import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(6, 0),
  },
}));

const myfeed = () => {
  const classes = useStyles();

  async function getUserInfo() {}

  return (
    <>
      {/* Profile 컴포넌트를 추가하세요. */}
      <Divider variant="middle" light className={classes.divider} />
      {/* PhotoGrid 컴포넌트를 추가하세요. */}
    </>
  );
};

export default myfeed;
