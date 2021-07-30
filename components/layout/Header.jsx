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
  const displayName = "설리번 선생님";

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
                <Typography variant="h6" noWrap>
                  {displayName} 님 반갑습니다
                </Typography>
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
