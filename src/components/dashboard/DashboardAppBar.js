import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import "./DashboardAppBar.scss";

export function DashboardAppBar(props) {
  return (
    <div className="root">
      <AppBar
        position="absolute"
        className={props.open ? "app-bar-shift" : "app-bar"}
      >
        <Toolbar className="toolbar">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={props.openDrawer}
            className={props.open ? "menu-button-hidden" : "menu-button"}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className="title"
          >
            Travel Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default DashboardAppBar;
