import React, { useState } from "react";
import { Input, Button, FormControl, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { edit } from "../../store/actions/Health";

const Form = styled.form`
  width: unset;
  display: flex;
`;

const useStyles = makeStyles({
  formControl: {
    display: "flex",
    flexDirection: "row",
  },
});

const EditForm = ({ date, unit, name }) => {
  const [editable, showEditable] = useState(false);
  const [editUnit, setEditUnit] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const editHandler = e => {
    e.preventDefault();
    if (!editUnit.length) {
      return;
    }
    dispatch(edit(date, name, unit, editUnit));
    setEditUnit("");
    showEditable(false);
  };

  return (
    <Form onSubmit={editHandler}>
      {editable && (
        <FormControl className={classes.formControl}>
          <Input
            onChange={e => setEditUnit(e.target.value)}
            type="text"
            placeholder="enter unit"
          />
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </FormControl>
      )}
      <Button onClick={() => showEditable(prev => !prev)}>
        {editable ? "Close" : "Edit"}
      </Button>
    </Form>
  );
};

export default EditForm;
