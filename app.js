//NODE JS CLI NOTES APPLICATION
//Made with <3 by Arjun Dashrath

const notes = require('./notes.js')
const chalk = require('chalk')
const yargs = require('yargs')
const prompt = require('prompt')
yargs.version("2.0.0")
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title:
		{
			describe: 'Title of note',
			demandOption: false,
			type: 'string'
		},
		body:
		{
			describe: 'Body of note',
			demandOption: false,
			type: 'string'
		}
	},
	handler(argv){
		
		if(!argv.title && !argv.body)
		{
			prompt.start();
			prompt.get(['notetitle','notebody'],(err,result)=>{
			notes.addNote(result.notetitle, result.notebody)})
		}
		else if(!argv.body && argv.title.length > 0)
		{
			prompt.start();
			prompt.get(['notebody'],(err,result)=>{
			notes.addNote(argv.title, result.notebody)})
		}
		else if(!argv.title && argv.body.length > 0)
		{
			prompt.start();
			prompt.get(['notetitle'],(err,result)=>{
			notes.addNote(result.notetitle, argv.body)})
		}
		
	}
})

const remfun = function(){
	console.log(chalk.cyan("Removing note"))
}
yargs.command({
	command: 'remove',
	describe: 'remove note',
	handler(argv){
	prompt.start();
		prompt.get(['index'],(err,result)=>{
		notes.removeNote(result.index)})
	},
	builder: {
		title:{
			describe: "Note title",
			demandOption: false,
			type: 'string'
		}
	}
})
const readfun = (argv)=>{
	notes.readNote(argv.title)
}
yargs.command({
	command: 'read',
	describe: 'read note',
	handler: readfun,
	builder:{
		title:{
			describe: 'Title of note',
			demandOption: true,
			type: 'string'
		}
	}
})
const listfun = ()=>{
	console.log(chalk.cyanBright.bgWhiteBright("Listing Notes"))
	notes.listNotes()
}
yargs.command({
	command: 'list',
	describe: 'listing notes',
	handler: listfun
})
yargs.parse()
