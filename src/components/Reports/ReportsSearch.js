import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		border:'1px solid rgba(211,211,211,0.3)',
		alignItems: 'center',
		width: 400,
	},
	input: {
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
}));

export default function Search(props) {
	const classes = useStyles();

	return (
		<div  className={classes.root}>
			<IconButton type="submit" className={classes.iconButton} aria-label="search">
				<SearchIcon />
			</IconButton>
			<InputBase
				className={classes.input}
				onChange={props.onSearchChange}
				placeholder="Search Tasks e.g Code Refactoring "
				inputProps={{ 'aria-label': 'search google maps' }}
			/>


		</div>
	);
}
