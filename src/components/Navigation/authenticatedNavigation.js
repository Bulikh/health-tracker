import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../../store/actions/Signup";

const useStyles = makeStyles(theme => ({
  toolbar: {
    backgroundColor: "#1976d2",
    justifyContent: "flex-end",
  },
  link: {
    color: "#000",
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
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };
  return (
    <nav>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <Link className={classes.link} to="/profile">
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Link>
              <Link className={classes.link} to="/weight">
                <MenuItem onClick={handleClose}>Weight</MenuItem>
              </Link>
              <Link className={classes.link} to="/meal">
                <MenuItem onClick={handleClose}>Meal</MenuItem>
              </Link>
              <Link className={classes.link} to="/activity">
                <MenuItem onClick={handleClose}>Activity</MenuItem>
              </Link>
              <Link className={classes.link} to="/dashboard">
                <MenuItem onClick={handleClose}>Dashboard</MenuItem>
              </Link>
              <Button onClick={logoutHandler}>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Button>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navigation;
