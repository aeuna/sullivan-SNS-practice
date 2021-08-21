import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  IconButton,
  Grow,
  ClickAwayListener,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  deleteText: {
    color: theme.palette.error.main,
  },
}));

const PopperMenu = ({ deleteHandler, feedUid }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  function openSettingMenu() {
    setOpen((prevOpen) => !prevOpen);
  }

  function closeSettingMenu(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  }

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  function handleDelete() {
    deleteHandler();
  }

  return (
    <>
      <IconButton
        aria-label="settings"
        aria-haspopup="true"
        onClick={openSettingMenu}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
      >
        <MoreVertIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={closeSettingMenu}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <Link
                    href={{
                      pathname: "/edit",
                      query: { feedUid },
                    }}
                  >
                    <MenuItem>수정</MenuItem>
                  </Link>
                  <MenuItem
                    className={classes.deleteText}
                    onClick={handleDelete}
                  >
                    삭제
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default PopperMenu;
