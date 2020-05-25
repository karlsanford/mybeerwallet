import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

//import { Tasks } from '../api/tasks.js';

//import './task.js';
//import './body.html';

Template.body.helpers({
    tasks() {
        const instance = Template.instance();
        if (instance.state.get('hideCompleted')) {
          // If hide completed is checked, filter tasks
          return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
        }
        // Otherwise, return all of the tasks
        return Tasks.find({});
    },
    creditCount: function() {
        console.log(Meteor.user())
        const userId = Meteor.user()._id
        console.log( Meteor.users[userId])  
        //return Meteor.users.findOne({"_id" : Meteor.user()._id}).credits;
        //return 1
    },
});

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('tasks');
});

Template.body.events({
    'submit .payment-form'(event) {
        // Prevent default browser form submit
        event.preventDefault();

       const cardDetails = {
           number: event.target.cardNumber.value,
           exp_month: event.target.expMonth.value,
           exp_year: event.target.expYear.value,
           cvc: event.target.cvc.value
       }

       Stripe.createToken(cardDetails,function(status, result){
           if(result.error){
               alert(result.error.message)
           } else {
               Meteor.call("chargeCard",result.id, function(err, response){
                    if(err) {
                        alert(err.message)
                    } else {
                        console.log(response)
                        Meteor.call("addCredits", 1)
                        alert("you were charged:" + response)
                    }
               })
           }
       })
    },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    },
});