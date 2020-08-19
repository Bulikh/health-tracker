import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Paper,
  Input,
  Button,
  Container,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { addMeal } from "../../store/actions/Health";
import { reducer } from "../../utils/reducer";
import EditForm from "../editForm/editForm";

const useStyles = makeStyles({
  table: {
    width: "100%",
    overflowX: "scroll",
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
});
const Meal = () => {
  const { register, handleSubmit, reset } = useForm();
  const { currUser } = useSelector(state => state);
  const classes = useStyles();
  const dispatch = useDispatch();
  const submitHandler = data => {
    console.log(data);
    dispatch(addMeal(data));
    reset();
  };
  return (
    <Container maxWidth="md">
      <Typography className={classes.typography} variant="h1">
        Meals
      </Typography>
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Input
          inputRef={register({ required: true })}
          type="date"
          name="date"
          defaultValue={new Date()}
        />
        <Input
          inputRef={register({ required: true })}
          type="text"
          name="meal"
          placeholder="food name"
        />
        <Input
          inputRef={register({ required: true })}
          type="text"
          placeholder="calories"
          name="calories"
        />
        <Button type="submit">Add meal</Button>
      </form>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Food & Calories</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(currUser.dailyData)
              .sort()
              .reverse()
              .map((row, index) => {
                const res = currUser.dailyData[row].meal
                  ? reducer(currUser.dailyData[row].meal)
                  : null;
                return (
                  <TableRow key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      className={
                        res > currUser.meal
                          ? classes.colorRed
                          : classes.colorGreen
                      }
                    >
                      {row}
                    </TableCell>
                    {currUser.dailyData[row].meal
                      ? currUser.dailyData[row].meal.map((meal, index) => (
                          <TableCell
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "row",
                            }}
                            key={index}
                            align="right"
                            className={
                              res > currUser.meal
                                ? classes.colorRed
                                : classes.colorGreen
                            }
                          >
                            {meal.meal + ": " + meal.calories}
                            <EditForm
                              date={row}
                              unit={{
                                name: meal.meal,
                                calories: meal.calories,
                              }}
                              name="meal"
                            />
                          </TableCell>
                        ))
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

export default Meal;
