import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

import { withStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  noShow : {
    display : 'none',
  },
  show : {
    display : 'block',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);



export default function Header(props) {
  var data = props.loginData;
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function loadLoginForm(){
    location.href = "#login";
  }

  function logout(){
    location.href = "#logout";
  }

  function loadSigninForm(){
    location.href = "#signin";
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu" aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem className = {data ? classes.noShow : classes.show }>
          <ListItemText primary="로그인" onClick={loadLoginForm} />
        </StyledMenuItem>
        <StyledMenuItem className = {data ? classes.noShow : classes.show }>
          <ListItemText primary="회원가입" onClick={loadSigninForm}/>
        </StyledMenuItem>
        <StyledMenuItem className = {data ? classes.show : classes.noShow }>
          <ListItemText primary="로그아웃" onClick={logout}/>
        </StyledMenuItem>
      </StyledMenu>
      </div>
          <Typography variant="h6" className={classes.title}>
            자산 관리 프로그램
          </Typography>
          <span color="inherit">
            {data ? "The user is " + data : '사용자'}
          </span>
        </Toolbar>
      </AppBar>
    </div>
  );
}
