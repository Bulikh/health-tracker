import React from "react";
import styled from "styled-components";
import { FormControl } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { login } from "../../store/actions/Signup";

const Form = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
`;

const useStyles = makeStyles(() => ({
  FormControl: { marginTop: "10px" },
}));

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { users } = useSelector(state => state);
  const classes = useStyles();
  const history = useHistory();
  const onSubmit = data => {
    const filteredUsers = users.filter(
      user => user.password === data.password && user.email === data.email
    );
    if (filteredUsers.length) {
      dispatch(login(data));
      history.push("/profile");
    } else {
      history.push("/signup");
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl className={classes.FormControl}>
        <InputLabel>E-mail</InputLabel>
        <Input
          type={"email"}
          name="email"
          inputRef={register({ required: true })}
        />
      </FormControl>

      <FormControl className={classes.FormControl}>
        <InputLabel>Password</InputLabel>
        <Input
          type={"password"}
          name="password"
          inputRef={register({ required: true })}
        />
      </FormControl>

      <Button type="submit">Log in</Button>
    </Form>
  );
};

export default Login;
