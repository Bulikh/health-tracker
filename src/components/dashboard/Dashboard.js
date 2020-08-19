import React from "react";
import { useSelector } from "react-redux";
import {
  makeStyles,
  Container,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
} from "@material-ui/core";

import { reducer } from "../../utils/reducer";

const useStyles = makeStyles({
  typography: {
    fontSize: "24px",
    textAlign: "center",
  },
  colorRed: {
    color: "red",
  },
  colorGreen: {
    color: "green",
  },
});

const Dashboard = () => {
  const { currUser } = useSelector(state => state);
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Typography variant="h1" className={classes.typography}>
        Dashboard
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Meals</TableCell>
              <TableCell>Activites</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(currUser.dailyData)
              .sort()
              .reverse()
              .map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row}
                    </TableCell>
                    {Object.keys(currUser.dailyData[row]).map(key => {
                      switch (key) {
                        case "weight":
                          return (
                            <TableCell
                              key={row + index + key}
                              className={
                                currUser.dailyData[row].weight &&
                                currUser.dailyData[row].weight >=
                                  currUser.weight
                                  ? classes.colorRed
                                  : classes.colorGreen
                              }
                            >
                              {currUser.dailyData[row].weight
                                ? currUser.dailyData[row].weight + " kg"
                                : null}
                            </TableCell>
                          );
                        case "meal":
                          return (
                            <TableCell
                              key={row + index + key}
                              className={
                                reducer(currUser.dailyData[row].meal) &&
                                reducer(currUser.dailyData[row].meal) >=
                                  currUser.meal
                                  ? classes.colorRed
                                  : classes.colorGreen
                              }
                            >
                              {reducer(currUser.dailyData[row].meal)
                                ? reducer(currUser.dailyData[row].meal) +
                                  " calories"
                                : null}
                            </TableCell>
                          );
                        case "activity":
                          return (
                            <TableCell
                              key={row + index + key}
                              className={
                                reducer(currUser.dailyData[row].activity) &&
                                reducer(currUser.dailyData[row].activity) <=
                                  currUser.activity
                                  ? classes.colorRed
                                  : classes.colorGreen
                              }
                            >
                              {reducer(currUser.dailyData[row].activity)
                                ? reducer(currUser.dailyData[row].activity) +
                                  " calories"
                                : null}
                            </TableCell>
                          );
                        default:
                          return <TableCell>{"test"}</TableCell>;
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;
