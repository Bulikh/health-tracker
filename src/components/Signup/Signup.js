import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  FormControl,
  makeStyles,
  Button,
  Input,
  InputLabel,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { signup } from "../../store/actions/Signup";

const Form = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
`;

const useStyles = makeStyles(() => ({
  FormControl: { marginTop: "10px" },
}));

const Signup = () => {
  const [exist, setExist] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const { users } = useSelector(state => state);
  const onSubmit = data => {
    const filteredEmails = users.filter(user => user.email === data.email);
    if (filteredEmails.length) {
      setExist(true);
    } else {
      dispatch(signup(data));
      history.push("/profile");
    }
  };
  const classes = useStyles();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {exist && <h2>User exists</h2>}
      <FormControl className={classes.FormControl}>
        <InputLabel>Username</InputLabel>
        <Input autoComplete="off" type={"text"} inputRef={register} name={"name"} />
      </FormControl>
      <FormControl className={classes.FormControl}>
        <InputLabel>E-mail</InputLabel>
        <Input autoComplete="off" type={"email"} inputRef={register} name={"email"} />
      </FormControl>
      <FormControl className={classes.FormControl}>
        <InputLabel>Password</InputLabel>
        <Input autoComplete="off" type={"password"} inputRef={register} name={"password"} />
      </FormControl>
      <FormControl className={classes.FormControl}>
        <InputLabel>Desired weight</InputLabel>
        <Input autoComplete="off" type={"number"} inputRef={register} name={"weight"} />
      </FormControl>
      <FormControl className={classes.FormControl}>
        <InputLabel>Desired meal calories per day</InputLabel>
        <Input autoComplete="off" type={"number"} inputRef={register} name={"meal"} />
      </FormControl>
      <FormControl className={classes.FormControl}>
        <InputLabel>Desired activity  calories per day</InputLabel>
        <Input autoComplete="off" type={"number"} inputRef={register} name={"activity"} />
      </FormControl>
      {/* <FormControl className={classes.FormControl}>
        <InputLabel>Re-enter password</InputLabel>
        <Input type={"password"} />
      </FormControl> */}
      <Button type="submit">Create Account</Button>
    </Form>
  );
};

export default Signup;
