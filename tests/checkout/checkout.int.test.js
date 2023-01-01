const chai = require("chai"),
      chaiHttp = require('chai-http'),
      axios = require("axios"),
      nock = require("nock");

chai.use(chaiHttp);
const { expect } = chai;

describe("Checkout API", () => {
  it("should return the correct total price for a list of watches", async () => {
    // Set up the mock HTTP response from the server
    nock("http://localhost:8080")
      .post("/v1/checkout")
      .reply(200, {
        price: 310
      });

    // Make the HTTP request using axios
    const watches = ["001", "002", "001", "004", "001"];
    const response = await axios.post("http://localhost:8080/v1/checkout", watches);

    // Assert that the response is as expected
    expect(response.data).to.have.property("price", 310);
  });
});
