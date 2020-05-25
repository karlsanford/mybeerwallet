<div class="container">
<h3>Payment</h3>
    <form class="payment-form" action="">
        <div class="form-group">
            <label for="cardNumber">Credit Card Number</label>
            <input type="text" class="form-control" name="cardNumber">
        </div>
        
        <div class="form-group">
            <label for="expMonth">Expiration</label>
            <div class="container">
                <div class="row">
                    <div class="col-xs-6">
                        <input type="text" class="form-control" name="expMonth" placeholder="mm">
                    </div>
                    <div class="col-xs-6">
                        <input type="text" class="form-control" name="expYear" placeholder="yyyy">
                    </div>
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <label for="cvc">CVC</label>    
            <input type="text" class="form-control" name="cvc">
        </div>

        <button class="btn btn-warning" name="addcredits" type="submit">Add Credits</button>
    </form>
</div>