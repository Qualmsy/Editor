Template.Tree.events({

});
Template.Tree.helpers({
  isCoding: function () {
    return State.isCoding.get();
  }
});
globalDep = new Tracker.Dependency();
Template.Tree.onRendered(function () {

 //Meteor.typeahead(this.find("#appendName"));

 this.$('#ProjectHTMLTree').jstree({
  core: {
   themes: {
        name: 'default-dark',
        dots: true,
        icons: true,
        variant : "large"
      },
   data: function (node, cb) {
      globalDep.depend();
      var c = State.CurrentComponent.get();
      var code = c.HTML;
      if (!code) {
        cb({});
        return "";
      }
      var codeML = code.replace(/\n/g, "");
      var nodes = $.parseHTML(code);

      nodes = nodes.map(function(Node) {
        walk_the_DOM(Node, function(node) {
          if (node.id)
            var id = "#" + node.id;
          else var id = "";
          if (node.className)
            var className = "." + node.className;
          else var className = "";
          node.text = node.tagName+id+className;
        });
        return Node;
      });
      //if (nodes[0])
        //cb(nodes[0]);
      //else if (nodes)
      cb(nodes);
      nodes.map(function (node) {
          //console.log(node);
      });
    }
  },
  plugins : [
		"contextmenu",
		"state",
		"types",
		"changed"
	 ],
  contextmenu: {
    items: function ($node) {
     return {
      newBlock: {
        label: "new Block",
        icon: "glyphicon glyphicon-modal-window",
        action: function (obj) {
          //var input = tmpl.$("#ProjectTreeNewNode");
          //var name = input.val();
          var c = State.CurrentComponent.get();
          var newid = "node-" + c.nodeCounter;
          var parentNode = $node.id;
          var nodeObj = {
            id: newid,
            parent: parentNode,
            text: "name",
            icon: "glyphicon glyphicon-modal-window"
          };
          DBComponents.update({_id: cId},
            {$inc: {nodeCounter: 1},
            $push: {nodes: nodeObj}});
        }
      },
      newFunctionalBlock: {
        label: "new Functional block",
        icon: "glyphicon glyphicon-tasks",
        action: function (obj) {
            //this.rename(obj);
            //console.log(obj);
        }
      },
      newInput: {
        label: "new Input",
        icon: "glyphicon glyphicon-question-sign",
        action: function (obj) {
            //this.remove(obj);
            //console.log(obj);
        }
      },
      insertComponent: {
        label: "insert Component",
        icon: "glyphicon glyphicon-log-in",
        action: function (obj) {
            //this.remove(obj);
            //console.log(obj);
        }
      }
      };
     }
    }
  }).on("activate_node.jstree", function (event, data) {
  State.CurrentNode.set(data.node);
  console.log(data.node);
 }).on("dnd_start.vakata", function (event, data, m, g) {
  console.log(data, event, m, g);
 })
});
