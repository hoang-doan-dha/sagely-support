import { Button, CircularProgress, Container, Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
// import { updateFamilyUserRequest } from './state/familyUserDetailAction';
import jwt from 'jsonwebtoken';
import { activateFamilyUserRequest, clearActivatedFamilyUser } from './state/familyUserDetailAction';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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
    padding: '5px 10px'
  },
  typography: {
    padding: '10px 15px',
    backgroundColor: 'lightgreen'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center'
  },
}));

function FamilyUserDetailView(props) {
  const classes = useStyles();
  const { familyUserId } = useParams();
  const familyUserDetailState = useSelector(state => state.familyUserDetail);
  const { loading, isActivated } = familyUserDetailState;

  let selectedFamilyUser = props.location.state;

  const [password, setPassword] = useState('');

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isActivated) {
      handleOpen();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActivated]);

  useEffect(() => {
    // just for destroy
    return () => {
      dispatch(clearActivatedFamilyUser());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


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
          {loading && <CircularProgress size={24}/>}
          <span className={classes.span}>
            {selectedFamilyUser.verified || isActivated ? "ACTIVATED" : "ACTIVATE"}
          </span>
        </Button>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Activate successfully</h2>
          <p id="simple-modal-description">
            Email: {selectedFamilyUser.email}
          </p>
          <p>
            Password: {password}
          </p>
        </div>
      </Modal>
    </Container>
  )
}

export default FamilyUserDetailView;