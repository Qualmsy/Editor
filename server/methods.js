Meteor.methods({
	markAsInterested: function (offerId) {
		check(offerId, String);
		Meteor.users.update( { _id: this.userId }, 
        	{ $set: {iaminterested: offerId} } );
	},
	registerCar: function (car) {
		check(car, Object);
		check(car.model, String);
		check(car.year, String);
		check(car.colorName, String);
		Meteor.users.update( { _id: this.userId }, 
        	{ $set: {car: car} } );
	},
	createNewNode: function (cId, pId) {
		check(cId, String);
		check(pId, String);
	}
});