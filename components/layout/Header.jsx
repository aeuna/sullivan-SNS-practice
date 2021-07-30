import { useState, useEffect } from "react";
import Link from "next/link";
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import NotificationMenu from "./NotificationMenu";

const useStyles = makeStyles(() => ({
  fix: {
    position: "fixed",
    top: 0,
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    cursor: "pointer",
  },
}));

const Header = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const fetchUserInfo = await fetch("/api/user");
      const userInfo = await fetchUserInfo.json();
      setUser(userInfo);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={classes.grow}>
      <AppBar className={classes.fix}>
        <Toolbar>
          <Link href="/">
            <Typography className={classes.title} variant="h6" noWrap>
              Sullivan-SNS
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div>
            <Link href="/edit">
              <IconButton aria-label="add feed" color="inherit">
                <AddCircleOutlineIcon />
              </IconButton>
            </Link>
            <Link href="/myfeed">
              <IconButton
                edge="end"
                aria-label="account of user"
                color="inherit"
              >
                <AccountCircle />
                {user && (
                  <Typography variant="h6" noWrap>
                    {user.displayName} 님 반갑습니다
                  </Typography>
                )}
              </IconButton>
            </Link>
            <NotificationMenu />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
