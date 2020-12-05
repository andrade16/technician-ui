import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import "./DashboardDrawer.scss";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItem>
    </div>
);



function DashboardDrawer(props) {

  return (
    <div className="root">
      <Drawer
        variant="permanent"
        classes={{ paper: !props.open ? "drawer-paper-close" : "drawer-paper" }}
        open={props.open}
      >
        <div className="toolbar-icon">
          <IconButton onClick={props.closeDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
    </div>
  );
}

export default DashboardDrawer;
