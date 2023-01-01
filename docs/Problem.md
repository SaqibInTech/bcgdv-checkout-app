# Problem

You are building a simplified e-commerce API with a single endpoint that performs a checkout action. The API should return the total cost of a list of watches.

The API should have the following characteristics:

The endpoint should be a POST request to /checkout
The request body should be a JSON array of watch IDs
The response should be a JSON object with a single property, price, that contains the total cost of the watches
The watch catalogue is as follows:

## Watch Catalogue

| Watch ID | Watch Name     | Unit Price | Discount       |
|----------|----------------|------------|----------------|
| 001      | Rolex          | 100        | 3 for 200      |
| 002      | Michael Kors   | 80         | 2 for 120      |
| 003      | Swatch         | 50         |                |
| 004      | Casio          | 30         |                |

## Notes

- The first two products have a discount. As an example, if the user attempts to checkout three or six Rolex watches, they will receive the discount price once or twice, respectively.
- There is no limit to the number of items or combinations of watches a user can checkout.
- There is no limit to the number of times a discount can be used.
- A user can checkout a single item if they wish.
