var braintree = require("braintree");

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: 'd7254pcxwp2vr2fs',
    publicKey: '4qmngt8vcsjcrcrb',
    privateKey: '50dca390cedb2a2fbaae3c63d094b957'
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.send(response)
        }
    });
}

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount;

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,

        options: {
            submitForSettlement: true
        }
    }, function (err, result) {
        if (err) {
            res.status(500).json(err) //priveslly have .json() 
        } else {
            res.json(result) //priveslly have .json()
        }
    });
}