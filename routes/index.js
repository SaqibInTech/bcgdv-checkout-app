const router = require('express').Router(),
  checkoutController = require('../controllers/checkoutController')

router.post('/v1/checkout', checkoutController.performCheckout)

module.exports = router