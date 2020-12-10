import React from "react";
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
import PersonIcon from "@material-ui/icons/Person";
import { getTimeFromEpoch } from "../../utils/utils";
import "./DashboardDrawer.scss";

export const mainListItems = (
  <div>
    <ListItem>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
  </div>
);

function DashboardDrawer(props) {
  const { data } = props;

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
        <List>
            <ListSubheader inset>Technicians</ListSubheader>
            <div>
            {data.features &&
              data.features.map((tech, index) => (
                <ListItem
                    title={tech.properties.name}
                    button
                    data-index={index}
                    key={index}
                    className="tech-list-item"
                    divider={true}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Name: ${tech.properties.name}`}
                    secondary={`Last seen: ${getTimeFromEpoch(
                      tech.properties.tsecs
                    )}`}
                  />
                </ListItem>
              ))}
          </div>
        </List>
      </Drawer>
    </div>
  );
}

export default DashboardDrawer;
