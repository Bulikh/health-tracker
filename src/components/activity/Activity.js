import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  MenuItem,
  makeStyles,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  Table,
  TableHead,
  Input,
  Button,
  Container,
  Typography,
} from "@material-ui/core";

import { addActivity } from "../../store/actions/Health";
import { calc } from "../../utils/calorieCalculator";
import { reducer } from "../../utils/reducer";
import EditForm from "../editForm/editForm";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    width: "100%",
    overflowX: "scroll",
  },
  tableCell: {
    padding: "5px",
  },
  colorRed: {
    color: "red",
  },
  colorGreen: {
    color: "green",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    marginTop: "20px",
  },
  typography: {
    fontSize: "26px",
    textAlign: "center",
  },
}));

const Activity = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const [activity, setActivity] = useState("hiking");
  const dispatch = useDispatch();
  const { currUser } = useSelector(state => state);
  const classes = useStyles();
  const handleChange = event => {
    setActivity(event.target.value);
  };
  const submitHandler = data => {
    // console.log(data);
    const { date, distance, activity } = data;
    const newData = {
      date,
      activity,
      calories: calc(activity, distance),
    };
    // console.log(newData);
    dispatch(addActivity(newData));
    reset();
  };

  return (
    <Container maxWidth="md">
      <Typography className={classes.typography} variant="h1">
        Activity
      </Typography>
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Input
          inputRef={register({ required: true })}
          type="date"
          name="date"
          defaultValue={new Date()}
        />
        <Controller
          as={
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChange}
              name="activity"
            >
              <MenuItem value="hiking">Hiking</MenuItem>
              <MenuItem value="running">Running</MenuItem>
              <MenuItem value="swimming">Swimming</MenuItem>
            </Select>
          }
          name="activity"
          control={control}
          rules={{ required: true }}
          defaultValue={activity}
        />
        <Input
          inputRef={register({ required: true })}
          type="number"
          placeholder="Distance"
          name="distance"
        />
        <Button type="submit">Add activity</Button>
      </form>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>Date</TableCell>
              <TableCell className={classes.tableCell} align="right">
                Food & Calories
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(currUser.dailyData)
              .sort()
              .reverse()
              .map((row, index) => {
                const res = currUser.dailyData[row].activity
                  ? reducer(currUser.dailyData[row].activity)
                  : null;
                return (
                  <TableRow key={index}>
                    <TableCell
                      className={[
                        classes.tableCell,
                        res >= currUser.activity
                          ? classes.colorGreen
                          : classes.colorRed,
                      ].join(" ")}
                      component="th"
                      scope="row"
                    >
                      {row}
                    </TableCell>
                    {currUser.dailyData[row].activity
                      ? currUser.dailyData[row].activity.map(
                          (activity, index) => (
                            <TableCell
                              className={[
                                classes.tableCell,
                                res >= currUser.activity
                                  ? classes.colorGreen
                                  : classes.colorRed,
                              ].join(" ")}
                              key={index}
                              align="right"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                              }}
                            >
                              {activity.activity + ": " + activity.calories}
                              <EditForm
                                date={row}
                                unit={{
                                  name: activity.activity,
                                  calories: activity.calories,
                                }}
                                name="activity"
                              />
                            </TableCell>
                          )
                        )
                      : null}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Activity;
