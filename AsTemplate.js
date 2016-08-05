DBTemplates = new Mongo.Collection('templates');
AsTemplate = Astro.Class({
  name: 'Template',
  collection: DBTemplates,
  fields: {
	name: {type: 'string'},
	owner: {
	  type: 'string',
	  default: function(){
	  	return Meteor.userId(); 
	  }
	},
    createdAt: {
      type: 'date',
      default: function() {
        return new Date();
      }
    },
	isBody: {type: 'boolean'},
	originalCreator: {type: 'string'},
	copiesCounter: {
		type: 'number', 
		default: 0
	},
	nodeCounter: {
		type: 'number', 
		default: 0
	},
	HTML: {
		type: 'string',
		default: ""
	},
	nodes: {
		type: 'array',
		nested: 'Node',
    	default: function() {
        	return [];
      	}
    },
	events: {
		type: 'array',
		nested: 'Event',
    	default: function() {
        	return [];
      	}
	},
	helpers: {
		type: 'array',
		nested: 'Helper',
    	default: function() {
        	return [];
      	}
	},
	hooks: {
		type: 'array',
		nested: 'Hook',
    	default: function() {
        	return [];
      	}
	}
  }
});
