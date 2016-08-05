Template.HTML.events({
  "click .ProjectHTMLTitle": function (event, tmpl) {
    var node = State.CurrentNode.get();
    State.CurrentNode.set(null);
    $('#ProjectHTMLTree').jstree(true).deselect_node(node);
  },
  "click .ProjectHTMLCode": function (event, tmpl) {
    var cursor1 = tmpl.$('.ProjectHTMLCode').prop("selectionStart");
    var cursor2 = tmpl.$('.ProjectHTMLCode').prop("selectionEnd");
    //console.log(cursor1, cursor2);
    State.HTMLcursor.set(cursor1);
  },
  "keyup #some-id": function (event, tmpl) {
    var code = tmpl.find("#some-id").value;
    console.log(code);
  },
  "click .saveButton": function (event, tmpl) {
    State.isCoding.set(false);
    //var code = tmpl.find(".ProjectHTMLCode").value;
    var code = tmpl.find("#some-id").value;

    //console.log(editor);
    //console.log(code2);
    //var code = code.replace(/\n/g, "");
    var c = State.CurrentComponent.get();
    c.set("HTML", code);
    c.save();
    var handlebars = /\{\{\>\s\w{14,20}\s\}\}/g;
    //console.log(code.match(handlebars));
    var codeML = code.replace(/\n/g, "");
    var jml = JsonML.fromHTMLText(codeML);
    //console.log(codeML);
    //console.log(jml);
    //var nodes = JsonMLtoTree(jml);
    var nodes = $.parseHTML(codeML);
    /*
    var recurse = function (el) {
      $.each( el, function( i, el ) {
        console.log(i, el);
      });
    }
    $.each( nodes, function( i, el ) {
      recurse(el);
    });*/
    //Walk(nodes, function ())

    //var Walker = new Paul(['children']);
    var treeNodes = [];
    nodes.map(function(Node) {
        //var treeNodes = [];
        walk_the_DOM(Node, function(node) {
            if(node.nodeType == 1) {
                if (node.parentElement) {
                  treeNodes.push({
                    text: node.tagName,
                    parent: node.parentElement.tagName
                  });
                }
                else {
                  treeNodes.push({
                    text: node.tagName,
                    parent: "#"
                  });
                }
                //console.log(node.tagName + ' id: ' + node.id + "parent :" + node.parentNode.id);
            }
            //else console.log(node);
        });
        //console.log(treeNodes);
      }
    );
    /*
    var palm = Walker.map(nodes[1], function(node) {
        console.log(node);
        return node;
    });
    console.log(palm);*/
    //console.log(nodes);

  },
  "click .writeButton": function (event, tmpl) {
    State.isCoding.set(true);

  },
  "click #appendName": function (event, tmpl) {
    /*
    var node = State.SelectedNode.get();
    tmpl.find("#ProjectHTMLTitle").style.display = "none";
    var input = tmpl.find("#ComponentsNewComponentName");
    input.style.display = "block";
    input.value = node.name;
  */
  },
  "click #ProjectHTMLTitle": function (event, tmpl) {
    /*
    var node = State.SelectedNode.get();
    tmpl.find("#ProjectHTMLTitle").style.display = "none";
    var input = tmpl.find("#ComponentsNewComponentName");
    input.style.display = "block";
    input.value = node.name;
    */
  },
  "change #ComponentsNewComponentName": function (event, tmpl) {
    //var input = tmpl.$("#ProjectTreeNewNode");
    var name = event.target.value;
    var c = State.CurrentComponent.get();
    c.set("name", name);
    c.save();
    event.target.style.display = "none";
    tmpl.find("#ProjectHTMLTitle").style.display = "block";
  },
  "change #appendName": function (event, tmpl) {
    //var input = tmpl.$("#ProjectTreeNewNode");
    var input = tmpl.$("#appendName");
    var name = input.val();
    var c = State.CurrentComponent.get();
    var newC = new AsComponent({
      name: name
    });
    newC.save();
    var newid = newC._id;
    //"node-" + c.nodeCounter;
    var newNode = new AsNode({
      id: newid,
      parent: "#",
      text: name,
      icon: "glyphicon glyphicon-link"
    });
    c.push("nodes", newNode);
    c.inc("nodeCounter", 1);
    c.save();
    State.CurrentComponent.set(c);
    /*
    DBComponents.update({_id: cId},
      {$inc: {nodeCounter: 1},
      $push: {nodes: nodeObj}});*/
    input.val('');
  },
  "click .saveComponent": function (event, tmpl) {
    var c = State.CurrentComponent.get();
    var input = tmpl.$("#ComponentsNewComponentName");
    var name = input.val();
    c.set("name", name);
    c.save();
    Router.go("/component/"+c._id);
    input.val("");
  },
  "change .ProjectHTMLCode": function (event, tmpl) {
    var code = event.target.value;
    var c = State.CurrentComponent.get();
    c.set("HTML", code);
    c.save();

  }
});
Template.HTML.helpers({
  isNodeSelected: function () {
    if (State.CurrentNode.get())
      return true;
    else return false;
  },
  editorOptions: function () {
    return {
      lineNumbers: true,
      mode: "htmlembedded",
      theme: "3024-night"
    }
  },
  isCoding: function () {
    return State.isCoding.get();
  },
  innerHTML: function () {
    var node = State.CurrentNode.get();
    var code = node.original.innerHTML;
    code = code.replace(/&gt;/g, ">");
    return code;
  },
  split: function (HTML) {
    //var c = State.CurrentComponent.get();
    //var code = c.HTML;
    var codeArray = HTML.split("\n");
    var newArray = codeArray.map(function (line) {
      var handlebars = /\{\{\>\s\w{14,20}\s\}\}/g;
      var templatesHelpers = line.match(handlebars);

      var lineObj = {};
      if (!templatesHelpers) {
        lineObj.line = line;
        lineObj.button = null;
        return lineObj;
      }
      else {

        lineObj.button = [];
        templatesHelpers.map(function (tmplHlp) {
          line = line.replace(tmplHlp, "");
          //line = line.replace(" ", &nbsp;);
          tmplHlp = tmplHlp.replace("{{>", "");
          tmplHlp = tmplHlp.replace("}}", "");
          tmplHlp = tmplHlp.trim();
          var c = DBComponents.findOne(tmplHlp);
          if (c)
            var name = c.name;
          else var name = "Not Found"
          tmplObj = {
            templateName: name,
            templateId: tmplHlp
          };
          lineObj.button.push(tmplObj);
          return tmplHlp;
        });
        lineObj.line = line.trim();
        //var button = document.createElement("button");
        //var text = document.createTextNode("template");
        //button.appendChild(text);
        return lineObj;
      }

    });
    return newArray;
  },
  builtins: function () {
     return [
      {
      name: 'Input',
      local: function() {
        return ["text",
        "textarea",
        "select",
        "button",
        "checkbox",
        "date",
        "datetime",
        "time",
        "email",
        "file",
        "password",
        "radio",
        "range",
        "search",
        "url"];
      },
      header: '<h3 class="league-name">Inputs</h3>'
      },
      {
      name: 'nhl-teams',
      local: function() {
        return [];
      },
      header: '<h3 class="league-name">NHL Teams</h3>'
      }
    ];
  },
  nameNotClicked: function () {
    //var
  },
  currentComponent: function () {
    var c = State.CurrentComponent.get();
    return c;
    //return DBComponents.findOne({_id: cId});
  }
});


