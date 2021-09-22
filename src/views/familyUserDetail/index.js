import { Button, Container, Popover, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
// import { updateFamilyUserRequest } from './state/familyUserDetailAction';
import jwt from 'jsonwebtoken';
import { activateFamilyUserRequest } from './state/familyUserDetailAction';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '5px'
  },
  button: {
    marginTop: '10px'
  },
  span: {
    padding: '5px'
  },
  typography: {
    padding: '10px 15px',
    backgroundColor: 'lightgreen'
  },
}));

function FamilyUserDetailView(props) {
  const classes = useStyles();
  const { familyUserId } = useParams();
  const familyUserDetailState = useSelector(state => state.familyUserDetail);
  const { loading, isActivated } = familyUserDetailState;

  let selectedFamilyUser = props.location.state;

  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleSubmit = function (e) {
    e.preventDefault();
    // selectedFamilyUser.active = true;
    // dispatch(updateFamilyUserRequest(selectedFamilyUser));

    const secretKey = "9xYjQCNGnMIHUA+I7dWL/V80ZVrpZJtWzQyKVl3jfckLhgfoYfp8RjooW7UQpqhwyf8u7dL3NnzTwYE4oXBbHg==";
    const token = jwt.sign(
      { familyUserId },
      new Buffer(secretKey, 'base64')
    );
    dispatch(activateFamilyUserRequest({
      cli: 'true',
      password,
      token
    }));
  };

  return (
    <Container className={classes.container}>
      <div>Family user id {familyUserId}</div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="firstName"
          label="First Name"
          color="primary"
          defaultValue={selectedFamilyUser.firstName}
          disabled
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="lastName"
          label="Last Name"
          color="primary"
          defaultValue={selectedFamilyUser.lastName}
          disabled
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="email"
          label="Email"
          color="primary"
          defaultValue={selectedFamilyUser.email}
          disabled
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          color="primary"
          fullWidth
          margin="normal"
          variant="outlined"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={loading || selectedFamilyUser.verified || isActivated}
        >
          <span className={classes.span}>
            {selectedFamilyUser.verified || isActivated ? "ACTIVATED" : "ACTIVATE"}
          </span>
        </Button>
      </form>
      <Popover
        id={id}
        open={isActivated}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>Activate successfully</Typography>
      </Popover>
    </Container>
  )
}

export default FamilyUserDetailView;