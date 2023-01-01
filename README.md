# BCGDV Coding Challenge - Checkout App

This is a simple NodeJS app build with Express for the given [problem](docs/Problem.md). 

## Architecture Decision Records
   - I chose Node.js with Express because it is lightweight and suitable for the project's requirements. Additionally, I am comfortable working with it plus the coding challenge specified that any framework can be used.
   - The app uses a hardcoded object as a temporary database solution
   - The code organization follows the MVC pattern
   - The app uses CommonJS modules
   - The following naming convention is used for route `<hostname>/v1/<usecase>` following industry best practice to help developers understand and use the API more effectively.
   - Tests were implemented using Mocha and Chai. Unit, BDD and integration tests were performed for this challenge.
   - The app uses a minimal CI pipeline using github actions and Fly.io

## Improvements
   - Vertical Slice architecture for code organization. It helps to keep the code organized and easier to maintain by separating the different concerns of the application i.e Catalog and Checkout
   - App can be refactored to use ECMAScript modules as it allows for better tree shaking, which is a way of optimizing the size of a code bundle by only including the code that is actually used in the final bundle
   - Harcoded object must be replaced with SQL/NoSQL layer to allow for battle tested performance and data management

## Notes
   - The app is deployed using fly.io under the hostname `https://bcgdv-checkout-app.fly.dev/` because it is easier, faster and has a free to use tier 
   - Index.js and Server.js is seperate out following seperation of concern, easier to write unit tests for the server logic and its easier to  change or reuse the server implementation.

## Getting start

### Run on Docker

#### Prerequisites

- `Docker >= v20.10.17`

```
# run dev container in background, remove -d to run in foreground
docker-compose up -d checkout-app-dev

# run prod container in background, remove -d to run in foreground
docker-compose up -d checkout-app-prod

# stop container running in background
docker-compose stop <name>

# cURL API
curl -X POST -H "Content-Type: application/json" -d '{"watches": ["001", "002", "003"]}' http://localhost:8080/v1/checkout
```


### Run locally

#### Prerequisites

- [Node.js](https://nodejs.org/)  - `Node >= v18.x.x`
- [npm](https://www.npmjs.com/)     -  `NPM >= 8.x.x`

```
# clone repo
git clone https://github.com/saqibsaleem95/bcgdv-checkout-app

# install dependencies
npm install

# run app
npm start

# run tests
npm run test

```
The Checkout API will be available at http://localhost:8080/v1/checkout.

To perform a checkout, send a POST request to the above endpoint with a JSON body containing an array of watch IDs `["001","002","001","004","003"]`

The API will return a JSON response with the total price `{ "price": 360 }`

## Tests

- `/checkout` endpoint - returns total price of the requested watches

   [Unit] catalog method - returns watch details by ID
   - ✓ should return watch details for valid payload

   [BDD] /checkout endpoint - returns total price of the requested watches
   - ✓ should return 200 for valid payload
   - ✓ should return 400 when one of cart item is not found
   - ✓ should return 400 when validation fails

   [Int] Checkout API
   - ✓ should return the correct total price for a list of watches 
