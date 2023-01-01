const checkoutService = require('../services/checkoutService')
const Ajv = require('ajv');
const ajv = new Ajv();

//schema for validating parameters for Checkout API
const schema = {
  type: 'array',
  items: {
    type: 'string'
  }
};

/** Handler for /checkout endpoint */
exports.performCheckout = (req, res, next) => {

    // sanitize and validate
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
        // req.body is invalid, return an error
        return res.status(400).json({
            error: 'Invalid request body',
            errors: ajv.errors
          });
    }

    //handle success case
    const result = checkoutService.checkout(req.body)
    if (!result.success) {
        //Return an error if any issue occurs
        return res.status(400).json({
            error: 'Invalid ID',
            errors: ['Bad request : '+result.message]
        })
    }

    //Return total price 
    return res.status(200).json(result.data)
}