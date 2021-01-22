const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
	const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.greenBright.bgWhiteBright('New note added!'))
    } else {
		
        var i = 1
		while(i>0)
		{
		newtit = title + " Copy(" + i +")"
		const dup = notes.find((note)=> note.title === newtit)
		if(!dup)
		{
			notes.push({
            title: newtit,
            body: body
			})
			saveNotes(notes)
			console.log(chalk.blueBright.bgWhiteBright("Note Title already exists, therefore title saved as " + newtit))
			break
		}
		else
		{
			i++
		}}
		
    }
}

const removeNote = (title)=>{
	var notes = loadNotes()
	var len = notes.length
	for(var i=0;i<len;i++)
	{
		if(title === notes[i].title)
		{
			console.log(chalk.greenBright("Found! Deleted!"))
			notes.splice(i,1)
			saveNotes(notes)
			return;
		}
	}
	console.log(chalk.redBright("Note not found!"))
}

const listNotes = ()=>{
	var notes = loadNotes()
	notes.forEach((note)=>{console.log(note.title)})
	
}
const readNote = (title)=>{
	const notes = loadNotes()
	const foundnote = notes.find((note)=> note.title === title)
	if(foundnote)
	{
		console.log(chalk.magentaBright(foundnote.title))
		console.log(chalk.yellowBright(foundnote.body))
	}
	else
	{
		console.log(chalk.redBright("Note not found!"))
	}
}

const saveNotes =(notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote
}
