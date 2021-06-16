const fs = require('fs')
const chalk = require('chalk')
const prompt = require('prompt')

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

const removeNote = (index)=>{
	
	var notes = loadNotes()
	if(index > notes.length)
	{
		console.log(chalk.red("Invalid Index!"))
		return
	}
	var len = notes.length
	var i = index - 1;
		console.log(chalk.redBright("Are you sure you want to delete note "+(index)+"? (Y/N)"))
		prompt.start();
		prompt.get(['confirmation'],(err,result)=>{
			if(result.confirmation === 'Y' || result.confirmation === 'y')
			{
				notes.splice(i,1)
				saveNotes(notes)
				
			}
			else
			{
				console.log(chalk.red("Cancelled!"))
				return
			}
			console.log(chalk.greenBright("Note Deleted!"));
			return;
		})
			
}

const listNotes = ()=>{
	var listcnt = 1;
	var notes = loadNotes()
	notes.forEach((note)=>{console.log(listcnt+". "+note.title);listcnt++;})
	
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
    fs.writeFileSync('../data/notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('../data/notes.json')
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
