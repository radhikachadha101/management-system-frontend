
import React, { Component, useEffect, useState, useCallback } from 'react';
import getConnect from '../Common/connect';
import { makeStyles } from "@material-ui/core/styles";
import { XYPlot, VerticalBarSeries, XAxis, YAxis } from 'react-vis';
import { Bar } from "react-chartjs-2";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Sector, Cell } from 'recharts';
import 'antd/dist/reset.css';
import { Label } from '@thumbtack/thumbprint-react';
import { MultiSelect } from "react-multi-select-component";
import Grid from "@material-ui/core/Grid";
import { destroy } from 'chart.js';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { subDays, addDays } from 'date-fns';
import { Link } from 'react-router-dom';
import store from '../../config/store';
import { decode } from 'jsonwebtoken'



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  selectbar: {
    width: 300,
    height: 50
  },
  filteroption: {
    marginLeft: 20
  },
  datepicker: {
    width: 100,
    height: 200
  },
  Nodata:{
    width:400,
    height:200
  },
  textheader:{
    marginLeft:500,

  },
  textbody:{
    marginLeft:400,

  }
}));

//sample comment
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{` ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


function Graph({ graphProposal, userProposalsData, proposals, statusProposal, bidstatus, status, getUsers, allUsers }) {

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback((_, index) => {
    setActiveIndex(index);
  }, [setActiveIndex]);

  const { AppReducer: { token: authToken } } = store.getState();
const token = authToken || localStorage.getItem('authToken');
let roles = "";
if(token) {
  const { user : { role } } = decode(token);
  if(role) {
    roles =role;
  }
} 

  const classes = useStyles();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [openCalendar, setopenCalendar] = useState(false)
  const [barChartInstance, setBarChartInstance] = useState(null);
  const [pieChartInstance, setPieChartInstance] = useState(null);

  // Destroy existing chart instances when component unmounts
  useEffect(() => {
    return () => {
      if (barChartInstance) {
        barChartInstance.destroy();
      }
      if (pieChartInstance) {
        pieChartInstance.destroy();
      }
    };
  }, [barChartInstance, pieChartInstance]);
  //Extract necessary users data from userProposalsData for top dropdown options
  const users = userProposalsData.map(user => {
    return {
      id: user.userInfo.id,
      value: user.userInfo.firstName,
      label: user.userInfo.firstName,
    }
  })


  // Logic to filter the UserProposaldata by the users selected in dropdown
  if (selectedUsers.length > 0) {
    let selecedUsersId = selectedUsers.map(selectedUser => selectedUser.id);
    proposals = proposals.filter(user => {
      return selecedUsersId.includes(user.createdBy)
    });
    userProposalsData = userProposalsData.filter(users => {
      return selecedUsersId.includes(users.userInfo.id);
    });
  }


  //Logic to transform the userProposalsData into specific structure expected by recharts barcharts - https://www.chartjs.org/docs/latest/charts/bar.html#dataset-properties
  // Refer to ./sampleBarChartData.json for the required structure for barcharts
  
  // let datasets = userProposalsData.map(user => {
  //   let chartDataItem = {
  //     data: [user.userProposal],
  //     label: [user.userInfo.firstName],
  //     backgroundColor: "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ", 0.5)",
  //     stack: 1
  //         };
  //   return chartDataItem;
  // })


  // let data = ["bids"]

  // let barChartData = {
  //   labels: data,
  //   datasets
  // };


  // Create an array to hold the datasets
// let datasets = [];

// Iterate over each user proposal data to create the datasets
// userProposalsData.forEach(user => {
  // Extract user information
  // const { userInfo } = user;
  
  // Extract user proposal data
  // const { userProposal } = user;
  
  // Create a dataset object for the current user
  // let chartDataItem = {
  //   label: userInfo.firstName, // Use user's first name as label
  //   data: [userProposal], // Array of proposal values (assuming only one value per user)
  //   backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`, // Random background color
  //   stack: 1 // Stack level (if stacking bars)
  // };
  
  // Push the dataset object to the datasets array
//   datasets.push(chartDataItem);
// });

// Define the labels array (assuming only one label for 'bids')
// let labels = ["bids"];

// Create the barChartData object with labels and datasets
// let barChartData = {
//   labels: labels,
//   datasets: datasets
// };


const data = userProposalsData.map(user => ({
  x: user.userInfo.firstName, // Use user's first name as x value
  y: user.userProposal, // Use user's proposal value as y value
}));

  //Logic to prepare pie chart data start ---------------------

  //Take a map/object where keys are all possible values of status of Proposal.
  var key = status.map(i => i.status)


  let obj = key.reduce((ac, a) => ({ ...ac, [a]: '' }), {});

  let pieChartMap = key.reduce((acc, curr) => (acc[curr] = 0, acc), {});

  //Loop through all proposals and increase the count in map for particular status of proposal encountered in the proposal data. 
  for (let i = 0; i < proposals.length; i++) {
    let pStatus = proposals[i].status?.status;
    if (pStatus) {
      let prevValue = pieChartMap[pStatus];
      pieChartMap[pStatus] = prevValue + 1;
    }
  }

  //Now convert the above map/object into an array because that is what is expected by recharts piechart.
  // Refer to ./samplePieChartData.json for the required structure for PieChart
  let pieChartData = Object.entries(pieChartMap).map((entry) => {
    let [key, val] = entry;
    return {
      "name": key,
      "value": val
    }
  })

  //Logic to prepare pie chart data End ----------------

  const [state, setState] = useState({
    selection: {
      startDate: subDays(new Date(), 30),
      endDate: new Date(),
      key: 'selection'
    },
  });

  const handleChangeDate = () => {
    graphProposal(state.selection.startDate, state.selection.endDate);
    statusProposal(state.selection.startDate, state.selection.endDate);
  }

  useEffect(() => {
    graphProposal(state.selection.startDate, state.selection.endDate);
    statusProposal(state.selection.startDate, state.selection.endDate);
    bidstatus();
    getUsers();
  }, [graphProposal, statusProposal, bidstatus, getUsers]);

 
  return (
    <div>
      <Container>
        <h2>Statistics</h2>
        <Paper>
          <Grid container spacing={3} >
            <div className="datepicker"  >
              <label>
                <DateRangePicker

                  onChange={item => setState({ ...state, ...item })}
                  months={1}
                  minDate={addDays(new Date(), -300)}
                  maxDate={addDays(new Date(), 900)}
                  direction="vertical"
                  scroll={{ enabled: true }}
                  ranges={[state.selection]}
                  open={openCalendar}
                />
              </label>
            </div>
            {roles == 'ADMIN' ||  roles == 'BD MANAGER' ?
            <Grid item xs={4} md={3} lg={3}>
              <Label for="value"><b>Select team members:</b></Label>
              <MultiSelect
                className={classes.selectbar}
                options={users}
                value={selectedUsers}
                onChange={setSelectedUsers}
              />
            </Grid>
            :""}
            <Grid item xs={6} md={2} lg={2}>

              <button
                onClick={handleChangeDate}
                style={{ marginLeft: "10px", padding: '18px 32px' }}
                type="button"
                className="btn btn-primary"
                InputProps={{
                  className: classes.button
                }}
              >
                Search
              </button>
            </Grid>
          </Grid>
          { userProposalsData.length>0 ?

          <div className="main-cst">
            <div className="main-col">
              <div className="card">
                <div className="card-header">
                  <i className="fa fa-align-justify" />
                </div>
                <div className="card-block">
                  <XYPlot xType="ordinal" width={600} height={400} margin={{ bottom: 70 }}>
        <VerticalBarSeries data={data} />
        <XAxis title="Users" />
        <YAxis title="Proposal Value" />
      </XYPlot>
                  {/* <Bar data={barChartData} /> */}
                </div>
              </div>
            </div>
            <div className="main-col">
              <div className="card">
                <div className="card-header">
                  <h1 align="center">Bid status</h1>
                </div>
                <div className="card-block">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart >
                      <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        dataKey="value"
                        data={pieChartData}
                        cx="43%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        onMouseEnter={onPieEnter}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

          
          </div>
          : <div className="Nodata">
          <div className="card">
            <div className="card-header">
              <i className="fa fa-align-justify" />
            </div>
            <div className="card-block">
             <div className={classes.textheader} ><h1 style={{color: "red"}} >NO DATA </h1></div>
             <div className={classes.textbody}><p >PLEASE TRY TO CHANGE DATE OR <span> <Link to= {{ pathname: '/proposal/create'}}>CREATE NEW PROPOSAL </Link></span></p>
             </div>
            </div>
          </div>
        </div> }
        </Paper>

      </Container>
    </div>

  )

}
export default getConnect(Graph);