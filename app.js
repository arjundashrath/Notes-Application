const notes = require('./notes.js')
const chalk = require('chalk')
const yargs = require('yargs')
yargs.version("1.0.0")
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title:
		{
			describe: 'Title of note',
			demandOption: true,
			type: 'string'
		},
		body:
		{
			describe: 'Body of note',
			demandOption: true,
			type: 'string'
		}
	},
	handler: function (argv){
		notes.addNote(argv.title, argv.body)
	}
})

const remfun = function(){
	console.log(chalk.cyan("Removing note"))
}
yargs.command({
	command: 'remove',
	describe: 'remove note',
	handler: function(argv){notes.removeNote(argv.title)},
	builder: {
		title:{
			describe: "Note title",
			demandOption: true,
			type: 'string'
		}
	}
})
const readfun = function(){
	console.log(chalk.red.bold("Reading note"))
}
yargs.command({
	command: 'read',
	describe: 'read note',
	handler: readfun
})
const listfun = function(){
	console.log(chalk.bgRed("listing notes"))
}
yargs.command({
	command: 'list',
	describe: 'listing notes',
	handler: listfun
})
yargs.parse()
