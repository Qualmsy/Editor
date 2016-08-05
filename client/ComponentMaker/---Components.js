Template.Components.helpers({
	OwnedComponents: function () {
	 var userId = Meteor.userId();
	 return DBComponents.find({owner: userId});
	},
	UnownedComponents: function () {
	 var userId = Meteor.userId();
	 return DBComponents.find({owner: {$ne: userId}});
	},
	IsCurrentComponent: function (id) {
	 var c = State.CurrentComponent.get();
	 return id === c._id;
	}
});

Template.Components.events({
	"change #createName": function (event, tmpl) {
		var input = tmpl.$("#createName");
	    var name = input.val();
	    var newC = new AsComponent({
	      name: name
	    });
	    newC.save();
	    State.CurrentComponent.set(newC);
	    input.val('');		
	},
	"click button.viewBody": function (event, tmpl) {
		var pid = State.CurrentProject.get();
		var p = Projects.findOne({_id: pid});
		State.CurrentComponent.set(p.body);
	},
	"click #ComponentsNewComponentButton": function (event, tmpl) {
		//var name = tmpl.find("#ComponentsNewComponentName").value;
		var input = tmpl.$("#createName");
	    var name = input.val();
	    var newC = new AsComponent({
	      name: name
	    });
	    newC.save();
	    State.CurrentComponent.set(newC);
	    /*
	    DBComponents.update({_id: cId}, 
	      {$inc: {nodeCounter: 1},
	      $push: {nodes: nodeObj}});*/
	    input.val('');
	}
});