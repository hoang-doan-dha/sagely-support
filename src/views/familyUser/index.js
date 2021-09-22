import { CircularProgress, List, ListItem, ListItemText, makeStyles, Avatar, ListItemAvatar, Paper, IconButton, InputBase, ListItemSecondaryAction, Badge } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFamilyUserListRequest } from './state/familyUserAction';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router';
import { parseIdFromHref } from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px'
  },
  list: {
    backgroundColor: 'white',
    borderRadius: '5px'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  badge: {
    padding: '3px',
    right: '25px'
  }
}));

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function FamilyUserView () {
  const classes = useStyles();
  const familyUserState = useSelector(state => state.familyUser);
  const { loading, data } = familyUserState;

  const [searchText, setSearchText] = useState('');

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFamilyUserListRequest());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFilteredData = function () {
    let results = [];
    if (data?.items) {
      const regex = new RegExp(searchText, 'i');
      for (let i = 0; i < data.items.length; i++) {
        const fullName = data.items[i].firstName + ' ' + data.items[i].lastName;
        if (regex.test(fullName)) {
          results.push(data.items[i]);
        }
      }
    }
    return results;
  };

  const navigateToDetail = function (item) {
    const familyUserId = parseIdFromHref(item._href);
    history.push(`/home/familyUsers/${familyUserId}`, item);
  };


  return (
    <div>
      {
        loading ?
        <CircularProgress/> :
        <div>
          <Paper className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search your family user"
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <IconButton type="button" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <List
            className={classes.list}
          >
            {
              getFilteredData().map((item) => (
                <ListItem button key={item._href} onClick={() => navigateToDetail(item)}>
                  <ListItemAvatar>
                    <Avatar {...stringAvatar(`${item.firstName} ${item.lastName}`)} />
                  </ListItemAvatar>
                  <ListItemText primary={`${item.firstName} ${item.lastName}`} />
                  <ListItemSecondaryAction>
                    <Badge badgeContent={item.verified ? "VERIFIED" : null} color="primary" className={classes.badge} />
                  </ListItemSecondaryAction>
                </ListItem>
                ))
            }
          </List>
        </div>
      }
    </div>
  )
};

export default FamilyUserView;