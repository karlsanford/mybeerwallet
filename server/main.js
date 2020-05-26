import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
import '../imports/api/resolutions';

Meteor.startup(() => {
  // code to run on server at startup

  const stripe = StripeAPI(Meteor.settings.StripePri)

  Meteor.methods({
    "chargeCard" : function(cardToken, amount) {
      stripe.charges.create({
          amount,
          currency: "usd",
          source: cardToken,
          description: "bought credits from mybeerwallet.com",
          function(err, result) {
            if(err){
              throw new Meteor.error(500, "stripe-err", err.message  )
            } else {
              console.log("log001 ", result)
              Meteor.users.update(Meteor.userId(), { $set: { credits: 1 } })
              return result
            }
          }
      })
    },
    "addCredits" : function(additionalCredits){
      const currentUserCredits = Meteor.user().credits || 0
      Meteor.users.update(Meteor.userId(), { $set: { credits: currentUserCredits + additionalCredits } })
    },
    "removeCredits" : function(creditsToRemove) {
      const currentUserCredits = Meteor.user().credits || 0
      if(!currentUserCredits) {
        throw new Meteor.error(500, "balance-err", "No user credits")
      } else if(creditsToRemove > userCredits) {
        throw new Meteor.error(500, "balance-err", "Current Balance is " + currentUserCredits)
      } else {

      }
    }
  })
});
