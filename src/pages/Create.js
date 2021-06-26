import React, {useState} from 'react'
import 
{ Typography, 
  Button, 
  Container, 
  makeStyles, 
  TextField, 
  Radio,
  FormLabel,
  FormControl, 
  RadioGroup,
  FormControlLabel 
} 
from '@material-ui/core'
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
	field:{
		marginTop:20,
		marginBottom:20,
		display:'block'
	}
})

export default function Notes() {
	const classes = useStyles()
	const history = useHistory()
	const [title, setTitle] = useState('')
	const [details, setDetails] = useState("")
	const [titleError, setTitleError] = useState(false)
	const [detailError, setDetailsError] = useState(false)
	const [category, setCategory] = useState('todos')

	const handleSubmit = (e) => {
		e.preventDefault()

		setTitleError(false)
		setDetailsError(false)

		if(title == ""){
			setTitleError(true)
		}
		if(details == ""){
			setDetailsError(true)
		}

		if(title && details){
			fetch("http://localhost:8000/notes", {
				method:"POST",
				headers:{'Content-type':'application/json'},
				body:JSON.stringify({title,details,category})
			}).then(() => {
				history.push('/')
			})
		}
	}
  return (
    <Container>
    	<Typography
    		variant="h6"
    		color="textSecondary"
    		component="h2"
    		gutterBottom
    	>
    		Create a new note
    	</Typography>
    	<form noValidation autoComplete="off" onSubmit={handleSubmit}>
    		<TextField
    			onChange={(e) => setTitle(e.target.value)}
    			className={classes.field}
    			label="Create note"
    			color="secondary"
    			variant="outlined"
    			fullWidth
    			error={titleError}
    			

    		/>
		  <TextField
		  	onChange={(e) => setDetails(e.target.value)}
			className={classes.field}
			label="Detail"
			color="secondary"
			variant="outlined"
			multiline
			rows={4}
			error={detailError}
			fullWidth
			

			/>
			<FormControl className={classes.field}>
				<FormLabel>Note Category</FormLabel>
				<RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
					<FormControlLabel label="Money" value="money" control={<Radio/>}/>
					<FormControlLabel label="Todos" value="todos" control={<Radio/>}/>
					<FormControlLabel label="Reminders" value="reminders" control={<Radio/>}/>
					<FormControlLabel label="Work" value="work" control={<Radio/>}/>
				</RadioGroup>
			</FormControl>
			<Button 
    		type="submit" 
    		color="secondary" 
    		variant="contained"
    		endIcon={<KeyboardArrowRightOutlinedIcon/>}
    		>
    		Send
    		</Button>
    	</form>

{/*    	<ButtonGroup color="secondary" variant="contained">
    		<Button>One</Button>
    		<Button>Two</Button>
    		<Button>Three</Button>
    	</ButtonGroup>*/}
    </Container>
  )
}

