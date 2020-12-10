import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {getTimeFromEpoch} from "../../utils/utils";

function NotificationDialog(props) {
  const { open, nearbyList, onClose } = props;


  let dialogContent;
  if (nearbyList.length === 0) {
    dialogContent = <ListItem>{"No New Notifications"}</ListItem>;
  } else {
    dialogContent = nearbyList.map((obj, index) => {
      return (
          <ListItem key={index} divider>
              <ListItemText
                  primary={`${obj.name} is nearby ${obj.nearby}`}
                  secondary={`${getTimeFromEpoch(obj.time)}`}
              />
          </ListItem>
      );
    });
  }
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Notification Center</DialogTitle>
      <DialogContent dividers>
        <List>{dialogContent}</List>
      </DialogContent>
    </Dialog>
  );
}

export default NotificationDialog;
