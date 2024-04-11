  
import React, { Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import getConnect from '../Common/connect';
import { Copyright } from '../Common';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Person, Timeline, Receipt, Shop, BarChart, Adjust, AddToPhotos, Settings } from '@material-ui/icons';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import access from '../../config/access';
import { Link } from 'react-router-dom';
import { getRouteName } from '../../config/helper';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import { useNavigate } from 'react-router-dom';
import store from '../../config/store';
import { decode } from 'jsonwebtoken'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: '#FAFAFA'
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));


  

const menuItems = [
  {
    link: '/users',
    name: 'Users',
    icon: <Person />
  },
  // {
  //   link: '/projects',
  //   name: 'Projects',
  //   icon: <Shop />
  // },
  // {
  //   link: '/timesheet',
  //   name: 'Timesheet',
  //   icon: <Timeline />
  // },
  // {
  //   link: '/reports',
  //   name: 'Reports',
  //   icon: <Receipt />
  // },
  {
    link: '/proposals',
    name: 'Proposals',
    icon: <LocalOfferIcon />
  },
  // {
  //   link: '/Skills',
  //   name: 'Skills',
  //   icon: <LocalLibraryIcon />
  // },
  // {
  //   link: '/bidProfiles',
  //   name: 'Bid Profiles',
  //   icon: <AccountCircleIcon />
  // },
  // {
  //   link: '/bidStatus',
  //   name: 'Bid Status',
  //   icon: <Adjust />
  // },
  // {
  //   link: '/clients',
  //   name: 'Bid Client',
  //   icon: <AddToPhotos />
  // },

  {
    link: '/stats',
    name: 'Statistics',
    icon: <BarChart />
  }
]


const submenuItems = [
  
  {
    link: '/Skills',
    name: 'Skills',
    icon: <LocalLibraryIcon />
  },
  {
    link: '/bidStatus',
    name: 'Bid Status',
    icon: <Adjust />
  },
  {
    link: '/clients',
    name: 'Bid Client',
    icon: <AddToPhotos />
  }
]

const { AppReducer: { token: authToken } } = store.getState();
const token = authToken || localStorage.getItem('authToken');
const roles = [];

if (token) {
  const { user: { userGroup } } = decode(token);
  if (userGroup) {
    roles.push(userGroup);
  }
}


if (roles.includes('BD MANAGER') && roles.includes('ADMIN')) {
  submenuItems.splice(1, 0, {
    link: '/bidProfiles',
    name: 'Bid Profiles',
    icon: <AccountCircleIcon />
  });
}



function Dashboard({ isLoggedIn, logout, children }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [submenuopen, setsubmenuOpen] = React.useState(false);
  const handleClick = () => {
    setsubmenuOpen(!submenuopen);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const exit = () => {
      logout();
      navigate("/");
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
        {isLoggedIn ? <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton> : null}
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Bids Management
          </Typography>
          {isLoggedIn ? <IconButton color="inherit" onClick={exit}>
              <ExitToAppIcon />
          </IconButton> : null}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {isLoggedIn ? <List>
          {menuItems.map((item, id) => <Fragment key={id}>{access('read', getRouteName(item.link)) &&
          <Link to={item.link}>
          <ListItem button key={item.link}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
          </Link>}</Fragment>)}

          
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
            <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
            {submenuopen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            {submenuItems.map((item, id) => <div>
              <Link to={item.link}>
            <Collapse key={item.link}in={submenuopen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              {item.icon}
             </ListItemIcon> 
            <ListItemText primary={item.name} />
          </ListItem>
          </List>
      </Collapse></Link>
      </div>)}
        </List> : null}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
export default getConnect(Dashboard);
