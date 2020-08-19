import React from "react";
import { Link, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles(theme => ({
  toolbar: {
    backgroundColor: "#1976d2",
    justifyContent: "flex-end",
  },
  link: {
    color: "#fff",
    margin: "0 10px",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  icon: {
    color: "#fff",
  },
  iconContainer: {
    minWidth: "35px",
  },
}));

const Navigation = () => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <nav>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          {location.pathname === "/login" ? (
            <Link className={classes.link} to="/signup">
              <ListItem>
                <ListItemText primary={"Signup"} />
              </ListItem>
            </Link>
          ) : (
            <Link className={classes.link} to="/login">
              <ListItem>
                <ListItemText primary={"Login"} />
              </ListItem>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navigation;
