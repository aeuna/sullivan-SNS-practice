import React, { useState } from "react";
import { Badge, Menu, MenuItem, IconButton } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        aria-controls="primary-account-menu"
        aria-label="show new notifications"
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenuOpen}
      >
        <Badge badgeContent={3} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="primary-account-menu"
        open={isMenuOpen}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>알림 1</MenuItem>
        <MenuItem onClick={handleMenuClose}>알림 2</MenuItem>
        <MenuItem onClick={handleMenuClose}>알림 3</MenuItem>
      </Menu>
    </>
  );
};

export default NotificationMenu;
