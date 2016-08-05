Router.configure({
  layoutTemplate: 'Layout'
});
Router.route('/', function () {
	this.render('Landing');
});
Router.route('/project', function () {
  this.render('ProjectMaker');
});
Router.route('/component', function () {
  State.CurrentComponent.set(new AsComponent());
  this.render('ComponentMaker');
});
Router.route('/component/:_id', function () {
  var id = this.params._id;
  var c = DBComponents.findOne(id);
  State.CurrentComponent.set(c);
  State.CurrentNode.set(null);
  this.render('ComponentMaker');
});
Router.route('/view/:_id', function () {
  var id = this.params._id;
  this.render('ComponentMaker', {
    data: function () {
      var id = this.params._id;
      State.CurrentProject.set(id);
      var p = Projects.findOne({_id: id})
      if (p)
       State.CurrentComponent.set(p.body);
      return p;
    }
  });
});
Router.route('/settings', function () {
  this.render('Settings');
});

Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.render('Login');
  } else {
    this.next();
  }
});