import { Meteor } from 'meteor/meteor'
import App from '../imports/ui/App.svelte'
import '../imports/startup/accounts-config.js';
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/js/bootstrap'
//import './styles.css';

//import '../imports/ui/body.js';

Meteor.startup( () => {
    //Svelte
    new App({
        target: document.getElementById('app')
    })

    //Init Stripe
    const StripePub = Meteor.settings.public.StripePub
    Stripe.setPublishableKey(StripePub)
}) 