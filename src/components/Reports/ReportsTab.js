import React, { useState, useEffect } from 'react'
import useStateWithUrlParams from 'react-use-state-url-params'

const Tab = ({ tab, onSelect, selected }) => (
	<button
		type="button"
		onClick={() => onSelect(tab)}
		className={`btn ${selected && 'selected'}`}>
		{tab.label}
	</button>
);


const ReportTabs = (props) => {
	const [urlParam, setUrlParam] = useStateWithUrlParams('All', 'approve_status');

	const [selectedTab, setSelectedTab] = useState({ label: 'All', value: 2 });

	useEffect(() => {
		props.onTabChange(selectedTab);
	}, [selectedTab]);

	useEffect(() => {
		if(urlParam === 'All') {
			setSelectedTab({ label: urlParam, value: 2 })
		}else if(urlParam === 'Pending'){
			setSelectedTab({ label: urlParam, value: 3 })
		}else if(urlParam === 'Approved') {
			setSelectedTab({ label: urlParam, value: 1 })
		}
	}, [urlParam]);

	const handleSelect = (selectedTab) => {
		setUrlParam(selectedTab.label)
		setSelectedTab(selectedTab)
	}

	return (
		<div className="reports__tab">
			{
				props.tabs.map((tab,index) => (
					<Tab
						key={index}
						tab={tab}
						onSelect={handleSelect}
						selected={selectedTab.value === tab.value} />
				))
			}
		</div>
	)
}

export default ReportTabs
