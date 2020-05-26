<script>
    let currentIndex = 0
    let altIndex = 1
    let email
    let password
    let confirmPassword
    let messages = []
    let currentUser;

    import { createEventDispatcher} from 'svelte'

    let dispatch = createEventDispatcher();

    
        
    const signUp = () => {
        if(password != confirmPassword) {
            console.log("password no matchy")
            messages = [...messages, "passwords do not match"]
            return
        }
        Accounts.createUser({email,password}, (err) => {
            if(err) return alert(err.message)
            return alert('successfully created account')
        })
    }

    const logIn = () => {
        Meteor.loginWithPassword(email,password, (err) => {
            if(err) return alert(err.message)

            console.log(Meteor.user())
            dispatch('userLoggedIn')
            //TODO clean up
            
            if(Meteor.user() && Meteor.user().emails && Meteor.user().emails[0].address) userName = Meteor.user().emails[0].address
            return //alert('you be logged in')
            
        })
    }
    
    const formFunctions = [
        {
            buttonText:"Log In",
            linkText:"Already have an account?",
            handler: logIn
        }, 
        {
            buttonText: "Sign Up",
            linkText: "Need to create an account?",
            handler: signUp
        }
    ]

    const handleSubmit = () => {
        formFunctions[currentIndex].handler();
    }

    const switchFunction = () => {
        currentIndex ? currentIndex = 0 : currentIndex = 1
        altIndex ? altIndex = 0 : altIndex = 1
    }
</script>

<div class="container">
    <h3>Login</h3>
    
    <form on:submit|preventDefault={handleSubmit} action="">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="text" class="form-control" name="email" bind:value={email}>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" name="password" bind:value={password}>
        </div>
        {#if currentIndex}
            <div class="form-group">
                <label for="password">Confirm Password</label>
                <input type="password" class="form-control" name="password" bind:value={confirmPassword}>
            </div>
        {/if}
        
        <a href="#" on:click={switchFunction} > {formFunctions[altIndex].linkText} </a>
        <button  class="btn btn-warning">{formFunctions[currentIndex].buttonText}</button>
        <div class="error">
            {#each messages as message}
                <span>{message}</span>
            {/each}
        </div>
    </form>
</div>


