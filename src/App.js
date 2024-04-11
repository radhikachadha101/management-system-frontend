import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { MuiThemeProvider,createTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import appStore from './config/store';
import Login from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Home from './components/Common/Home';
import Graph from './components/bidsgraph/bidsgraph';
import Projects from './components/Project/Projects';
import EditProject from './components/Project/EditProject';
import Proposal from './components/Bidding/Proposal'; 
import CreateProposal from './components/Bidding/CreateProposal';
import EditProposal from './components/Bidding/EditProposal';
import PropsalSummary from './components/Bidding/PropsalSummary';
import Skills from './components/Bidding/Skills';
import Clients from './components/Bidding/Client';
import BidProfile from './components/Bidding/BidProfile';
import BidStatus from './components/Bidding/Status';  
import CreateProject from './components/Project/CreateProject';
import Users from './components/User/Users';
import TimeSheet from './components/Timesheet'
import Reports from './components/Reports'
import CreateUser from './components/User/CreateUser';
import editUser from './components/User/EditUser';
import Drawer from './components/Layouts/Drawer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { orange } from '@material-ui/core/colors';

import ProtectedRoute from './components/Auth/protectedRoute';
const theme = createTheme({
  status: {
    danger: orange[500],
  },
});
function App() {
  // const ProtectedRoutes = () => (
  //   <React.Fragment>
  //     <ProtectedRoute action='write' path="/projects/create" exact component={CreateProject} />
  //           <ProtectedRoute action='write' path="/project/edit" exact component={EditProject} />
  //           <ProtectedRoute path="/projects" exact component={Projects} />
  //           <ProtectedRoute action='write' path="/users/create" exact component={CreateUser} />
  //           <ProtectedRoute action='write' path="/users/edit" exact component={editUser} />
  //           <ProtectedRoute path="/users" exact component={Users} />
  //           <ProtectedRoute path="/timesheet" exact component={TimeSheet} />
  //           <ProtectedRoute path="/reports" exact component={Reports} />
  //           <ProtectedRoute path="/proposals" exact component={Proposal} />
  //           <ProtectedRoute path="/proposal/create" exact component={CreateProposal} />
  //           <ProtectedRoute action='write' path="/proposal/edit" exact component={EditProposal} />
  //           <ProtectedRoute action='write' path="/proposal/Summary" exact component={PropsalSummary} />
  //           <ProtectedRoute action='write' path="/skills"  exact component={Skills} />
  //           <ProtectedRoute action='write' path="/clients"  exact component={Clients} />
  //           <ProtectedRoute action='write' path="/bidProfiles"  exact component={BidProfile} />
  //           <ProtectedRoute action='write' path="/bidStatus" exact component={BidStatus} />

  //   </React.Fragment>
  // );
  return (
    <Provider store={appStore}>
       <MuiThemeProvider theme={theme}>
         <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router>
        <Drawer>
          <ToastContainer/>
          <Routes >
            <Route path="/" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/home" exact element={<Home />} />
            <Route action='write' path="/projects/create" element={<ProtectedRoute action='write' path="/projects/create" exact component={CreateProject} />} />
            <Route action='write' path="/project/edit" element={<ProtectedRoute action='write' path="/project/edit" exact component={EditProject} />} />
            <Route path="/projects" element={<ProtectedRoute path="/projects" component={Projects} />} />
            <Route action='write' path="/users/create" element={<ProtectedRoute action='write' path="/users/create" exact component={CreateUser} />} />
            <Route action='write' path="/users/edit" element={<ProtectedRoute action='write' path="/users/edit" exact component={editUser} />} />
            <Route path="/users" element={<ProtectedRoute path="/users" component={Users} />} />
            <Route path="/timesheet" element={<ProtectedRoute path="/timesheet" component={TimeSheet} />} />
            <Route path="/reports" element={<ProtectedRoute path="/reports" component={Reports} />} />
            <Route path="/proposals" element={<ProtectedRoute path="/proposals" component={Proposal} />} />
            <Route path="/proposal/create" element={<ProtectedRoute path="/proposal/create" component={CreateProposal} />} />
            <Route action='write' path="/proposal/edit" element={<ProtectedRoute action='write' path="/proposal/edit" exact component={EditProposal} />} />
            <Route action='write' path="/proposal/Summary" element={<ProtectedRoute action='write' path="/proposal/Summary" exact component={PropsalSummary} />} />
            <Route action='write' path="/skills"  element={<ProtectedRoute action='write' path="/skills"  component={Skills} />} />
            <Route action='write' path="/clients"  element={<ProtectedRoute action='write' path="/clients" component={Clients} />} />
            <Route action='write' path="/bidProfiles"  element={<ProtectedRoute action='write' path="/bidProfiles" component={BidProfile} />} />
            <Route action='write' path="/bidStatus" element={<ProtectedRoute action='write' path="/bidStatus" component={BidStatus} />} />
            <Route path="/stats"  action='read' element={<ProtectedRoute path="/stats"  action='read' exact component={Graph} />} />
          </Routes >
        </Drawer>
        </Router>
         </MuiPickersUtilsProvider>
       </MuiThemeProvider>
    </Provider>
  );
}

export default App;
 