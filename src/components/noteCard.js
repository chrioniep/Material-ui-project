import React from 'react';
import { IconButton , Typography, makeStyles, Avatar } from '@material-ui/core'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent'
import { yellow, green, pink, blue } from '@material-ui/core/colors'


const useStyles = makeStyles({
	avatar:{
		backgroundColor:(note) => {
			if(note.category == 'work'){
				return yellow[700]
			}
			if(note.category == 'money'){
				return green[500]
			}
			if(note.category == 'todos'){
				return pink[500]
			}
			return blue[500]
		}
	}
})

const NoteCard = ({note, handleDelete}) => {
	const classes = useStyles(note)
  return (
    <div>
    	<Card elevation={1}>
    		<CardHeader
    			avatar={
    				<Avatar className={classes.avatar}>
    					{note.category[0].toUpperCase()}
    				</Avatar>
    			}
    			title={note.title}
    			subheader={note.category}
    			action={
    				<IconButton onClick={() => handleDelete(note.id)}>
    					<DeleteOutlinedIcon/>
    				</IconButton>
    			}
    		/>
    		<CardContent>
    			<Typography variant="body2" color="textSecondary">
    				{note.details}
    			</Typography>
    		</CardContent>
    	</Card>
    </div>
  )
}

export default NoteCard;