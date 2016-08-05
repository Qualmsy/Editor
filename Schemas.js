Schemas = {};
/*
Schemas.Node = new SimpleSchema({
	id: {type: String},
	parent: {type: String, defaultValue: "#"},
	text: {type: String},
	icon: {type: String, optional: true},
	state: {type: Object, optional: true},
	'state.opened': {type: Boolean, optional: true},
	'state.disabled': {type: Boolean, optional: true},
	'state.selected': {type: Boolean, optional: true},
	li_attr: {type: Object, optional: true},
	a_attr: {type: Object, optional: true},
	type: {type: String, optional: true},
	style: {type: String, optional: true}
});
Schemas.Hooks = new SimpleSchema({
	onCreated: {type: String, optional: true},
	onRendered: {type: String, optional: true},
	onDestroyed: {type: String, optional: true}
});
Schemas.Event = new SimpleSchema({
	name: {type: String},
	type: {type: String, optional: true},
	nodeId: {type: String, optional: true},
	selector: {type: String, optional: true},
	code: {type: String, optional: true}
});
Schemas.Helper = new SimpleSchema({
	name: {type: String},
	arguments: {type: String, optional: true},
	code: {type: String, optional: true}
});

Components = new Mongo.Collection('components');
Schemas.Component = new SimpleSchema({
	name: {
		type: String,
		label: "Name of new component"
	},
	owner: {
		type: String,
		autoValue:function(){ return this.userId; }
	},
	isBody: {type: Boolean, defaultValue: false},
	originalCreator: {type: String, optional: true},
	copiesCounter: {type: Number, defaultValue: 1},
	hooks: {type: Schemas.Hooks, optional: true},
	nodeCounter: {type: Number, defaultValue: 0},
	nodes: {type: [Schemas.Node], defaultValue: []},
	events: {type: [Schemas.Event], defaultValue: []},
	helpers: {type: [Schemas.Helper], defaultValue: []}
});
Components.attachSchema(Schemas.Component);
*/
Projects = new Mongo.Collection('projects');
Schemas.Project = new SimpleSchema({
	owner: {
		type: String,
		autoValue:function(){ return this.userId }
	},
	name: {
		type: String,
		label: 'What is the name of the project?'
	},
	description: {
		type: String,
		label: 'What does this do?',
		optional: true,
		max: 2000,
		autoform: {
		  rows: 10
		}
	},
	body: {type: String},
	reactiveVars: {type: [String], defaultValue: []},
	collections: {type: [String], defaultValue: []}
});
Projects.attachSchema(Schemas.Project);
Projects.before.insert(function (userId, doc) {
	/*
	var c = new AsComponent({
		name: "body",
		isBody: true
	});
	console.log(c);
	c.save();
	doc.body = c._id;*/
});
