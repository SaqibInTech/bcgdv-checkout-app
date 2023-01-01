process.env.NODE_ENV = 'test'

const chai = require('chai'),
  expect = chai.expect,
  chaiHttp = require('chai-http'),
  server = require('../../index.js'),
  catalog = require('../../src/models/catalog')
chai.use(chaiHttp)

//Unit test for catalog function
describe('[Unit] catalog method - returns watch details by ID', () => {
  it('should return watch details for valid payload', async () => {
    const payload = "002"

    const expectedOutput = {
      watchID: '002',
      watchName: 'Michael Kors',
      price: 80,
      discountAvailable: true,
      discountQuantity: 2,
      discountPrice: 120,
    } 

    const res =  catalog.getCatalogByID(payload)
  
    expect(res).to.be.an('object')
    expect(res).to.deep.equal(expectedOutput)
  })
});

// BDD test for /checkout
describe('[BDD] /checkout endpoint - returns total price of the requested watches', () => {
  const endpoint = '/v1/checkout'

  it('should return 200 for valid payload', async () => {
    const payload = [
      "001",
      "002",
      "001",
      "004",
      "001"
    ]

    const expectedOutput = {
      price: 310
    }

    const res = await chai
      .request(server)
      .post(endpoint)
      .send(payload)
    expect(res).to.have.status(200)
    expect(res.body).to.be.an('object')
    expect(res.body).to.deep.equal(expectedOutput)
  })

  it('should return 400 when one of cart item is not found', async () => {
    const payload = ['004', '123']

    const expectedOutput = {
      "error": "Invalid ID",
      "errors": [
        "Bad request : Error in finding some watch ID, Please check if watch ID(s) are correct"
      ]
    }

    const res = await chai
      .request(server)
      .post(endpoint)
      .send(payload)

    expect(res).to.have.status(400)
    expect(res.body).to.be.a('object')
    expect(res.body).to.deep.equal(expectedOutput)
  })

  it('should return 400 when validation fails', async () => {
    const payload = [123, 41]

    const expectedOutput = {
      "error": "Invalid request body",
    }

    const res = await chai
      .request(server)
      .post(endpoint)
      .send(payload)

    expect(res).to.have.status(400)
    expect(res.body).to.be.a('object')
    expect(res.body).to.deep.include(expectedOutput)
  })
})
