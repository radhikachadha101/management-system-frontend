import moment from 'moment';
const FORMAT = 'MMM DD, YYYY';
export function formatDate(date, format) {
  return date ?  moment(date).format(format||FORMAT) : '';
}
export const getRouteName = path => {
  const starts = (testVal) => path && path.startsWith(testVal);
  switch (true) {
    case starts('/projects'):
      return 'Projects';
    case starts('/users'):
      return 'Users';
    case starts('/timesheet'):
      return 'Timesheet';
    case starts('/reports'):
      return 'Reports';
    case starts('/proposals'):
      return 'Proposal';
    case starts('proposal/edit'):
      return 'EditProposal';
    case starts('proposal/Summary'):
        return 'PropsalSummary'; 
    case starts('/Skills'):
          return 'Skills';     
    case starts('/bidProfiles'):
          return('bidProfiles');    
    case starts('/stats'):
          return('stats');            
    default:
      return 'Common';
  }
}