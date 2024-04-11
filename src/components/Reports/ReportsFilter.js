import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import MultiSelect from '../Common/MultiSelect';



const ReportFilters = (props) => {
	const [projects, setProjects] = useState([]);
	const [selectedProjects, setSelectedProjects] = useState([]);
	const [users, setUsers] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([]);

	useEffect(() => {
		if (props.projects && props.projects[0]) {
			let projects = props.projects[0].data;
		     projects = projects.map(project => ({label:project.name, value:project}))
			 setProjects(projects);
		}
	}, [props.projects]);

	useEffect(() => {
		if (props.users && props.users[0]) {
			let tmpUsers = props.users[0].data;
			tmpUsers = tmpUsers.map(user => ({label:`${user.firstName} ${user.lastName}`, value:user}))
			setUsers(tmpUsers);
		}
	}, [props.users])

	const handleClearFilter = () => {
		setSelectedProjects([])
		setSelectedUsers([]);
		props.clearFilter({},true);
	};

	const handleUsersChange = (currentSelectedUsers) => {
		setSelectedUsers(currentSelectedUsers)
		const users = currentSelectedUsers.map(user => user.value.id);
		const projects = selectedProjects.map(project => project.value.id);
		props.applyFilter({ projects: projects.length > 0 ? projects.join(): projects, users: users.length > 0 ? users.join() : users})

	}

		const handleProjectsChange = (currentSelectedProjects) => {
		setSelectedProjects(currentSelectedProjects)
		const users = selectedUsers.map(user => user.value.id);
		const projects = currentSelectedProjects.map(project => project.value.id);
	    props.applyFilter({ projects: projects.length > 0 ? projects.join() : projects, users: users.length > 0 ? users.join() : users })

	}

	return (
    <div className="reports__filter">
      <div className="dropdowns">
		  {/* Select Projects */}
        <MultiSelect
          label="Projects"
          options={projects}
          selected={selectedProjects}
          onChange={handleProjectsChange}
        />

		{/* Select Users */}
        <MultiSelect
          label="Users"
          options={users}
          selected={selectedUsers}
          onChange={handleUsersChange}
        />

        {/* Clear filter */}
        <Button
          variant="contained"
		  onClick={handleClearFilter}
		  disabled={selectedProjects.length === 0 && selectedUsers.length === 0}
		 className={selectedProjects.length === 0 && selectedUsers.length === 0 ? "" : "btn__clear__filter"}
        >
          Clear Filter
        </Button>
      </div>

      {/* date filter */}
      <div className="search">
			{props.children}
        {/* <form noValidate>
					<TextField
						id="datetime-local"
						type="datetime-local"
						onBlur={(e) => {
							// if (moment(task.completedAt).isSame(e.target.value)) {
							// 	return;
							// }
							// updateTask(task.id, { completedAt: e.target.value })
						}}
						defaultValue={moment(new Date()).format("YYYY-MM-DDTHH:mm")}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</form> */}
      </div>
    </div>
  );
}

export default ReportFilters
