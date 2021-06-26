import React, {useEffect, useState} from 'react'
import { Typography, Grid, Paper, Container } from '@material-ui/core'
import NoteCard from '../components/noteCard.js'
import Masonry from 'react-masonry-css'


export default function Create() {

	const [notes, setNotes ] = useState([])

	useEffect(() => {
		fetch("http://localhost:8000/notes")
			.then((res) => res.json())
			.then(data => setNotes(data))
	}, [])

	const handleDelete = async(id) => {
		await fetch("http://localhost:8000/notes/" + id, {
			method:"DELETE"
		})
		const newNote = notes.filter(note => note.id != id)
		setNotes(newNote)
	}

	const breakpoints = {
		default:3,
		1100: 2,
		700: 1
	}

  return (
    <Container>
    <Masonry
      breakpointCols={breakpoints}
	  className="my-masonry-grid"
	  columnClassName="my-masonry-grid_column">
		{notes.map(note => 
    		<div item key={note.id}>
				<NoteCard note={note} handleDelete={handleDelete}/>
			</div>
		)}
	</Masonry>

    </Container>
  )
}