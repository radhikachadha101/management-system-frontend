import React, { useEffect, useState } from 'react';
import getConnect from '../Common/connect';
import TaskEntryModel from '../Timesheet/TaskEntryModal';
import ReportsTab from './ReportsTab';
import ReportsFilter from './ReportsFilter';
import { getUnreadComments } from '../../actions/commentActions';
import Table from './ReportTable';
import ReportSearch from './ReportsSearch';

// Pending -> Task ApproveStatus PENDINGFORAPPROVAL
const tabs = [{ label: 'Pending', value: 3 }, { label: 'Approved', value: 1 }, { label: 'All', value: 2 }]

const Index = ({
  getTaskReports,
  getProjects,
  reportTasks,
  projects,
  addTask,
  updateTaskReport,
  getTask,
  getInProgressTask,
  getUsers,
  users,
}) => {
  const [modelOpen, setModelOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState();
  const [searchFitler, setSearchFilter] = useState({});
  const [selectedTab, setSelectedTab] = useState('');
  const [
    reportTaskWithUnreadComments,
    setReportTaskWithUnreadComments,
  ] = useState([]);

  useEffect(() => {
    getProjects();
    getUsers();
  }, [getProjects, getTaskReports, getUsers]);

  const handleSearch = ({ target }) => {
    const { value } = target;
    setSearchFilter((filter) => {
      if(value) {
        getTaskReports({ ...filter.select, description: value });
      }else{
        getTaskReports({ ...filter.select });
      }
      filter.description = value;
      return filter;
    })
  }

  const handleViewReport = (reportTask) => {
    setCurrentTask(reportTask);
    setModelOpen(true);
  };

  const handleApproveTask = (taskId) => {
    updateTaskReport(taskId, { approvedStatusId: 1 });
  };

  const handleClearFilter = () => {
    let filter = { };
    if (selectedTab.label !== 'All') {
      filter = { task_approve_status: selectedTab.value };
    }
    getTaskReports({ ...filter, description: searchFitler.description});
  }

  const handleApplyFilter = (filter) => {
    filter = { select: filter, description: searchFitler.description};
    if (selectedTab.label !== 'All') {
      filter.task_approve_status = selectedTab.value
      getTaskReports({ description: searchFitler.description, ...filter.description, ...filter.select, task_approve_status: selectedTab.value });
    } else {
      getTaskReports({ description: searchFitler.description, ...filter.select });
    }
    setSearchFilter(filter);
  };

  const handleTabChange = (currentTab) => {
    setSelectedTab(currentTab);
    if (currentTab.label === 'All') {
      getTaskReports(searchFitler.select ? { ...searchFitler.select, description: searchFitler.description } : { description: searchFitler.description});
    } else {
      getTaskReports(searchFitler.select ? { ...searchFitler.select, description: searchFitler.description, task_approve_status: currentTab.value } : { task_approve_status: currentTab.value, description: searchFitler.description });
    }
  };

  useEffect(() => {
    const getUnreadCommentsFromServer = async () => {
      const taskIds = reportTasks.map((task) => task.id);
      const response = await getUnreadComments({
        taskIds: taskIds.join(','),
      });

      const unreadComments = response.data;
      setReportTaskWithUnreadComments(reportTasks.map((task) => {
        const unreadComment = unreadComments.find(
          (comment) => comment.timeEntryId === task.id
        );
        if (unreadComment) {
          return { ...task, unreadCommentsCount: unreadComment.unreadCommentsCount };
        } else {
          return task;
        }
      }));
    };
    if (reportTasks) {
      getUnreadCommentsFromServer();
    }
  }, [reportTasks]);

  return (
    <div className="reports">
      <ReportsTab onTabChange={handleTabChange}
        tabs={tabs} />

      <ReportsFilter
        projects={projects}
        users={users}
        applyFilter={handleApplyFilter}
        clearFilter={handleClearFilter}
      >
        <ReportSearch onSearchChange={handleSearch} />
      </ReportsFilter>


      <Table
        reportTasks={reportTaskWithUnreadComments}
        approveTask={handleApproveTask}
        viewReport={handleViewReport}
      />
      {/* <ReportsTable
          reportTasks={reportTaskWithUnreadComments}
          loading={showLoader}
          onViewTaskDetail={handleViewTask}
          onApproveTask={handleApproveTask}
        /> */}



      {modelOpen && (
        <TaskEntryModel
          open={modelOpen}
          task={currentTask}
          handleTaskSave={(task) => console.log('View only')}
          handleClose={() => setModelOpen(false)}
        />
      )}
    </div>
  );
};

export default getConnect(Index);
