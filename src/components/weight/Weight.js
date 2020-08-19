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

import { addWeight } from "../../store/actions/Health";
import EditForm from "../editForm/editForm";
const useStyles = makeStyles({
  table: {
    width: "100%",
    overflowX: "scroll",
  },
  typography: {
    fontSize: "26px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    marginTop: "20px",
  },
});

const Weight = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { currUser } = useSelector(state => state);
  const classes = useStyles();

  const submitHandler = data => {
    console.log(data);
    dispatch(addWeight(data));
    reset();
  };

  return (
    <Container maxWidth="md">
      <Typography className={classes.typography} variant="h1">
        Weight
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
          placeholder="weight"
          name="weight"
        />
        <Button type="submit">Add weight</Button>
      </form>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Weight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(currUser.dailyData)
              .sort()
              .reverse()
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row}
                  </TableCell>
                  <TableCell
                    style={{
                      color:
                        +currUser.dailyData[row].weight > +currUser.weight
                          ? "red"
                          : "green",
                      display: "flex",
                      alignItems: "center",
                    }}
                    align="right"
                  >
                    {currUser.dailyData[row].weight}
                    <EditForm
                      date={row}
                      unit={currUser.dailyData[row].weight}
                      name="weight"
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Weight;
