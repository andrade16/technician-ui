import React, {useState, useEffect} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationDialog from "../notification/NotificationDialog";
import "./DashboardAppBar.scss";


export function DashboardAppBar(props) {
  const [open, setOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [techCollisions, setTechCollisions] = useState([]);

  useEffect(() => {
    setTechCollisions(props.collisions);
    setNotificationCount(props.collisions.length ? 1 : 0);
  }, [props.collisions.length])

  const handleClick = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setNotificationCount(0)
    setTechCollisions([]);
    setOpen(false);
  }

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
            Technician Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleClick}>
            <Badge badgeContent={notificationCount} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <NotificationDialog open={open} nearbyList={techCollisions} onClose={handleClose}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default DashboardAppBar;
