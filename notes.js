const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return 'Your notes...'
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
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
		const dup = notes.filter(function(note){return note.title === newtit})
		if(dup.length === 0)
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

const removeNote = function (title){
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

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
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
	removeNote: removeNote
}
