State = {};
State.HTML = new ReactiveVar(true);
State.CSS = new ReactiveVar(true);
State.EventJS = new ReactiveVar(true);
State.HelperJS = new ReactiveVar(true);
State.CurrentProject = new ReactiveVar("");
State.CurrentComponent = new ReactiveVar();
State.CurrentNode = new ReactiveVar(null);
State.SelectedNode = new ReactiveVar();
State.isCoding = new ReactiveVar(false);
State.HTMLcursor = new ReactiveVar(0);


Template.Layout.events({
	"click .tab": function (event) {
		$(".tab").removeClass('active');
		event.target.addClass('active');
	}
});

Template.Layout.helpers({
    userPicHelper: function() {
    	//var id = Meteor.user().services.facebook.id;
        //var img = 'http://graph.facebook.com/' + id + '/picture?type=square&height=50&width=50';
        return '';//img;
    },
    userFacebookLink: function () {
    	return '#';//Meteor.user().services.facebook.link;
    }
});

Template.registerHelper('userIsDriver', function (driver) {
		if (driver === Meteor.userId())
			return true;
		else return false;
	});