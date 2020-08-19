import React from "react";
import { useSelector } from "react-redux";
import {
  makeStyles,
  Typography,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  typography: {
    fontSize: "26px",
    textAlign: "center",
  },
  typographyH2: {
    fontSize: "20px",
    marginBottom: "5px",
  },
}));
const Profile = () => {
  const { currUser } = useSelector(state => state);
  const classes = useStyles();
  // console.log(currUser);
  return (
    <div style={{ marginBottom: "80px" }}>
      <Typography className={classes.typography} variant="h1">
        Profile
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {Object.keys(currUser).map(key =>
              key === "dailyData" ? null : (
                <TableRow key={key}>
                  <TableCell>
                    <Typography variant="h2" className={classes.typographyH2}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Typography>
                    {currUser[key]}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Profile;
