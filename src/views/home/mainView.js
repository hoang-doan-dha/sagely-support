import React, { Fragment } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  cardActions: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

function MainView() {
  const classes = useStyles();
  const history = useHistory();

  const handleActivate = () => {
    history.push('/home/familyUsers');
  };

  return (
    <Fragment>
      <Card>
        <CardContent>
          <Typography variant="h5">
            Family User
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button 
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleActivate}
          >
            ACTIVATE
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  )
};

export default MainView;