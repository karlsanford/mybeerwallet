<script>
    let number;
    let expMonth;
    let expYear;
    let cvc;
    let amount;
    let costEach = 5

    const handleSubmit = () => {
        let cardDetails = {number,expMonth,expYear,cvc}
        let chargeInDollars = amount * costEach
        let chargeInCents = chargeInDollars * 100
        if(confirm("Your are about to be charged $" + chargeInDollars)){
            Stripe.createToken(cardDetails,function(status, result){
                if(result.error){
                    alert(result.error.message)
                } else {
                    
                    Meteor.call("chargeCard", result.id, chargeInCents, function(err, response){
                        if(err) {
                            alert(err.message)
                        } else {
                            console.log(response)
                            Meteor.call("addCredits", amount)
                            alert("you were charged:" + response)
                        }
                    })
                }
            })
        }
        
    }  
    
</script>

<div class="container">
    
    <h3>Payment</h3>

    <form on:submit|preventDefault={handleSubmit} class="payment-form" action="">
        <div class="form-group">
            <label for="cardNumber">Credit Card Number</label>
            <input type="text" class="form-control" name="cardNumber" bind:value={number}>
        </div>
        
        <div class="form-group">
            <label for="expMonth">Expiration</label>
            <div class="container">
                <div class="row">
                    <div class="col-xs-6">
                        <input type="text" class="form-control" name="expMonth" placeholder="mm" bind:value={expMonth}>
                    </div>
                    <div class="col-xs-6">
                        <input type="text" class="form-control" name="expYear" placeholder="yyyy" bind:value={expYear}>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <label for="cvc">CVC</label>    
            <input type="text" class="form-control" name="cvc" bind:value={cvc}>
        </div>

        <div class="form-group">
            <label for="amount">Amount</label>    
            <input type="number" class="form-control" name="amount" bind:value={amount} on:click{updateTotal}>
            <span>Total: ${amount * costEach}</span>
        </div>

        <button class="btn btn-warning" name="addcredits" >Add Credits</button>
    </form>
</div>