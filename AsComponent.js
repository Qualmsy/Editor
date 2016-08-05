AsNode = Astro.Class({
  name: 'Node',
  fields: {
	id: {type: 'string'},
	parent: {type: 'string', default: "#"},
	text: {type: 'string'},
	icon: {type: 'string'},
	state: {type: 'object'},
	li_attr: {type: 'object'},
	a_attr: {type: 'object'},
	type: {type: 'string'},
	style: {type: 'string'}
  }
});
AsEvent = Astro.Class({
  name: 'Event',
  fields: {
	name: {type: 'string'},
	type: {type: 'string'},
	nodeId: {type: 'string'},
	selector: {type: 'string'},
	code: {type: 'string'}
  }
});
AsHelper = Astro.Class({
  name: 'Helper',
  fields: {
	name: {type: 'string'},
	arguments: {type: 'string'},
	code: {type: 'string'}
  }
});
AsHook = Astro.Class({
  name: 'Hook',
  fields: {
	onCreated: {type: 'string'},
	onRendered: {type: 'string'},
	onDestroyed: {type: 'string'}
  }
});


DBComponents = new Mongo.Collection('components');
AsComponent = Astro.Class({
  name: 'Component',
  collection: DBComponents,
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
   	HTML: {
		type: 'string',
		default: ""
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
