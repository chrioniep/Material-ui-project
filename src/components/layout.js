import React from 'react';
import { makeStyles, Drawer, Typography, Avatar } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import { format } from 'date-fns'
import { useHistory, useLocation } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const drawerWidth = 249

const useStyles = makeStyles((theme) => {
	return {
		page:{
			background:"#f9f9f9",
			width:"100%",
			padding:theme.spacing(3)
		},
		drawer:{
			width:drawerWidth
		},
		drawerClasses:{
			width:drawerWidth
		},
		root:{
			display:'flex'
		},
		active:{
			background:"#f4f4f4"
		},
		title:{
			padding:theme.spacing(3)
		},
		appbar:{
			width: `calc(100% - ${drawerWidth}px)`
		},
		toolbar:theme.mixins.toolbar,
		date:{
			flexGrow:1
		},
		avatar:{
			marginLeft:theme.spacing(2)
		}

	}
})

const Layout = ({children}) => {
	const classes = useStyles()
	const history = useHistory()
	const location = useLocation()

	const menuItems = [
		{
			text:"My notes",
			icon:<SubjectOutlined color='secondary'/>,
			path:"/"
		},
		{
			text:"Create note",
			icon:<AddCircleOutlineOutlined color='secondary'/>,
			path:"/create"
		}
	]

  return (
    <div className={classes.root}>

    	<AppBar 
    		className={classes.appbar}
    		elevation={0}
    	>
    		<Toolbar>
    			<Typography className={classes.date}>
    				Today is the {format(new Date(), 'do MMM Y')}
    			</Typography>
    			<Typography>
    				Crioni
    			</Typography>
    			<Avatar className={classes.avatar} src='/elyse.png'/>
    		</Toolbar>
    	</AppBar>
    	{/* Drawer*/}
    	<Drawer
    		className={classes.drawer}
    		variant="permanent"
    		anchor="left"
    		classes={{paper:classes.drawerClasses}}
    	>
    		<Typography className={classes.title} variant="h5">
    			Note Book
    		</Typography>	
    		<List>
    			{menuItems.map(item => 
	    			<ListItem
	    				button
	    				key={item.text}
	    				onClick={() => history.push(item.path)}
	    				className={location.pathname == item.path ? classes.active : null}
	    			>	
	    				<ListItemIcon>
	    					{item.icon}
	    				</ListItemIcon>
	    				<ListItemText primary={item.text}/>

	    			</ListItem>
    			)}
    		</List>
    	</Drawer>

    	{/*Header*/}
    	<div className={classes.page}>		
    	<div className={classes.toolbar}></div>
    	{children}
    	</div>
    </div>
  )
}

export default Layout;