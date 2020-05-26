import { Meteor } from 'meteor/meteor'
import App from '../imports/ui/App.svelte'
//import '../imports/startup/accounts-config.js';

Meteor.startup( () => {
    //Svelte
    new App({
        target: document.getElementById('app')
    })

    //Init Stripe
    const StripePub = Meteor.settings.public.StripePub
    Stripe.setPublishableKey(StripePub)
    console.log("Stripe.setPublishableKey(StripePub) with value ", StripePub)
}) 