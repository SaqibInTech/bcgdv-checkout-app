const chai = require("chai")
      assert = chai.assert
const axios = require('axios');

describe('[Int] Checkout API', () => {
  it('should return the correct total price for a list of watches', async () => {
    const watches = [
      "001",
      "002",
      "001",
      "004",
      "001"
    ]
    const response = await axios.post('http://localhost:8080/v1/checkout',  watches);
    assert(response.data.price === 310);
  });
});
