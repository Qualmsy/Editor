Template.Component.helpers({
	IsNotCurrentComponent: function (id) {
		var c = State.CurrentComponent.get();
		if (c)
			return id !== c._id;
		else
			return true;
	}
});
Template.Component.events({
	"click .insertComponent": function (event, tmpl) {
		var c = State.CurrentComponent.get();
		var cursor = State.HTMLcursor.get();
	    var cursor1 = $('.ProjectHTMLCode').prop("selectionStart");
	    var cursor2 = $('.ProjectHTMLCode').prop("selectionEnd");
	    console.log(cursor1, cursor2);
		var HTML = c.HTML;
		var insertedC = "{{> " + tmpl.data._id + " }}";
		var output = [HTML.slice(0, cursor), insertedC, HTML.slice(cursor)].join('');
		c.set("HTML", output);
		c.save();
	},
	"click button.duplicateButton": function (event, tmpl) {
		var pId = State.CurrentProject.get();
		var d = tmpl.data;
		if (d._id) {
		 var c = DBComponents.findOne({_id: d._id}, {fields: {_id:0}});
		 if (!c.copiesCounter)
		 	c.copiesCounter = 2;
		 else
		 	c.copiesCounter = Number(c.copiesCounter) + 1;
		 c.name = c.name + "_" + c.copiesCounter;
		 if (!c.originalCreator)
		  c.originalCreator = c.owner;
		 //Components.insert(c);
		 //Projects.update({_id: pId},{$pull:{componentIds:d._id}});
		}
		else {
		 console.log("Down arrow gone wrong")
		}
	},
	"click a.viewComponentZZZZZ": function (event, tmpl) {
		var d = tmpl.data;
		console.log("node :", State.CurrentNode.get());
		console.log("comp :", State.CurrentComponent.get());
		if (d._id) {
			console.log("node :", State.CurrentNode.get());
			console.log("comp :", State.CurrentComponent.get());
			State.CurrentComponent.set(d._id);
			State.CurrentNode.set(null);

			/*
			tmpl.$("button.downarrow").addClass("currentArrow");
			tmpl.$("span.glyphicon")
				.removeClass("glyphicon-arrow-down")			
				.addClass("glyphicon-arrow-left");
			tmpl.$("div.btn-group")
				.addClass("currentArrow");*/
		}
		else {
		 console.log("Down arrow gone wrong")
		} 
	}
});
