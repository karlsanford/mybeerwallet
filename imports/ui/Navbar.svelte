<script>
  import { Router, Link, Route, link } from "svelte-routing";
  import Resolutions from './Resolutions.svelte'
  import PaymentForm from './PaymentForm.svelte'
  import Login from './Login.svelte'
  import Home from './Home.svelte'
  import AccountInfo from './AccountInfo.svelte'
  import NavLink from './NavLink.svelte'
  import { navigate } from 'svelte-routing'

  export let url = "";

  let username ="no user";
  let loggedIn = false

  const userLoggedIn = () => {
    username = Meteor.user().emails[0].address;
    loggedIn = true
  }

  const logout = () => {
    Meteor.logout()
    loggedIn = false
    navigate('/')
  }
  
</script>

<style>
    
</style>

<div>
  <Router url="{url}">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a href="/" class="navbar-brand">BW</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <NavLink to='/'>Home <span class="sr-only">(current)</span></NavLink>
          <li class="nav-item">
            <NavLink to='/resolutions'>Resolutions</NavLink>
          </li>
          <li class="nav-item">
            
          </li>
          <li class="nav-item">
            <NavLink to='/payment'>Buy Credits</NavLink>
          </li>
        </ul>

        
        {#if !loggedIn}
        <form class="form-inline my-2 my-lg-0">
            <span class="nav-item navbar-nav">
              <NavLink to='/login' >Login</NavLink>
            </span>
        </form>
        {/if}

        {#if loggedIn}
        <div class="nav-item dropdown">
          <a class="nav-link dropdown-toggle navbar-nav" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {username}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" on:click={logout}>Logout</a>
            <div class="dropdown-divider"></div>
            <span  class="dropdown-item" >
              <NavLink to="accountinfo">Account Info</NavLink>
            </span>
            
          </div>
        </div>
        {/if}
      
      </div>
    </nav>
    <div>
      <Route path="/" component="{Home}" />
      <Route path="login">
        <Login on:userLoggedIn={userLoggedIn}/>
      </Route>
      <Route path="payment" component="{PaymentForm}" />
      <Route path="resolutions" component="{Resolutions}" />
      <Route path="accountinfo" component="{AccountInfo}" />
    </div>
  </Router>
</div>



 